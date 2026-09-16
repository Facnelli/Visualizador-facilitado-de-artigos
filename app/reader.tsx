"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, BookOpen, Bookmark, ChevronLeft, ChevronRight, ExternalLink, Highlighter, Minus, Moon, Plus, Search, Sun, Trash2, X } from "lucide-react";
import { articles, type Article, type ArticleBlock } from "./data/articles";

type Highlight = { id: string; blockId: string; startOffset: number; endOffset: number; quote: string; color: string; createdAt: string };
type PendingSelection = Omit<Highlight, "id" | "color" | "createdAt"> & { x: number; y: number };
type ReadingState = { progress: { desktopPage: number; mobilePage: number }; highlights: Highlight[]; started: boolean };

const emptyState = (): ReadingState => ({ progress: { desktopPage: 0, mobilePage: 0 }, highlights: [], started: false });

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

function pageCount(article: Article, isMobile: boolean) {
  return paginate(article.blocks, isMobile ? 2350 : 4600).length || 1;
}

export default function Reader() {
  const [screen, setScreen] = useState<"home" | "article">("home");
  const [selectedId, setSelectedId] = useState(articles[0].id);
  const [library, setLibrary] = useState<Record<string, ReadingState>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(19);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [search, setSearch] = useState("");
  const [showHighlights, setShowHighlights] = useState(false);
  const [pending, setPending] = useState<PendingSelection | null>(null);
  const [sync, setSync] = useState<"loading" | "saved" | "saving" | "error">("loading");
  const ready = useRef(new Set<string>()); const articleRef = useRef<HTMLElement>(null);

  const active = articles.find((item) => item.id === selectedId) ?? articles[0];
  const activeState = library[active.id] ?? emptyState();
  const highlights = activeState.highlights;
  const blockPages = useMemo(() => paginate(active.blocks, isMobile ? 2350 : 4600), [active, isMobile]);
  const totalPages = Math.max(1, blockPages.length);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)"); const apply = () => setIsMobile(media.matches);
    apply(); media.addEventListener("change", apply);
    const saved = localStorage.getItem("reader-theme") as "light" | "dark" | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial); document.documentElement.dataset.theme = initial;
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    let cancelled = false; setSync("loading");
    Promise.all(articles.map(async (item) => {
      const response = await fetch(`/api/state?articleId=${item.id}`); if (!response.ok) throw new Error();
      const data = await response.json() as { progress?: { desktopPage?: number; mobilePage?: number; updatedAt?: string }; highlights?: Highlight[] };
      return [item.id, { progress: { desktopPage: Number(data.progress?.desktopPage) || 0, mobilePage: Number(data.progress?.mobilePage) || 0 }, highlights: data.highlights ?? [], started: Boolean(data.progress?.updatedAt) }] as const;
    })).then((entries) => {
      if (cancelled) return;
      const next = Object.fromEntries(entries); setLibrary(next); entries.forEach(([id]) => ready.current.add(id)); setSync("saved");
    }).catch(() => { if (!cancelled) setSync("error"); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const state = library[selectedId]; if (!state) return;
    const savedPage = isMobile ? state.progress.mobilePage : state.progress.desktopPage;
    setCurrentPage(Math.min(savedPage, pageCount(active, isMobile) - 1));
  }, [selectedId, isMobile, library, active]);

  useEffect(() => {
    if (screen !== "article" || !ready.current.has(active.id)) return;
    const state = library[active.id] ?? emptyState();
    const nextProgress = isMobile ? { ...state.progress, mobilePage: currentPage } : { ...state.progress, desktopPage: currentPage };
    setLibrary((items) => ({ ...items, [active.id]: { ...state, progress: nextProgress, started: true } })); setSync("saving");
    const timer = window.setTimeout(() => fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ articleId: active.id, progress: nextProgress }) }).then((response) => { if (!response.ok) throw new Error(); setSync("saved"); }).catch(() => setSync("error")), 450);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isMobile, selectedId, screen]);

  const openArticle = useCallback((articleId: string, page?: number) => {
    const item = articles.find((candidate) => candidate.id === articleId) ?? articles[0];
    const state = library[item.id] ?? emptyState(); const saved = isMobile ? state.progress.mobilePage : state.progress.desktopPage;
    setSelectedId(item.id); setCurrentPage(Math.min(page ?? saved, pageCount(item, isMobile) - 1)); setScreen("article"); setShowHighlights(false); setPending(null); window.scrollTo(0, 0);
  }, [isMobile, library]);

  useEffect(() => {
    const context = (document as any).modelContext; if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    Promise.resolve(context.registerTool({ name: "open_article", title: "Abrir documento", description: "Abre um documento da biblioteca e continua do ponto salvo.", inputSchema: { type: "object", properties: { articleId: { type: "string", enum: articles.map((item) => item.id) } }, required: ["articleId"], additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute: ({ articleId }: { articleId: string }) => { openArticle(articleId); return { articleId }; } }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, [openArticle]);

  const goToBlock = (articleId: string, blockId: string) => {
    const item = articles.find((candidate) => candidate.id === articleId); if (!item?.blocks) return;
    const pages = paginate(item.blocks, isMobile ? 2350 : 4600); const index = pages.findIndex((page) => page.some((block) => block.id === blockId));
    openArticle(articleId, index < 0 ? 0 : index); window.setTimeout(() => document.querySelector(`[data-block-id="${blockId}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
  };

  const captureSelection = () => {
    const selection = window.getSelection(); if (!selection || selection.isCollapsed || !articleRef.current) return setPending(null);
    const range = selection.getRangeAt(0); const closest = (node: Node) => (node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element)?.closest?.("[data-block-id]") as HTMLElement | null;
    const startEl = closest(range.startContainer); const endEl = closest(range.endContainer);
    if (!startEl || startEl !== endEl || !articleRef.current.contains(startEl) || startEl.matches("figure, .table-block, .list-block, h2")) return setPending(null);
    const before = range.cloneRange(); before.selectNodeContents(startEl); before.setEnd(range.startContainer, range.startOffset);
    const raw = range.toString(); const quote = raw.trim(); if (!quote) return setPending(null);
    const startOffset = before.toString().length + raw.indexOf(quote); const rect = range.getBoundingClientRect();
    setPending({ blockId: startEl.dataset.blockId!, startOffset, endOffset: startOffset + quote.length, quote, x: Math.min(window.innerWidth - 68, Math.max(68, rect.left + rect.width / 2)), y: Math.max(76, rect.top - 12) });
  };

  const saveHighlight = async () => {
    if (!pending) return; const entry: Highlight = { ...pending, id: crypto.randomUUID(), color: "yellow", createdAt: new Date().toISOString() };
    const previous = activeState; setLibrary((items) => ({ ...items, [active.id]: { ...activeState, highlights: [entry, ...highlights] } })); setPending(null); window.getSelection()?.removeAllRanges(); setSync("saving");
    try { const response = await fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ articleId: active.id, highlight: entry }) }); if (!response.ok) throw new Error(); setSync("saved"); }
    catch { setLibrary((items) => ({ ...items, [active.id]: previous })); setSync("error"); }
  };

  const deleteHighlight = async (id: string) => {
    const previous = activeState; setLibrary((items) => ({ ...items, [active.id]: { ...activeState, highlights: highlights.filter((item) => item.id !== id) } }));
    try { const response = await fetch("/api/state", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ articleId: active.id, deleteHighlightId: id }) }); if (!response.ok) throw new Error(); }
    catch { setLibrary((items) => ({ ...items, [active.id]: previous })); setSync("error"); }
  };

  const toggleTheme = () => { const next = theme === "light" ? "dark" : "light"; setTheme(next); document.documentElement.dataset.theme = next; localStorage.setItem("reader-theme", next); };
  const filtered = highlights.filter((item) => item.quote.toLocaleLowerCase("pt-BR").includes(search.toLocaleLowerCase("pt-BR")));
  const allHighlights = articles.flatMap((item) => (library[item.id]?.highlights ?? []).map((highlight) => ({ ...highlight, articleId: item.id })));

  if (screen === "home") return <main className="site-shell home-shell">
    <header className="topbar"><a className="brand" href="#" onClick={(event) => event.preventDefault()}><span className="brand-icon"><BookOpen size={20} /></span><span>Leitura confortável</span></a><button className="icon-button" onClick={toggleTheme} aria-label="Alternar tema">{theme === "light" ? <Moon size={19} /> : <Sun size={19} />}</button></header>
    <section className="hero"><span className="eyebrow">Sua biblioteca acadêmica</span><h1>Artigos densos.<br /><em>Leitura leve.</em></h1><p>Textos e documentos organizados para você avançar sem perder o fio — no computador ou no celular.</p></section>
    <section className="library-section"><div className="section-title"><div><span className="eyebrow">Biblioteca</span><h2>Disponíveis para leitura</h2></div><span className="count-pill">{articles.length} documentos</span></div>
      <div className="article-list">{articles.map((item, index) => { const state = library[item.id] ?? emptyState(); const pages = pageCount(item, isMobile); const saved = isMobile ? state.progress.mobilePage : state.progress.desktopPage; const percent = state.started ? Math.round(((saved + 1) / pages) * 100) : 0; return <button className="article-card" key={item.id} onClick={() => openArticle(item.id)}><div className="card-index">{String(index + 1).padStart(2, "0")}</div><div className="card-body"><div className="card-meta"><span>{item.category}</span><span>{item.year}</span><span>{item.readingMinutes} min</span></div><h3>{item.title}</h3><p>{item.authors}</p><div className="progress-line"><span style={{ width: `${percent}%` }} /></div><div className="card-footer"><span>{percent > 5 ? `${percent}% concluído` : "Pronto para começar"}</span><span className="continue">{percent > 5 ? "Continuar" : "Abrir documento"} <ArrowRight size={16} /></span></div></div></button>; })}</div>
    </section>
    <section className="saved-section"><div className="section-title"><div><span className="eyebrow">Revisão rápida</span><h2>Seus destaques</h2></div><Highlighter size={20} /></div>{allHighlights.length ? <div className="home-highlights">{allHighlights.slice(0, 4).map((item) => <button key={item.id} onClick={() => goToBlock(item.articleId, item.blockId)}>“{item.quote}”</button>)}</div> : <div className="empty-highlights"><Bookmark size={22} /><p>Selecione um trecho durante a leitura e toque em <strong>Grifar</strong>. Ele aparecerá aqui para acesso rápido.</p></div>}</section>
    <footer><span>Biblioteca acadêmica IC-UTFPR</span><span>3 fontes organizadas</span></footer>
  </main>;

  const progressPercent = Math.round(((currentPage + 1) / totalPages) * 100);
  return <main className="reader-shell" style={{ "--reader-size": `${fontSize}px` } as React.CSSProperties}>
    <header className="reader-topbar"><button className="back-button" onClick={() => { setScreen("home"); setPending(null); }}><ChevronLeft size={20} /><span>Biblioteca</span></button><div className={`sync-status ${sync}`}><span />{sync === "saved" ? "Salvo" : sync === "saving" ? "Salvando" : sync === "error" ? "Sem sincronizar" : "Carregando"}</div><div className="reader-actions"><button className="icon-button" onClick={() => setFontSize((size) => Math.max(16, size - 1))} aria-label="Diminuir texto"><Minus size={18} /></button><button className="icon-button" onClick={() => setFontSize((size) => Math.min(24, size + 1))} aria-label="Aumentar texto"><Plus size={18} /></button><button className="icon-button" onClick={toggleTheme} aria-label="Alternar tema">{theme === "light" ? <Moon size={18} /> : <Sun size={18} />}</button><button className="highlight-toggle" onClick={() => setShowHighlights(true)}><Highlighter size={17} /><span>Destaques</span><b>{highlights.length}</b></button></div></header>
    <div className="reading-progress"><span style={{ width: `${progressPercent}%` }} /></div>
    <div className="reader-layout"><aside className="article-rail"><span className="rail-number">{String(articles.findIndex((item) => item.id === active.id) + 1).padStart(2, "0")}</span><span className="rail-line" /><span className="rail-label">{active.railLabel}<br />{active.year}</span></aside><article ref={articleRef} className="article-page" onMouseUp={captureSelection} onTouchEnd={() => window.setTimeout(captureSelection, 80)}>{currentPage === 0 && <header className="article-header"><span className="eyebrow">{active.originalTitle ? "Tradução para português" : "Edição de leitura"}</span><h1>{active.title}</h1><p className="authors">{active.authors}</p><div className="article-meta"><span>{active.journal}</span><span>{active.license}</span></div><p className="adaptation-note">{active.note}</p><a className="source-link" href={active.sourceUrl ?? active.doi} target="_blank" rel="noreferrer">Consultar fonte oficial <ExternalLink size={13} /></a></header>}<div className="article-content">{blockPages[currentPage]?.map((block) => <Block key={block.id} block={block} highlights={highlights} />)}</div><nav className="page-navigation" aria-label="Navegação por páginas"><button disabled={currentPage === 0} onClick={() => { setCurrentPage((page) => Math.max(0, page - 1)); window.scrollTo(0, 0); }}><ChevronLeft size={18} />Anterior</button><span>Página <strong>{currentPage + 1}</strong> de {totalPages}<small>{isMobile ? "versão celular" : "versão desktop"}</small></span><button disabled={currentPage === totalPages - 1} onClick={() => { setCurrentPage((page) => Math.min(totalPages - 1, page + 1)); window.scrollTo(0, 0); }}>Próxima<ChevronRight size={18} /></button></nav></article><aside className="side-notes"><div className="side-notes-title"><Highlighter size={17} /><span>Destaques</span><b>{highlights.length}</b></div>{highlights.length ? highlights.slice(0, 6).map((item) => <button key={item.id} onClick={() => goToBlock(active.id, item.blockId)}>“{item.quote}”</button>) : <p>Selecione um trecho do texto para grifá-lo.</p>}<a className="source-link" href={active.sourceUrl ?? active.doi} target="_blank" rel="noreferrer">Consultar fonte oficial <ExternalLink size={13} /></a></aside></div>
    {pending && <button className="floating-highlight" style={{ left: pending.x, top: pending.y }} onMouseDown={(event) => event.preventDefault()} onClick={saveHighlight}><Highlighter size={16} />Grifar</button>}
    {showHighlights && <div className="drawer-backdrop" onClick={() => setShowHighlights(false)}><aside className="highlights-drawer" onClick={(event) => event.stopPropagation()}><header><div><span className="eyebrow">Anotações visuais</span><h2>Destaques salvos</h2></div><button className="icon-button" onClick={() => setShowHighlights(false)}><X size={20} /></button></header><label className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar nos destaques" /></label><div className="drawer-list">{filtered.length ? filtered.map((item) => <div className="drawer-item" key={item.id}><button onClick={() => goToBlock(active.id, item.blockId)}>“{item.quote}”</button><button className="delete-button" onClick={() => deleteHighlight(item.id)} aria-label="Excluir destaque"><Trash2 size={15} /></button></div>) : <div className="drawer-empty"><Highlighter size={26} /><p>Nenhum destaque encontrado.</p></div>}</div></aside></div>}
  </main>;
}
