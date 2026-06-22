import { Link } from "react-router-dom";
import Icon from "../common/Icon";

export default function ComingSoon({ title, icon }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-EazyEd-surface-3 text-EazyEd-primary flex items-center justify-center mb-6">
        <Icon name={icon || "construction"} size={40} />
      </div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-EazyEd-text-muted mb-6">
        This section is coming up next. Core navigation, theme toggle, and
        bookmarks already work.
      </p>
      <Link
        to="/"
        className="inline-block px-5 py-2.5 rounded-lg bg-EazyEd-primary text-white font-medium">
        Back home
      </Link>
    </div>
  );
}
