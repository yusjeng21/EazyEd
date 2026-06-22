import { useState, useEffect } from "react";
import { toast } from "../components/ui/sonner";
import Icon from "../components/common/Icon";
import { Helmet } from "react-helmet-async";

const categories = [
  {
    id: "exam-prep",
    title: "Exam Preparation",
    icon: "menu_book",
    tips: [
      "Build a study calendar at least 3 weeks before exams, allocating heavier slots to weak topics.",
      "Convert lecture notes into question-and-answer flashcards to force active recall.",
      "Practice with past papers under timed conditions to simulate real exam pressure.",
    ],
  },
  {
    id: "time-management",
    title: "Time Management",
    icon: "schedule",
    tips: [
      "Use the Pomodoro technique: 25 minutes focused study, 5 minutes break, longer break after 4 cycles.",
      "Plan your week on Sunday evening — block deep-work hours before checking email or social media.",
      "Batch similar tasks (reading, problem sets, writing) to reduce context-switching cost.",
    ],
  },
  {
    id: "revision",
    title: "Revision Techniques",
    icon: "autorenew",
    tips: [
      "Use spaced repetition — review material at increasing intervals (1 day, 3 days, 1 week, 2 weeks).",
      "Teach the concept aloud as if explaining to a friend; gaps in your knowledge surface quickly.",
      "Summarise each chapter in one page or a single mind map — forces real understanding.",
    ],
  },
  {
    id: "exam-day",
    title: "Exam Day Tips",
    icon: "task_alt",
    tips: [
      "Sleep at least 7 hours the night before — last-minute cramming hurts more than it helps.",
      "Arrive 20 minutes early with ID, pens, calculator, and water.",
      "Read every question fully before writing, and budget your time per section on the first pass.",
    ],
  },
];

const templates = [
  {
    id: "daily",
    title: "Daily Planner",
    desc: "Hour-by-hour layout to structure focused study sessions.",
    icon: "today",
  },
  {
    id: "weekly",
    title: "Weekly Tracker",
    desc: "Track topics covered, assignments due, and revision goals.",
    icon: "calendar_view_week",
  },
  {
    id: "countdown",
    title: "Exam Countdown",
    desc: "30-day countdown sheet with daily revision targets.",
    icon: "hourglass_top",
  },
];

function Accordion({ item, open, onToggle }) {
  return (
    <div className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-EazyEd-surface-2 transition cursor-pointer">
        <span className="w-10 h-10 rounded-full bg-EazyEd-primary-soft text-EazyEd-primary flex items-center justify-center">
          <Icon name={item.icon} size={20} />
        </span>
        <span className="font-semibold grow">{item.title}</span>
        <Icon
          name="expand_more"
          className={`text-EazyEd-text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <ul className="px-5 pb-5 pl-16 space-y-2 list-disc text-EazyEd-text-muted">
            {item.tips.map((t, i) => (
              <li key={i} className="leading-relaxed">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function StudyTips() {
  const [openId, setOpenId] = useState(() => {
    const savedIndex = localStorage.getItem("openTipIndex");
    return savedIndex !== null ? savedIndex : null;
  });

  useEffect(() => {
    if (openId !== null) {
      localStorage.setItem("openTipIndex", String(openId));
    } else {
      localStorage.removeItem("openTipIndex");
    }
  }, [openId]);

  // Unified download feedback handler
  const handleDownload = (t) => {
    toast.success("Download started", {
      description: `${t.title} template`,
    });

    setTimeout(() => {
      toast.success("Download finished", {
        description: `${t.title} template saved successfully.`,
      });
    }, 3000); // 3 seconds flat delay
  };

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
      <Helmet>
        <title>Study Tips | EazyEd</title>
        <meta
          name="description"
          content="Proven techniques to study smarter, manage time, and walk into exams confident."
        />
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Study Tips</h1>
      <p className="text-EazyEd-text-muted mb-8">
        Proven techniques to study smarter, manage time, and walk into exams
        confident.
      </p>

      <div className="space-y-3 mb-16">
        {categories.map((c) => (
          <Accordion
            key={c.id}
            item={c}
            open={openId === c.id}
            onToggle={() => setOpenId(openId === c.id ? null : c.id)}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-2">Study Schedule Templates</h2>
      <p className="text-EazyEd-text-muted mb-6">
        Download ready-made planners to kickstart your routine.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map((t) => (
          <div
            key={t.id}
            className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-6 flex flex-col hover:border-EazyEd-primary/40 transition">
            <div className="w-12 h-12 rounded-xl bg-EazyEd-primary-soft text-EazyEd-primary flex items-center justify-center mb-4">
              <Icon name={t.icon} />
            </div>
            <h3 className="font-semibold mb-1">{t.title}</h3>
            <p className="text-sm text-EazyEd-text-muted mb-5 grow">{t.desc}</p>
            <button
              onClick={() => handleDownload(t)}
              className="px-4 py-2 rounded-lg bg-EazyEd-primary text-white text-sm font-medium hover:brightness-110 inline-flex items-center justify-center gap-1 cursor-pointer">
              <Icon name="download" size={16} /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
