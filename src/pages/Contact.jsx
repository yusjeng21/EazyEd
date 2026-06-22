import { useState, useEffect } from "react";
import Icon from "../components/common/Icon";
import Modal from "../components/common/Modal";
import { Helmet } from "react-helmet-async";

const faqs = [
  {
    q: "How do I bookmark a resource or tutorial?",
    a: "Click the bookmark icon on any resource card or video. Your saved items appear in the Bookmarks tab and persist in your browser.",
  },
  {
    q: "Are downloads free for all students?",
    a: "Yes — every resource on EazyEd is free for enrolled students. Sign in is not required for browsing.",
  },
  {
    q: "How do I request a missing course material?",
    a: "Open the Resources page, scroll to the request form, and describe what you need. Our team typically responds within 48 hours.",
  },
  {
    q: "Can I submit my own tutorial or notes?",
    a: "Absolutely. Email submissions@EazyEd.edu with your file and a short description and we'll review it for the library.",
  },
  {
    q: "Does EazyEd work offline?",
    a: "Downloaded PDFs and slides work offline. Video tutorials require an internet connection to stream.",
  },
];

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="mb-2 md:mt-5 border-b md:border border-EazyEd-border #last:border-0 md:rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 md:px-1 py-4 text-left #rounded-full hover:bg-EazyEd-surface-2 transition cursor-pointer">
        <span className="font-medium grow">{item.q}</span>
        <Icon
          name="expand_more"
          className={`text-EazyEd-text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] opacity-100 pb-s4" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden mt-1">
          <p className="text-sm px-2 text-EazyEd-text-muted leading-relaxed">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  // const [openFaq, setOpenFaq] = useState("");
  const [openFaq, setOpenFaq] = useState(() => {
    const savedIndex = localStorage.getItem("openFaqIndex");
    return savedIndex !== null ? Number(savedIndex) : null;
  });

  useEffect(() => {
    if (openFaq !== null) {
      localStorage.setItem("openFaqIndex", String(openFaq));
    } else {
      localStorage.removeItem("openFaqIndex");
    }
  }, [openFaq]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Add a short subject.";
    if (!form.message.trim()) e.message = "Don't forget your message.";
    else if (form.message.trim().length < 10)
      e.message = "Message should be at least 10 characters.";
    return e;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;
    setForm({ name: "", email: "", subject: "", message: "" });
    setSuccess(true);
  };

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const fieldClass = (k) =>
    `w-full bg-EazyEd-surface-2 border rounded-lg px-4 py-2.5 outline-none transition ${
      errors[k]
        ? "border-EazyEd-danger"
        : "border-EazyEd-border focus:border-EazyEd-primary"
    }`;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <Helmet>
        <title>Contact & Support | EazyEd</title>
        <meta
          name="description"
          content="Questions, feedback, or technical issues — we read every message."
        />
      </Helmet>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Contact & Support</h1>
      <p className="text-EazyEd-text-muted mb-8">
        Questions, feedback, or technical issues — we read every message.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">Send us a message</h2>
          <form
            onSubmit={onSubmit}
            noValidate
            className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={fieldClass("name")}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-xs text-EazyEd-danger mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={fieldClass("email")}
                placeholder="you@university.edu"
              />
              {errors.email && (
                <p className="text-xs text-EazyEd-danger mt-1">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                className={fieldClass("subject")}
                placeholder="What's this about?"
              />
              {errors.subject && (
                <p className="text-xs text-EazyEd-danger mt-1">
                  {errors.subject}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={5}
                className={`${fieldClass("message")} resize-none`}
                placeholder="Tell us more…"
              />
              {errors.message && (
                <p className="text-xs text-EazyEd-danger mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="md:col-span-2 justify-self-start px-6 py-2.5 rounded-lg bg-EazyEd-primary text-white font-medium hover:brightness-110 inline-flex items-center gap-2 cursor-pointer">
              <Icon name="send" size={18} /> Send message
            </button>
          </form>

          <div className="mt-10">
            <h2 className="text-xl font-bold mb-2">
              Frequently asked questions
            </h2>
            <div className="border-t border-EazyEd-border md:border-none">
              {faqs.map((f, i) => (
                <FaqItem
                  key={i}
                  item={f}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="bg-EazyEd-surface border border-EazyEd-border rounded-2xl p-6 h-fit space-y-5">
          <h2 className="text-lg font-bold">Get in touch</h2>
          {[
            { icon: "call", label: "Phone", value: "+1 (555) 010-2345" },
            {
              icon: "mail",
              label: "Support email",
              value: "support@EazyEd.edu",
            },
            {
              icon: "location_on",
              label: "Campus office",
              value: "Block C, Room 214\nMain Campus",
            },
            {
              icon: "schedule",
              label: "Working hours",
              value: "Mon–Fri · 09:00–17:00\nSat · 10:00–14:00",
            },
          ].map((c) => (
            <div key={c.label} className="flex gap-3">
              <span className="w-10 h-10 shrink-0 rounded-xl bg-EazyEd-primary-soft text-EazyEd-primary flex items-center justify-center">
                <Icon name={c.icon} size={20} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-EazyEd-text-muted">
                  {c.label}
                </p>
                <p className="text-sm whitespace-pre-line">{c.value}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>

      <Modal
        open={success}
        onClose={() => setSuccess(false)}
        title="Message sent"
        maxWidth="max-w-md">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-EazyEd-success/15 text-EazyEd-success flex items-center justify-center mb-4">
            <Icon name="check_circle" size={36} />
          </div>
          <p className="text-EazyEd-text mb-1 font-medium">
            Thanks for reaching out!
          </p>
          <p className="text-sm text-EazyEd-text-muted mb-6">
            We've received your message and will reply within 1–2 business days.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-2.5 rounded-lg bg-EazyEd-primary text-white font-medium hover:brightness-110">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
