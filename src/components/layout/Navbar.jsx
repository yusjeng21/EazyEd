import { NavLink, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useBookmarks } from "../../context/BookmarksContext";
import Icon from "../common/Icon";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/resources", label: "Resources" },
  { to: "/tutorials", label: "Tutorials" },
  { to: "/announcements", label: "Announcements" },
  { to: "/study-tips", label: "Study Tips" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { bookmarks } = useBookmarks();
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // New: flag to block scroll‑close for a short time after opening
  const allowScrollClose = useRef(true);

  // Click outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Scroll close – with a small delay
  useEffect(() => {
    if (!open) return;

    // When menu opens, block scroll‑close for 300ms
    allowScrollClose.current = false;
    const timer = setTimeout(() => {
      allowScrollClose.current = true;
    }, 300);

    const handleScroll = () => {
      if (allowScrollClose.current) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  // ... the rest of the component (JSX) remains exactly the same as before
  // (I'll include it for completeness)
  return (
    <header className="sticky top-0 z-40 w-full bg-EazyEd-surface/85 backdrop-blur-md border-b border-EazyEd-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3.5">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}>
          <div className="w-9 h-9 rounded-xl bg-EazyEd-primary text-white flex items-center justify-center shadow-md shadow-EazyEd-primary/30">
            <Icon name="school" filled />
          </div>
          <span className="font-display text-xl font-bold text-EazyEd-text tracking-tight">
            EazyEd
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-EazyEd-primary bg-EazyEd-primary-soft/50"
                    : "text-EazyEd-text-muted hover:text-EazyEd-primary hover:bg-EazyEd-surface-3"
                }`
              }>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link
            to="/bookmarks"
            className="relative p-2 rounded-full text-EazyEd-text-muted hover:text-EazyEd-primary hover:bg-EazyEd-surface-3 transition"
            aria-label="Bookmarks">
            <Icon name="bookmarks" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-EazyEd-primary text-white text-[10px] font-semibold flex items-center justify-center">
                {bookmarks.length}
              </span>
            )}
          </Link>
          <button
            onClick={toggle}
            className="p-2 rounded-full text-EazyEd-text-muted hover:text-EazyEd-primary hover:bg-EazyEd-surface-3 transition"
            aria-label="Toggle theme">
            <Icon name={theme === "dark" ? "light_mode" : "dark_mode"} />
          </button>
          <button
            ref={toggleButtonRef}
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 rounded-full text-EazyEd-text-muted hover:bg-EazyEd-surface-3"
            aria-label="Menu">
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}>
        <nav className="flex flex-col px-4 pb-4 gap-1 border-t border-EazyEd-border bg-EazyEd-surface">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-EazyEd-primary bg-EazyEd-primary-soft/50"
                    : "text-EazyEd-text-muted hover:bg-EazyEd-surface-3"
                }`
              }>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
