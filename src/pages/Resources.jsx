import { useMemo, useState, useEffect, useRef } from "react";
import { toast } from "../components/ui/sonner";
import Icon from "../components/common/Icon";
import { resources } from "../data/mockData";
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

const schools = [
  "All Schools",
  ...Array.from(new Set(resources.map((r) => r.school))),
];
const courses = [
  "All Courses",
  ...Array.from(new Set(resources.map((r) => r.course))),
];

// Helper for pagination ellipsis
const getPaginationRange = (currentPage, totalPages) => {
  const delta = 2;
  const range = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    } else if (range[range.length - 1] !== "...") {
      range.push("...");
    }
  }
  return range;
};

export default function Resources() {
  const ITEMS_PER_PAGE = usePageSize();

  const [query, setQuery] = useState(
    () => localStorage.getItem("resources-query") || "",
  );
  const [school, setSchool] = useState(
    () => localStorage.getItem("resources-school") || "All Schools",
  );
  const [course, setCourse] = useState(
    () => localStorage.getItem("resources-course") || "All Courses",
  );
  const [sortDesc, setSortDesc] = useState(() =>
    JSON.parse(localStorage.getItem("resources-sort") ?? "true"),
  );
  const [currentPage, setCurrentPage] = useState(
    () => Number(localStorage.getItem("resources-page")) || 1,
  );
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Persist filters to localStorage
  useEffect(() => {
    localStorage.setItem("resources-query", query);
  }, [query]);
  useEffect(() => {
    localStorage.setItem("resources-school", school);
  }, [school]);
  useEffect(() => {
    localStorage.setItem("resources-course", course);
  }, [course]);
  useEffect(() => {
    localStorage.setItem("resources-sort", JSON.stringify(sortDesc));
  }, [sortDesc]);
  useEffect(() => {
    localStorage.setItem("resources-page", currentPage);
  }, [currentPage]);

  // Filter and sort logic
  const filtered = useMemo(() => {
    let list = resources.filter((r) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.course.toLowerCase().includes(q);
      const matchS = school === "All Schools" || r.school === school;
      const matchC = course === "All Courses" || r.course === course;
      return matchQ && matchS && matchC;
    });
    list.sort((a, b) =>
      sortDesc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date),
    );
    return list;
  }, [query, school, course, sortDesc]);

  // Download handler
  const handleDownload = (r) => {
    // Check if the resource has a fileUrl
    if (!r.fileUrl) {
      toast.error("File not available for this resource");
      return;
    }

    toast.success("Download started", { description: r.title });

    // Trigger download
    const link = document.createElement("a");
    link.href = r.fileUrl;
    // const fileName = r.fileUrl.split("/").pop();
    const fileName = r.title.split("/").pop();
    link.download = fileName;
    // link.download = r.fileUrl.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage, ITEMS_PER_PAGE]);

  // Request Form
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    details: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!form.course.trim()) e.course = "Course code is required.";
    if (!form.details.trim()) e.details = "Don't forget your request details.";
    return e;
  };

  const submitRequest = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) {
      setSuccess(false);
      return;
    }
    setSuccess(true);
    toast.success("Resource request submitted");
    setForm({ name: "", email: "", course: "", details: "" });
  };

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    if (success) setSuccess(false);
  };

  const fieldClass = (k) =>
    `w-full bg-EazyEd-surface-2 border rounded-lg px-4 py-2.5 outline-none transition ${
      errors[k]
        ? "border-EazyEd-danger focus:border-EazyEd-danger"
        : "border-EazyEd-border focus:border-EazyEd-primary"
    }`;

  // Scroll to top on filter/page change
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, query, sortDesc]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <Helmet>
        <title>Course Resources | EazyEd</title>
        <meta
          name="description"
          content="Browse lecture notes, slides and study guides across schools."
        />
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Resources</h1>
      <p className="text-EazyEd-text-muted mb-8">
        Browse lecture notes, slides and study guides across schools.
      </p>

      {/* Filters Toolbar */}
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
            placeholder="Search resources or courses…"
            className="bg-transparent border-none outline-none py-2.5 w-full text-EazyEd-text placeholder:text-EazyEd-text-muted"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setCurrentPage(1);
              }}
              className="text-EazyEd-text-muted hover:text-EazyEd-primary transition cursor-pointer"
              aria-label="Clear search">
              <Icon name="close" size={20} />
            </button>
          )}
        </div>
        <select
          value={school}
          onChange={(e) => {
            setSchool(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-EazyEd-surface-2 border border-EazyEd-border rounded-lg px-3 py-2.5 text-sm cursor-pointer">
          {schools.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
            setCurrentPage(1);
          }}
          className="bg-EazyEd-surface-2 border border-EazyEd-border rounded-lg px-3 py-2.5 text-sm cursor-pointer">
          {courses.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <button
          onClick={() => setSortDesc((s) => !s)}
          className="min-w-max px-4 py-2.5 rounded-lg bg-EazyEd-surface-2 border border-EazyEd-border text-sm flex items-center gap-1 hover:border-EazyEd-primary cursor-pointer">
          <Icon name={sortDesc ? "south" : "north"} size={16} />
          {sortDesc ? "Newest" : "Oldest"}
        </button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedList.map((r) => {
          const bm = isBookmarked(r.id);
          return (
            <div
              key={r.id}
              className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-5 flex flex-col hover:shadow-lg hover:border-EazyEd-primary/40 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 rounded bg-EazyEd-primary-soft text-EazyEd-primary text-xs font-semibold">
                  {r.type}
                </span>
                <button
                  onClick={() => toggleBookmark(r, "resource")}
                  className="text-EazyEd-text-muted hover:text-EazyEd-primary cursor-pointer">
                  <Icon
                    name="bookmark"
                    filled={bm}
                    className={bm ? "text-EazyEd-primary" : ""}
                  />
                </button>
              </div>
              <h3 className="font-semibold mb-1">{r.title}</h3>
              <p className="text-xs text-EazyEd-text-muted mb-2">
                {r.course} · {r.school}
              </p>
              <p className="text-sm text-EazyEd-text-muted line-clamp-2 mb-4">
                {r.description}
              </p>
              <div className="mt-auto flex items-center justify-between text-xs text-EazyEd-text-muted pt-3 border-t border-EazyEd-border">
                <span>
                  {r.date} · {r.size}
                </span>
                <button
                  download
                  onClick={() => handleDownload(r)}
                  className="px-3 py-1.5 rounded-lg bg-EazyEd-primary text-white text-xs font-medium hover:brightness-110 flex items-center gap-1 cursor-pointer">
                  <Icon name="download" size={14} /> Download
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-12 text-EazyEd-text-muted">
            No resources match your filters.
          </div>
        )}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <div className="mt-12 w-full flex justify-center">
          <Pagination className="w-full max-w-md md:max-w-none">
            <PaginationContent className="flex flex-wrap justify-between items-center w-full md:flex-nowrap md:justify-center gap-y-4 md:gap-y-0 md:gap-x-2">
              <PaginationItem className="order-2 w-[48%] md:w-auto md:order-1">
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`w-full justify-center cursor-pointer ${
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                />
              </PaginationItem>

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
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer">
                          {page}
                        </PaginationLink>
                      )}
                    </PaginationItem>
                  ),
                )}
              </div>

              <PaginationItem className="order-3 w-[48%] md:w-auto md:order-3">
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
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

      {/* Request Form Section */}
      <div className="mt-16 bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-1">
          Can't find what you're looking for?
        </h2>
        <p className="text-EazyEd-text-muted mb-6">
          Request specific course materials and we'll do our best to source
          them.
        </p>

        <form
          onSubmit={submitRequest}
          noValidate
          className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your name"
              className={fieldClass("name")}
            />
            {errors.name && (
              <p className="text-xs text-EazyEd-danger mt-1">{errors.name}</p>
            )}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Email address"
              className={fieldClass("email")}
            />
            {errors.email && (
              <p className="text-xs text-EazyEd-danger mt-1">{errors.email}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Course Code
            </label>
            <input
              value={form.course}
              onChange={(e) => update("course", e.target.value)}
              placeholder="e.g. CSC 301"
              className={fieldClass("course")}
            />
            {errors.course && (
              <p className="text-xs text-EazyEd-danger mt-1">{errors.course}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Request Details
            </label>
            <textarea
              value={form.details}
              onChange={(e) => update("details", e.target.value)}
              placeholder="Describe the material you need…"
              rows={4}
              className={`${fieldClass("details")} resize-none`}
            />
            {errors.details && (
              <p className="text-xs text-EazyEd-danger mt-1">
                {errors.details}
              </p>
            )}
          </div>

          {success && (
            <div className="md:col-span-2 text-sm px-3 py-2 rounded-lg bg-EazyEd-success/10 text-EazyEd-success">
              Request submitted — we'll reach out shortly.
            </div>
          )}

          <button
            type="submit"
            className="md:col-span-2 justify-self-start px-6 py-2.5 rounded-lg bg-EazyEd-primary text-white font-medium hover:brightness-110 inline-flex items-center gap-2 cursor-pointer disabled:cursor-wait">
            <Icon name="send" size={18} />
            Submit request
          </button>
        </form>
      </div>
    </div>
  );
}
