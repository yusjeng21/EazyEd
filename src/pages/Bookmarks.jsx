import { Link } from "react-router-dom";
import Icon from "../components/common/Icon";
import { useBookmarks } from "../context/BookmarksContext";
import { Helmet } from "react-helmet-async";

export default function Bookmarks() {
  const { bookmarks, remove } = useBookmarks();

  if (bookmarks.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <Helmet>
          <title>My Bookmarks | EazyEd</title>
        </Helmet>{" "}
        <div className="w-20 h-20 mx-auto rounded-full bg-EazyEd-surface-3 text-EazyEd-primary flex items-center justify-center mb-6">
          <Icon name="bookmark" size={40} />
        </div>
        <h1 className="text-2xl font-bold mb-2">No bookmarks yet</h1>
        <p className="text-EazyEd-text-muted mb-6">
          Save resources and tutorials to find them here.
        </p>
        <div className="">
          {/* <button>Hello</button> */}
          <Link
            to="/resources"
            // className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-EazyEd-border text-EazyEd-text font-medium bg-EazyEd-primary  hover:bg-EazyEd-on-primary hover:border-white hover:border hover:transition">
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl justify-around bg-EazyEd-primary text-white font-medium shadow-lg hover:brightness-110 hover:text-EazyEd-shadow-EazyEd-secondary active:scale-[0.98] transition">
            Browse resources
          </Link>
          <Link
            to="/tutorials"
            // className="w-[177.667px] ml-4 inline-block px-5 py-2.5 rounded-lg bg-EazyEd-primary text-white font-medium">
            className="w-[177.667px] ml-1 inline-flex items-center justify-around text-center gap-2 px-5 py-3 rounded-xl bg-EazyEd-primary text-white font-medium shadow-lg hover:brightness-110 hover:text-shadow-EazyEd-secondary active:scale-[0.98] transition">
            Browse tutorials
          </Link>
        </div>
      </div>
    );
  }

  const resources = bookmarks.filter((b) => b.kind === "resource");
  const tutorials = bookmarks.filter((b) => b.kind === "tutorial");

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">My Bookmarks</h1>
      <p className="text-EazyEd-text-muted mb-8">
        {bookmarks.length} saved item{bookmarks.length !== 1 && "s"}.
      </p>

      {resources.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r) => (
              <div
                key={r.id}
                className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 rounded bg-EazyEd-primary-soft text-EazyEd-primary text-xs font-semibold">
                    {r.type}
                  </span>
                  <button
                    onClick={() => remove(r.id)}
                    className="text-EazyEd-text-muted hover:text-EazyEd-danger"
                    aria-label="Remove">
                    <Icon name="bookmark_remove" />
                  </button>
                </div>
                <h3 className="font-semibold mb-1">{r.title}</h3>
                <p className="text-xs text-EazyEd-text-muted mb-3">
                  {r.course}
                </p>
                <button className="px-3 py-1.5 rounded-lg bg-EazyEd-primary text-white text-xs font-medium">
                  Open
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {tutorials.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tutorials.map((t) => (
              <div
                key={t.id}
                className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl overflow-hidden">
                {t.thumb && (
                  <img
                    src={t.thumb}
                    alt=""
                    className="aspect-video w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-semibold text-EazyEd-primary">
                      {t.subject}
                    </span>
                    <button
                      onClick={() => remove(t.id)}
                      className="text-EazyEd-text-muted hover:text-EazyEd-danger"
                      aria-label="Remove">
                      <Icon name="bookmark_remove" size={20} />
                    </button>
                  </div>
                  <h3 className="font-semibold mb-1">{t.title}</h3>
                  <Link
                    to="/tutorials"
                    className="text-xs text-EazyEd-primary font-medium">
                    Watch →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
