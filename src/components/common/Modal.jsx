import { useEffect } from "react";
import Icon from "./Icon";

export default function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-2xl",
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}>
      <div
        className={`w-full ${maxWidth} bg-EazyEd-surface border border-EazyEd-border rounded-2xl shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-EazyEd-border">
          <h3 className="text-lg font-semibold text-EazyEd-text">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-EazyEd-surface-3 text-EazyEd-text-muted"
            aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="p-5 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
