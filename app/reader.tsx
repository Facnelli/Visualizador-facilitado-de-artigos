"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BookOpen, Bookmark, ChevronLeft, ChevronRight, ExternalLink, Highlighter, Minus, Moon, Plus, Search, Sun, Trash2, X } from "lucide-react";
import { article, type ArticleBlock } from "./data/articles";

type Highlight = { id: string; blockId: string; startOffset: number; endOffset: number; quote: string; color: string; createdAt: string };
type PendingSelection = Omit<Highlight, "id" | "color" | "createdAt"> & { x: number; y: number };

const weight = (block: ArticleBlock) => {
  const chars = (block.text?.length ?? 0) + (block.items?.join(" ").length ?? 0) + (block.rows?.flat().join(" ").length ?? 0);
  if (block.kind === "figure") return 1450;
  if (block.kind === "table") return chars + 700;
  if (block.kind === "heading") return chars + 260;
  return chars + 150;
};

function paginate(blocks: ArticleBlock[], limit: number) {
  const pages: ArticleBlock[][] = []; let page: ArticleBlock[] = []; let total = 0;
  for (const block of blocks) {
    const value = weight(block);
    if (page.length && total + value > limit) { pages.push(page); page = []; total = 0; }
    page.push(block); total += value;
  }
  if (page.length) pages.push(page);
  return pages;
}

function HighlightedText({ block, highlights }: { block: ArticleBlock; highlights: Highlight[] }) {
  const content = block.text ?? "";
  const ranges = highlights.filter((h) => h.blockId === block.id && h.startOffset < content.length).sort((a, b) => a.startOffset - b.startOffset);
  if (!ranges.length) return <>{content}</>;
  const output: React.ReactNode[] = []; let cursor = 0;
  ranges.forEach((range) => {
    const start = Math.max(cursor, range.startOffset); const end = Math.min(content.length, Math.max(start, range.endOffset));
    if (start > cursor) output.push(content.slice(cursor, start));
    if (end > start) output.push(<mark className="reader-mark" key={range.id}>{content.slice(start, end)}</mark>);
    cursor = Math.max(cursor, end);
  });
  if (cursor < content.length) output.push(content.slice(cursor));
  return <>{output}</>;
}

function Block({ block, highlights }: { block: ArticleBlock; highlights: Highlight[] }) {
  if (block.kind === "figure") return <figure className="article-figure" data-block-id={block.id}><img src={block.src} alt={block.alt} /><figcaption>{block.caption}</figcaption></figure>;
  if (block.kind === "table") return <section className="table-block" data-block-id={block.id}><h3>{block.text}</h3><div className="table-scroll"><table><tbody>{block.rows?.map((row, ri) => <tr key={ri}>{row.map((cell, ci) => ri === 0 ? <th key={ci}>{cell}</th> : <td key={ci}>{cell}</td>)}</tr>)}</tbody></table></div></section>;
  if (block.kind === "heading") return <h2 id={block.id} data-block-id={block.id}>{block.text}</h2>;
  if (block.kind === "list") return <section className="list-block" data-block-id={block.id}><h3>{block.text}</h3><ul>{block.items?.map((item) => <li key={item}>{item}</li>)}</ul></section>;
  if (block.kind === "quote") return <blockquote data-block-id={block.id}><HighlightedText block={block} highlights={highlights} /></blockquote>;
  return <p data-block-id={block.id}><HighlightedText block={block} highlights={highlights} /></p>;
}

export default function Reader() {
  const [screen, setScreen] = useState<"home" | "article">("home");
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState({ desktopPage: 0, mobilePage: 0 });
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(19);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [search, setSearch] = useState("");
  const [showHighlights, setShowHighlights] = useState(false);
  const [pending, setPending] = useState<PendingSelection | null>(null);
  const [sync, setSync] = useState<"loading" | "saved" | "saving" | "error">("loading");
  const [started, setStarted] = useState(false);
  const loaded = useRef(false); const articleRef = useRef<HTMLElement>(null);
  const desktopPages = useMemo(() => paginate(article.blocks, 4600), []);
  const mobilePages = useMemo(() => paginate(article.blocks, 2350), []);
  const pages = isMobile ? mobilePages : desktopPages;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)"); const apply = () => setIsMobile(media.matches);
    apply(); media.addEventListener("change", apply);
    const saved = localStorage.getItem("reader-theme") as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial); document.documentElement.dataset.theme = initial;
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    fetch(`/api/state?articleId=${article.id}`).then(async (r) => { if (!r.ok) throw new Error(); return r.json() as Promise<{ progress?: { desktopPage?: number; mobilePage?: number; updatedAt?: string }; highlights?: Highlight[] }>; }).then((data) => {
      const next = { desktopPage: Number(data.progress?.desktopPage) || 0, mobilePage: Number(data.progress?.mobilePage) || 0 };
      setProgress(next); setStarted(Boolean(data.progress?.updatedAt)); setHighlights(data.highlights ?? []); setCurrentPage(isMobile ? next.mobilePage : next.desktopPage); setSync("saved"); loaded.current = true;
    }).catch(() => { setSync("error"); loaded.current = true; });
  }, [isMobile]);

  useEffect(() => {
    if (!loaded.current) return;
    const next = isMobile ? { ...progress, mobilePage: currentPage } : { ...progress, desktopPage: currentPage };
    setProgress(next); setSync("saving");
    const timer = window.setTimeout(() => fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ articleId: article.id, progress: next }) }).then((r) => { if (!r.ok) throw new Error(); setSync("saved"); }).catch(() => setSync("error")), 450);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isMobile]);

  useEffect(() => { setCurrentPage(Math.min(isMobile ? progress.mobilePage : progress.desktopPage, Math.max(0, pages.length - 1))); }, [isMobile]); // eslint-disable-line react-hooks/exhaustive-deps

  const openArticle = useCallback((page?: number) => {
    const target = Math.min(page ?? (isMobile ? progress.mobilePage : progress.desktopPage), pages.length - 1);
    setCurrentPage(target); setStarted(true); setScreen("article"); setShowHighlights(false); window.scrollTo(0, 0);
    fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ articleId: article.id, progress }) }).catch(() => undefined);
  }, [isMobile, pages.length, progress]);

  useEffect(() => {
    const context = (document as any).modelContext; if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    Promise.resolve(context.registerTool({ name: "open_article", title: "Abrir artigo", description: "Abre o artigo disponível e continua do ponto salvo.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute: () => { openArticle(); return { articleId: article.id, page: currentPage + 1 }; } }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [currentPage, openArticle]);

  const goToBlock = (blockId: string) => {
    const index = pages.findIndex((page) => page.some((b) => b.id === blockId)); openArticle(index < 0 ? 0 : index);
    window.setTimeout(() => document.querySelector(`[data-block-id="${blockId}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  };

  const captureSelection = () => {
    const selection = window.getSelection(); if (!selection || selection.isCollapsed || !articleRef.current) return setPending(null);
    const range = selection.getRangeAt(0);
    const closest = (node: Node) => (node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element)?.closest?.("[data-block-id]") as HTMLElement | null;
    const startEl = closest(range.startContainer); const endEl = closest(range.endContainer);
    if (!startEl || startEl !== endEl || !articleRef.current.contains(startEl) || startEl.matches("figure, .table-block, .list-block, h2")) return setPending(null);
    const before = range.cloneRange(); before.selectNodeContents(startEl); before.setEnd(range.startContainer, range.startOffset);
    const raw = range.toString(); const quote = raw.trim(); if (!quote) return setPending(null);
    const startOffset = before.toString().length + raw.indexOf(quote); const rect = range.getBoundingClientRect();
    setPending({ blockId: startEl.dataset.blockId!, startOffset, endOffset: startOffset + quote.length, quote, x: Math.min(window.innerWidth - 68, Math.max(68, rect.left + rect.width / 2)), y: Math.max(76, rect.top - 12) });
  };

  const saveHighlight = async () => {
    if (!pending) return; const entry: Highlight = { ...pending, id: crypto.randomUUID(), color: "yellow", createdAt: new Date().toISOString() };
    setHighlights((items) => [entry, ...items]); setPending(null); window.getSelection()?.removeAllRanges(); setSync("saving");
    try { const response = await fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ articleId: article.id, highlight: entry }) }); if (!response.ok) throw new Error(); setSync("saved"); }
    catch { setHighlights((items) => items.filter((h) => h.id !== entry.id)); setSync("error"); }
  };

  const deleteHighlight = async (id: string) => {
    const previous = highlights; setHighlights((items) => items.filter((h) => h.id !== id));
    try { const response = await fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ articleId: article.id, deleteHighlightId: id }) }); if (!response.ok) throw new Error(); }
    catch { setHighlights(previous); setSync("error"); }
  };

  const toggleTheme = () => { const next = theme === "light" ? "dark" : "light"; setTheme(next); document.documentElement.dataset.theme = next; localStorage.setItem("reader-theme", next); };
  const filtered = highlights.filter((h) => h.quote.toLocaleLowerCase("pt-BR").includes(search.toLocaleLowerCase("pt-BR")));
  const percent = started ? Math.round(((isMobile ? progress.mobilePage : progress.desktopPage) + 1) / pages.length * 100) : 0;

  if (screen === "home") return <main className="site-shell home-shell">
    <header className="topbar"><a className="brand" href="#" onClick={(e) => e.preventDefault()}><span className="brand-icon"><BookOpen size={20} /></span><span>Leitura confortável</span></a><button className="icon-button" onClick={toggleTheme} aria-label="Alternar tema">{theme === "light" ? <Moon size={19} /> : <Sun size={19} />}</button></header>
    <section className="hero"><span className="eyebrow">Sua biblioteca acadêmica</span><h1>Artigos densos.<br /><em>Leitura leve.</em></h1><p>Textos traduzidos e organizados para você avançar sem perder o fio — no computador ou no celular.</p></section>
    <section className="library-section"><div className="section-title"><div><span className="eyebrow">Biblioteca</span><h2>Disponíveis para leitura</h2></div><span className="count-pill">1 artigo</span></div>
      <button className="article-card" onClick={() => openArticle()}><div className="card-index">01</div><div className="card-body"><div className="card-meta"><span>Revisão sistemática</span><span>2021</span><span>{article.readingMinutes} min</span></div><h3>{article.title}</h3><p>{article.authors}</p><div className="progress-line"><span style={{ width: `${percent}%` }} /></div><div className="card-footer"><span>{percent > 5 ? `${percent}% concluído` : "Pronto para começar"}</span><span className="continue">{percent > 5 ? "Continuar" : "Abrir artigo"} <ArrowRight size={16} /></span></div></div></button>
    </section>
    <section className="saved-section"><div className="section-title"><div><span className="eyebrow">Revisão rápida</span><h2>Seus destaques</h2></div><Highlighter size={20} /></div>{highlights.length ? <div className="home-highlights">{highlights.slice(0, 4).map((h) => <button key={h.id} onClick={() => goToBlock(h.blockId)}>“{h.quote}”</button>)}</div> : <div className="empty-highlights"><Bookmark size={22} /><p>Selecione um trecho durante a leitura e toque em <strong>Grifar</strong>. Ele aparecerá aqui para acesso rápido.</p></div>}</section>
    <footer><span>{article.license}</span><a href={article.doi} target="_blank" rel="noreferrer">Fonte original <ExternalLink size={13} /></a></footer>
  </main>;

  return <main className="reader-shell" style={{ "--reader-size": `${fontSize}px` } as React.CSSProperties}>
    <header className="reader-topbar"><button className="back-button" onClick={() => { setScreen("home"); setPending(null); }}><ChevronLeft size={20} /><span>Biblioteca</span></button><div className={`sync-status ${sync}`}><span />{sync === "saved" ? "Salvo" : sync === "saving" ? "Salvando" : sync === "error" ? "Sem sincronizar" : "Carregando"}</div><div className="reader-actions"><button className="icon-button" onClick={() => setFontSize((n) => Math.max(16, n - 1))} aria-label="Diminuir texto"><Minus size={18} /></button><button className="icon-button" onClick={() => setFontSize((n) => Math.min(24, n + 1))} aria-label="Aumentar texto"><Plus size={18} /></button><button className="icon-button" onClick={toggleTheme} aria-label="Alternar tema">{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button><button className="highlight-toggle" onClick={() => setShowHighlights(true)}><Highlighter size={17} /><span>Destaques</span><b>{highlights.length}</b></button></div></header>
    <div className="reading-progress"><span style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }} /></div>
    <div className="reader-layout"><aside className="article-rail"><span className="rail-number">01</span><span className="rail-line" /><span className="rail-label">Abdi & Amrit<br />2021</span></aside><article ref={articleRef} className="article-page" onMouseUp={captureSelection} onTouchEnd={() => window.setTimeout(captureSelection, 80)}>{currentPage === 0 && <header className="article-header"><span className="eyebrow">Tradução para português</span><h1>{article.title}</h1><p className="authors">{article.authors}</p><div className="article-meta"><span>{article.journal}</span><span>{article.license}</span></div><p className="adaptation-note">{article.note}</p></header>}<div className="article-content">{pages[currentPage]?.map((block) => <Block key={block.id} block={block} highlights={highlights} />)}</div><nav className="page-navigation" aria-label="Navegação por páginas"><button disabled={currentPage === 0} onClick={() => { setCurrentPage((p) => Math.max(0, p - 1)); window.scrollTo(0, 0); }}><ChevronLeft size={18} />Anterior</button><span>Página <strong>{currentPage + 1}</strong> de {pages.length}<small>{isMobile ? "versão celular" : "versão desktop"}</small></span><button disabled={currentPage === pages.length - 1} onClick={() => { setCurrentPage((p) => Math.min(pages.length - 1, p + 1)); window.scrollTo(0, 0); }}>Próxima<ChevronRight size={18} /></button></nav></article><aside className="side-notes"><div className="side-notes-title"><Highlighter size={17} /><span>Destaques</span><b>{highlights.length}</b></div>{highlights.length ? highlights.slice(0, 6).map((h) => <button key={h.id} onClick={() => goToBlock(h.blockId)}>“{h.quote}”</button>) : <p>Selecione um trecho do texto para grifá-lo.</p>}</aside></div>
    {pending && <button className="floating-highlight" style={{ left: pending.x, top: pending.y }} onMouseDown={(e) => e.preventDefault()} onClick={saveHighlight}><Highlighter size={16} />Grifar</button>}
    {showHighlights && <div className="drawer-backdrop" onClick={() => setShowHighlights(false)}><aside className="highlights-drawer" onClick={(e) => e.stopPropagation()}><header><div><span className="eyebrow">Anotações visuais</span><h2>Destaques salvos</h2></div><button className="icon-button" onClick={() => setShowHighlights(false)}><X size={20} /></button></header><label className="search-field"><Search size={17} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar nos destaques" /></label><div className="drawer-list">{filtered.length ? filtered.map((h) => <div className="drawer-item" key={h.id}><button onClick={() => goToBlock(h.blockId)}>“{h.quote}”</button><button className="delete-button" onClick={() => deleteHighlight(h.id)} aria-label="Excluir destaque"><Trash2 size={15} /></button></div>) : <div className="drawer-empty"><Highlighter size={26} /><p>Nenhum destaque encontrado.</p></div>}</div></aside></div>}
  </main>;
}
