import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { ThemeProvider } from "./context/ThemeContext";
import { BookmarksProvider } from "./context/BookmarksContext";
import Layout from "./components/layout/Layout";
import ComingSoon from "./components/common/ComingSoon";
import { ScrollToTop } from "./components/common/ScrollToTop";

const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const Home = lazy(() => import("./pages/Home"));
const Resources = lazy(() => import("./pages/Resources"));
const Tutorials = lazy(() => import("./pages/Tutorials"));
const Announcements = lazy(() => import("./pages/Announcements"));
const StudyTips = lazy(() => import("./pages/StudyTips"));
const Contact = lazy(() => import("./pages/Contact"));

export default function App() {
  return (
    <ThemeProvider>
      <BookmarksProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense
            fallback={
              <div className="h-screen flex items-center justify-center">
                Loading...
              </div>
            }>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/study-tips" element={<StudyTips />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="*"
                  element={
                    <ComingSoon title="Page not found" icon="search_off" />
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </BookmarksProvider>
    </ThemeProvider>
  );
}
