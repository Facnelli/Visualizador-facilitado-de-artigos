import { env } from "cloudflare:workers";

function userId(request: Request) {
  return request.headers.get("oai-authenticated-user-id");
}

export async function GET(request: Request) {
  const user = userId(request);
  if (!user) return Response.json({ error: "authentication_required" }, { status: 401 });
  const db = env.DB;
  if (!db) return Response.json({ error: "storage_unavailable" }, { status: 503 });
  const articleId = new URL(request.url).searchParams.get("articleId");
  if (!articleId) return Response.json({ error: "article_required" }, { status: 400 });

  const [progress, highlights] = await Promise.all([
    db.prepare("SELECT desktop_page AS desktopPage, mobile_page AS mobilePage, updated_at AS updatedAt FROM reading_progress WHERE user_id = ? AND article_id = ?")
      .bind(user, articleId).first(),
    db.prepare("SELECT id, block_id AS blockId, start_offset AS startOffset, end_offset AS endOffset, quote, color, created_at AS createdAt FROM highlights WHERE user_id = ? AND article_id = ? ORDER BY created_at DESC")
      .bind(user, articleId).all(),
  ]);
  return Response.json({ progress: progress ?? { desktopPage: 0, mobilePage: 0 }, highlights: highlights.results });
}

export async function POST(request: Request) {
  const user = userId(request);
  if (!user) return Response.json({ error: "authentication_required" }, { status: 401 });
  const db = env.DB;
  if (!db) return Response.json({ error: "storage_unavailable" }, { status: 503 });
  const body = await request.json() as Record<string, any>;
  const articleId = String(body.articleId ?? "");
  if (!articleId) return Response.json({ error: "article_required" }, { status: 400 });
  const now = new Date().toISOString();

  if (body.progress) {
    const desktop = Math.max(0, Number(body.progress.desktopPage) || 0);
    const mobile = Math.max(0, Number(body.progress.mobilePage) || 0);
    await db.prepare(`INSERT INTO reading_progress (user_id, article_id, desktop_page, mobile_page, updated_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(user_id, article_id) DO UPDATE SET desktop_page = excluded.desktop_page, mobile_page = excluded.mobile_page, updated_at = excluded.updated_at`)
      .bind(user, articleId, desktop, mobile, now).run();
  }

  if (body.highlight) {
    const h = body.highlight;
    const id = String(h.id || crypto.randomUUID());
    const quote = String(h.quote ?? "").trim().slice(0, 4000);
    const blockId = String(h.blockId ?? "");
    const start = Math.max(0, Number(h.startOffset) || 0);
    const end = Math.max(start, Number(h.endOffset) || start);
    if (!quote || !blockId || end <= start) return Response.json({ error: "invalid_highlight" }, { status: 400 });
    await db.prepare("INSERT OR REPLACE INTO highlights (id, user_id, article_id, block_id, start_offset, end_offset, quote, color, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(id, user, articleId, blockId, start, end, quote, String(h.color || "yellow"), now).run();
  }

  if (body.deleteHighlightId) {
    await db.prepare("DELETE FROM highlights WHERE id = ? AND user_id = ? AND article_id = ?")
      .bind(String(body.deleteHighlightId), user, articleId).run();
  }

  return Response.json({ ok: true });
}
