import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "../components/ui/sonner";

const BookmarksContext = createContext({
  bookmarks: [],
  isBookmarked: () => false,
  toggleBookmark: () => {},
  remove: () => {},
});

const KEY = "EazyEd-bookmarks";

export function BookmarksProvider({ children }) {
  // const [bookmarks, setBookmarks] = useState([]);
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // useEffect(() => {
  //   try {
  //     const raw = localStorage.getItem(KEY);
  //     if (raw) setBookmarks(JSON.parse(raw));
  //   } catch {}
  // }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (id) => bookmarks.some((b) => b.id === id),
    [bookmarks],
  );

  // Optional: prevent duplicate toasts from rapid double-clicks
  // (comment out if you don't need it)
  const toastLock = useRef(false);

  const toggleBookmark = useCallback(
    (item, kind) => {
      // Optional lock to prevent double toasts from fast clicking
      if (toastLock.current) return;
      toastLock.current = true;
      setTimeout(() => {
        toastLock.current = false;
      }, 300);

      // Check existence using current state
      const exists = isBookmarked(item.id);

      // Show toast once, outside the setState updater
      if (exists) {
        toast("Removed from bookmarks", { description: item.title });
      } else {
        toast.success("Saved to bookmarks", { description: item.title });
      }

      // Update state (the updater is now pure – no side effects)
      setBookmarks((prev) => {
        const already = prev.some((b) => b.id === item.id);
        if (already) {
          return prev.filter((b) => b.id !== item.id);
        } else {
          return [...prev, { ...item, kind }];
        }
      });
    },
    [isBookmarked], // now dependent on isBookmarked
  );

  const remove = useCallback((id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    toast("Removed from bookmarks");
  }, []);

  return (
    <BookmarksContext.Provider
      value={{ bookmarks, isBookmarked, toggleBookmark, remove }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarksContext);
