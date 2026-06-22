import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/common/Icon";
import Modal from "../components/common/Modal";
import { announcements, resources, stats } from "../data/mockData";
import { toast } from "../components/ui/sonner";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [openAnn, setOpenAnn] = useState(null);

  const recentAnnouncements = [...announcements]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
  const featured = resources.slice(0, 3);

  return (
    <div>
      <Helmet>
        <title>Home | EazyEd</title>
      </Helmet>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -top-32 -left-24 w-[500px] h-[500px] bg-EazyEd-primary/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -right-24 w-[400px] h-[400px] bg-EazyEd-accent/20 blur-[140px] rounded-full pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-EazyEd-primary-soft/60 text-EazyEd-primary text-xs font-semibold uppercase tracking-wider">
              Welcome to EazyEd
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold leading-tight">
              Master your studies with <br />
              <span className="text-EazyEd-primary">EazyEd</span>
            </h1>
            <p className="mt-5 text-lg text-EazyEd-text-muted max-w-xl">
              A comprehensive library of resources, interactive tutorials and
              direct lecturer materials — tailored for your success.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-EazyEd-primary text-white font-medium shadow-lg shadow-EazyEd-primary/30 hover:brightness-110 hover:text-EazyEd-text active:scale-[0.98] transition">
                Browse Resources <Icon name="arrow_forward" size={18} />
              </Link>
              <Link
                to="/tutorials"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-EazyEd-border text-EazyEd-text font-medium hover:border-EazyEd-primary hover:text-EazyEd-primary transition">
                Watch Tutorials <Icon name="play_circle" size={18} />
              </Link>
              <Link
                to="/announcements"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-EazyEd-text-muted font-medium hover:text-EazyEd-primary transition">
                See Announcements <Icon name="campaign" size={18} />
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-[380px] h-[380px] rounded-full bg-gradient-to-br from-EazyEd-primary-soft to-EazyEd-surface-4 border border-EazyEd-border flex items-center justify-center shadow-2xl">
              <div className="absolute inset-8 rounded-full bg-EazyEd-surface border border-EazyEd-border flex items-center justify-center">
                <Icon
                  name="auto_stories"
                  className="text-EazyEd-primary"
                  size={120}
                />
              </div>
              <div className="absolute top-6 right-2 px-3 py-2 rounded-xl bg-EazyEd-surface border border-EazyEd-border shadow-lg flex items-center gap-2 text-sm">
                <Icon name="bolt" className="text-EazyEd-warning" size={18} />{" "}
                248 resources
              </div>
              <div className="absolute bottom-6 left-2 px-3 py-2 rounded-xl bg-EazyEd-surface border border-EazyEd-border shadow-lg flex items-center gap-2 text-sm">
                <Icon
                  name="smart_display"
                  className="text-EazyEd-primary"
                  size={18}
                />{" "}
                96 tutorials
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-6">
        {[
          {
            icon: "library_books",
            label: "Resources",
            value: stats.resources,
            accent: "text-EazyEd-primary",
          },
          {
            icon: "smart_display",
            label: "Tutorials",
            value: stats.tutorials,
            accent: "text-EazyEd-accent",
          },
          {
            icon: "school",
            label: "Courses",
            value: stats.courses,
            accent: "text-EazyEd-success",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div
              className={`w-12 h-12 rounded-xl bg-EazyEd-surface-3 flex items-center justify-center ${s.accent}`}>
              <Icon name={s.icon} filled />
            </div>
            <div>
              <div className="text-2xl font-bold">{s.value}+</div>
              <div className="text-sm text-EazyEd-text-muted">{s.label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Access */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Quick Access</h2>
        <p className="text-EazyEd-text-muted mb-8">
          Jump straight into the section you need.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              to: "/resources",
              icon: "library_books",
              title: "Resources",
              desc: "Lecture notes, slides and study guides.",
            },
            {
              to: "/tutorials",
              icon: "smart_display",
              title: "Tutorials",
              desc: "Video walkthroughs of tricky topics.",
            },
            {
              to: "/announcements",
              icon: "campaign",
              title: "Announcements",
              desc: "Stay current with academic updates.",
            },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-6 hover:border-EazyEd-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-EazyEd-primary/10 transition-all">
              <div className="w-12 h-12 rounded-xl bg-EazyEd-primary-soft text-EazyEd-primary flex items-center justify-center mb-4 group-hover:bg-EazyEd-primary group-hover:text-white transition">
                <Icon name={c.icon} />
              </div>
              <h3 className="text-lg font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-EazyEd-text-muted">{c.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Resources */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Resources
            </h2>
            <p className="text-EazyEd-text-muted mt-1">
              Hand-picked materials trending this week.
            </p>
          </div>
          <Link
            to="/resources"
            className="text-sm font-medium text-EazyEd-primary hover:underline hidden md:inline">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.map((r) => (
            <div
              key={r.id}
              className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-5 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 rounded bg-EazyEd-primary-soft text-EazyEd-primary text-xs font-semibold">
                  {r.type}
                </span>
                <span className="text-xs text-EazyEd-text-muted">{r.size}</span>
              </div>
              <h3 className="font-semibold mb-1 line-clamp-2">{r.title}</h3>
              <p className="text-sm text-EazyEd-text-muted line-clamp-2">
                {r.description}
              </p>
              <div className="mt-4 text-xs text-EazyEd-text-muted flex items-center justify-between pt-a3 border-ta border-EazyEd-border">
                {r.course} · {r.date}
                <button
                  onClick={() =>
                    toast.success("Download started", { description: r.title })
                  }
                  className="px-3 py-1.5 rounded-lg bg-EazyEd-primary text-white text-xs font-medium hover:brightness-110 flex items-center gap-1 cursor-pointer">
                  <Icon name="download" size={14} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Announcements */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Latest Announcements
        </h2>
        <div className="space-y-3">
          {recentAnnouncements.map((a) => (
            <div
              key={a.id}
              className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div
                className={`w-2 h-12 rounded-full ${a.priority === "high" ? "bg-EazyEd-danger" : a.priority === "medium" ? "bg-EazyEd-warning" : "bg-EazyEd-primary"}`}
              />
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-EazyEd-surface-3 text-EazyEd-text-muted">
                    {a.category}
                  </span>
                  <span className="text-xs text-EazyEd-text-muted">
                    {a.date}
                  </span>
                </div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-EazyEd-text-muted line-clamp-1">
                  {a.body}
                </p>
              </div>
              <button
                onClick={() => setOpenAnn(a)}
                className="px-4 py-2 rounded-lg bg-EazyEd-primary-soft text-EazyEd-primary text-sm font-medium hover:bg-EazyEd-primary hover:text-white transition text-nowrap cursor-pointer">
                Read more
              </button>
            </div>
          ))}
        </div>
      </section>

      <Modal
        open={!!openAnn}
        onClose={() => setOpenAnn(null)}
        title={openAnn?.title || ""}>
        {openAnn && (
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm text-EazyEd-text-muted">
              <span className="px-2 py-0.5 rounded-full bg-EazyEd-surface-3">
                {openAnn.category}
              </span>
              <span>{openAnn.date}</span>
            </div>
            <p className="leading-relaxed text-EazyEd-text">{openAnn.body}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
