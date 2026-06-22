import { useMemo, useState, useRef, useEffect } from "react";
import Icon from "../components/common/Icon";
import Modal from "../components/common/Modal";
import { tutorials } from "../data/mockData";
import { useBookmarks } from "../context/BookmarksContext";
import { usePageSize } from "../hooks/use-page-size";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import { Helmet } from "react-helmet-async";

// Fixed-length pagination helper to prevent viewport overflow
const getPaginationRange = (currentPage, totalPages) => {
  const current = Number(currentPage);
  const total = Number(totalPages);

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
};

export default function Tutorials() {
  const ITEMS_PER_PAGE = usePageSize();

  const [playing, setPlaying] = useState(null);
  const [query, setQuery] = useState(
    () => localStorage.getItem("tutorials-query") || "",
  );

  const [currentPage, setCurrentPage] = useState(
    () => Number(localStorage.getItem("tutorials-page")) || 1,
  );
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const featured = tutorials.filter((t) => t.featured);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tutorials.filter(
      (t) =>
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.course.toLowerCase().includes(q),
    );
  }, [query]);

  // Pagination Logic
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return list.slice(start, start + ITEMS_PER_PAGE);
  }, [list, currentPage, ITEMS_PER_PAGE]);

  const resultsRef = useRef(null);

  // Scroll to results when query changes
  const scrollToResults = () => {
    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    localStorage.setItem("tutorials-query", query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem("tutorials-page", currentPage);
  }, [currentPage]);

  const Card = ({ t, big }) => {
    const bm = isBookmarked(t.id);
    return (
      <div
        className={`bg-EazyEd-surface border border-EazyEd-border rounded-2xl overflow-hidden flex flex-col hover:shadow-lg hover:border-EazyEd-primary/40 transition ${big ? "md:col-span-2" : ""}`}>
        <div
          className={`relative ${big ? "aspect-[21/9]" : "aspect-video"} bg-EazyEd-surface-3`}>
          <img
            src={t.thumb}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <button
            onClick={() => setPlaying(t)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition">
            <div className="w-16 h-16 rounded-full bg-white/90 text-EazyEd-primary flex items-center justify-center shadow-lg cursor-pointer">
              <Icon name="play_arrow" filled size={36} />
            </div>
          </button>
          <span className="absolute bottom-2 right-2 px-2 py-1 rounded bg-EazyEd-primary-soft text-EazyEd-text text-xs font-medium">
            {t.duration}
          </span>
        </div>
        <div className="p-5 flex flex-col grow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-EazyEd-primary">
              {t.course}
            </span>
            <button
              onClick={() => toggleBookmark(t, "tutorial")}
              className="text-EazyEd-text-muted hover:text-EazyEd-primary cursor-pointer">
              <Icon
                name="bookmark"
                filled={bm}
                className={bm ? "text-EazyEd-primary" : ""}
              />
            </button>
          </div>
          <h3 className="font-semibold mb-1">{t.title}</h3>
          <p className="text-sm text-EazyEd-text-muted line-clamp-2 grow">
            {t.description}
          </p>
          <button
            onClick={() => setPlaying(t)}
            className="mt-4 self-start px-4 py-2 rounded-lg bg-EazyEd-primary text-white text-sm font-medium hover:brightness-110 flex items-center gap-1 cursor-pointer">
            <Icon name="play_arrow" size={16} /> Watch now
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <Helmet>
        <title>Video Tutorials | EazyEd</title>
        <meta
          name="description"
          content="Video walkthroughs across all your subjects."
        />
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Tutorials</h1>
      <p className="text-EazyEd-text-muted mb-8">
        Video walkthroughs across all your subjects.
      </p>

      {featured.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Icon name="star" filled className="text-EazyEd-warning" /> Featured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {featured.map((t) => (
              <Card key={t.id} t={t} />
            ))}
          </div>
        </>
      )}

      <div
        ref={resultsRef}
        className="h-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 border-t border-EazyEd-border"></div>
      <div className="flex items-center gap-2 mb-6 bg-EazyEd-surface border border-EazyEd-border rounded-xl px-4 max-w-md">
        <Icon name="search" className="text-EazyEd-text-muted" size={20} />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
            scrollToResults();
          }}
          placeholder="Search tutorials…"
          className="bg-transparent outline-none py-2.5 w-full"
        />

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedList.map((t) => (
          <Card key={t.id} t={t} />
        ))}
      </div>

      {/* Responsive Pagination Component */}
      {totalPages > 1 && (
        <div className="mt-12 w-full flex justify-center">
          <Pagination className="w-full max-w-md md:max-w-none">
            <PaginationContent className="flex flex-wrap justify-between items-center w-full md:flex-nowrap md:justify-center gap-y-4 md:gap-y-0 md:gap-x-2">
              {/* Previous Button: Stays bottom-left on mobile, Left on desktop */}
              <PaginationItem className="order-2 w-[48%] md:w-auto md:order-1">
                <PaginationPrevious
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    scrollToResults();
                  }}
                  className={`w-full justify-center cursor-pointer ${
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                />
              </PaginationItem>

              {/* Page Numbers: Takes full top row on mobile, Centers on desktop */}
              <div className="order-1 w-full flex justify-center items-center gap-1 md:w-auto md:order-2">
                {getPaginationRange(currentPage, totalPages).map(
                  (page, index) => (
                    <PaginationItem key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-EazyEd-text-muted select-none">
                          ...
                        </span>
                      ) : (
                        <PaginationLink
                          onClick={() => {
                            setCurrentPage(page);
                            scrollToResults();
                          }}
                          isActive={currentPage === page}
                          className="cursor-pointer">
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ),
                )}
              </div>

              {/* Next Button: Stays bottom-right on mobile, Right on desktop */}
              <PaginationItem className="order-3 w-[48%] md:w-auto md:order-3">
                <PaginationNext
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    scrollToResults();
                  }}
                  className={`w-full justify-center cursor-pointer ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <Modal
        open={!!playing}
        onClose={() => setPlaying(null)}
        title={playing?.title || ""}
        maxWidth="max-w-4xl">
        {playing && (
          <div>
            <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4">
              <iframe
                src={playing.videoUrl}
                title={playing.title}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; encrypted-media; picture-in-picture"
              />
            </div>
            <p className="text-sm text-EazyEd-text-muted">
              {playing.description}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
