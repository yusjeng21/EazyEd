import { useMemo, useState, useEffect, useRef } from "react";
import Icon from "../components/common/Icon";
import Modal from "../components/common/Modal";
import { announcements } from "../data/mockData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { Helmet } from "react-helmet-async";

const ITEMS_PER_PAGE = 6;

const priorityStyles = {
  high: "bg-EazyEd-danger/15 text-EazyEd-danger border-EazyEd-danger/30",
  medium:
    "bg-yellow-400/15 text-yellow-600 dark:text-yellow-400 border-yellow-400/30",
  low: "bg-EazyEd-success/15 text-EazyEd-success border-EazyEd-success/30",
};

const priorityLabel = { high: "High Priority", medium: "Medium", low: "Low" };

export default function Announcements() {
  const [query, setQuery] = useState(
    () => localStorage.getItem("announcements-query") || "",
  );

  const [sortDesc, setSortDesc] = useState(() =>
    JSON.parse(localStorage.getItem("announcements-sort") ?? "true"),
  );

  const [currentPage, setCurrentPage] = useState(
    () => Number(localStorage.getItem("announcements-page")) || 1,
  );
  const [active, setActive] = useState(null);

  useEffect(() => {
    localStorage.setItem("announcements-query", query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("announcements-page", currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("announcements-sort", sortDesc);
  }, [sortDesc]);

  // Filter and sort – pure computation, no side effects
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = announcements.filter(
      (a) =>
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.body.toLowerCase().includes(q),
    );
    list.sort((a, b) =>
      sortDesc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
    return list;
  }, [query, sortDesc]);

  // Reset page when search changes
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [query]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  // If current page exceeds total pages after filtering, reset to 1
  // useEffect(() => {
  //   if (totalPages > 0 && currentPage > totalPages) {
  //     setCurrentPage(1);
  //   }
  // }, [totalPages, currentPage]);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    // Smooth scroll to top when user changes page, search, or sort
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, query, sortDesc]);

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
      <Helmet>
        <title>Announcements | EazyEd</title>
        <meta
          name="description"
          content="Stay up to date with academic notices, events, and urgent updates."
        />
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Announcements</h1>
      <p className="text-EazyEd-text-muted mb-8">
        Stay up to date with academic notices, events, and urgent updates.
      </p>

      <div className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-3">
        <div className="flex items-center gap-2 grow bg-EazyEd-surface-2 rounded-lg px-3 border border-transparent focus-within:border-EazyEd-primary transition">
          <Icon name="search" className="text-EazyEd-text-muted" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search announcements…"
            className="bg-transparent border-none outline-none py-2.5 w-full text-EazyEd-text placeholder:text-EazyEd-text-muted"
          />

          {/* Clear Button */}
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setCurrentPage(1);
              }}
              className="text-EazyEd-text-muted hover:text-EazyEd-primary transition"
              aria-label="Clear search">
              <Icon name="close" size={20} />
            </button>
          )}
        </div>
        <button
          onClick={() => {
            setSortDesc((s) => !s);
            setCurrentPage(1);
          }}
          className="px-4 py-2.5 rounded-lg bg-EazyEd-surface-2 border border-EazyEd-border text-sm flex items-center gap-2 hover:border-EazyEd-primary cursor-pointer">
          <Icon name={sortDesc ? "south" : "north"} size={16} />
          {sortDesc ? "Newest first" : "Oldest first"}
        </button>
      </div>

      <div className="space-y-4">
        {paginatedList.map((a) => (
          <article
            key={a.id}
            className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-5 md:p-6 hover:border-EazyEd-primary/40 transition">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`px-2 py-1 rounded text-xs font-semibold border ${priorityStyles[a.priority]}`}>
                {priorityLabel[a.priority]}
              </span>
              <span className="px-2 py-1 rounded bg-EazyEd-surface-3 text-EazyEd-text-muted text-xs">
                {a.category}
              </span>
              <span className="text-xs text-EazyEd-text-muted ml-auto flex items-center gap-1">
                <Icon name="event" size={14} />
                {a.date}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{a.title}</h3>
            <p className="text-sm text-EazyEd-text-muted line-clamp-2 mb-4">
              {a.body}
            </p>
            <button
              onClick={() => setActive(a)}
              className="px-4 py-2 rounded-lg bg-EazyEd-primary text-white text-sm font-medium hover:brightness-110 inline-flex items-center gap-1">
              Read more <Icon name="arrow_forward" size={16} />
            </button>
          </article>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-EazyEd-text-muted">
            No announcements match your search.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <Modal
        open={!!active}
        onClose={() => setActive(null)}
        title={active?.title || ""}>
        {active && (
          <div>
            <div className="flex flex-wrap gap-2 mb-4 text-xs">
              <span
                className={`px-2 py-1 rounded font-semibold border ${priorityStyles[active.priority]}`}>
                {priorityLabel[active.priority]}
              </span>
              <span className="px-2 py-1 rounded bg-EazyEd-surface-3 text-EazyEd-text-muted">
                {active.category}
              </span>
              <span className="px-2 py-1 rounded bg-EazyEd-surface-3 text-EazyEd-text-muted">
                {active.date}
              </span>
            </div>
            <p className="text-EazyEd-text leading-relaxed">{active.body}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
