import React, { useState, useEffect, useRef } from "react";
import { tagColor } from "../../utils/helpers";

const MAX_TITLE = 80;
const MAX_DESC  = 2000;

export default function NoteModal({ note, onSave, onClose }) {
  const isEdit = Boolean(note?.id);

  const [title,       setTitle]       = useState(note?.title       ?? "");
  const [description, setDescription] = useState(note?.description ?? "");
  const [tagInput,    setTagInput]    = useState("");
  const [tags,        setTags]        = useState(note?.tags        ?? []);
  const [errors,      setErrors]      = useState({});
  const [saving,      setSaving]      = useState(false);

  const titleRef   = useRef(null);
  const overlayRef = useRef(null);

  // Focus title on open
  useEffect(() => {
    setTimeout(() => titleRef.current?.focus(), 100);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // ── Validation ──────────────────────────────────────────────────────────────
  function validate() {
    const e = {};
    if (!title.trim())                     e.title = "Title is required.";
    if (title.trim().length > MAX_TITLE)   e.title = `Max ${MAX_TITLE} characters.`;
    if (!description.trim())               e.description = "Description is required.";
    if (description.trim().length > MAX_DESC) e.description = `Max ${MAX_DESC} characters.`;
    return e;
  }

  // ── Tag helpers ─────────────────────────────────────────────────────────────
  function addTag(raw) {
    const tag = raw.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
    setTagInput("");
  }

  function removeTag(t) {
    setTags(tags.filter((x) => x !== t));
  }

  function handleTagKeyDown(e) {
    if (["Enter", ",", " ", "Tab"].includes(e.key)) {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    setTimeout(() => {
      onSave({ id: note?.id, title, description, tags });
      onClose();
    }, 150);
  }

  // ── Click backdrop to close ──────────────────────────────────────────────────
  function handleBackdropClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-ink-900/40 animate-fade-in"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lift animate-slide-up overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-parchment-100">
          <h2 className="font-display font-semibold text-xl text-ink-800">
            {isEdit ? "Edit note" : "New note"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-ink-400 hover:text-ink-700 hover:bg-parchment-100 transition-all"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">

            {/* Title */}
            <div>
              <label className="block font-body text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wide">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                ref={titleRef}
                type="text"
                value={title}
                onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: "" })); }}
                placeholder="Give your note a title…"
                maxLength={MAX_TITLE + 10}
                className={`input-field ${errors.title ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
              />
              <div className="flex justify-between mt-1">
                {errors.title ? (
                  <p className="text-xs text-red-500 font-body">{errors.title}</p>
                ) : <span />}
                <span className={`text-[10px] font-mono ${title.length > MAX_TITLE ? "text-red-400" : "text-ink-300"}`}>
                  {title.length}/{MAX_TITLE}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-body text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wide">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => { setDescription(e.target.value); setErrors((p) => ({ ...p, description: "" })); }}
                placeholder="Write your thoughts here…"
                rows={5}
                maxLength={MAX_DESC + 50}
                className={`input-field resize-none ${errors.description ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
              />
              <div className="flex justify-between mt-1">
                {errors.description ? (
                  <p className="text-xs text-red-500 font-body">{errors.description}</p>
                ) : <span />}
                <span className={`text-[10px] font-mono ${description.length > MAX_DESC ? "text-red-400" : "text-ink-300"}`}>
                  {description.length}/{MAX_DESC}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block font-body text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wide">
                Tags <span className="text-ink-300 normal-case font-normal">(up to 5)</span>
              </label>

              {/* Tag chips inside input box */}
              <div className={`input-field flex flex-wrap gap-1.5 min-h-[44px] cursor-text ${tags.length >= 5 ? "opacity-70" : ""}`}
                onClick={() => document.getElementById("tag-input")?.focus()}>
                {tags.map((t) => {
                  const c = tagColor(t);
                  return (
                    <span key={t} className={`tag-chip border ${c.bg} ${c.text} ${c.border} py-0.5`}>
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeTag(t)}
                        className="ml-1 hover:opacity-60"
                        aria-label={`Remove ${t}`}
                      >×</button>
                    </span>
                  );
                })}
                {tags.length < 5 && (
                  <input
                    id="tag-input"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={() => tagInput && addTag(tagInput)}
                    placeholder={tags.length === 0 ? "Type a tag and press Enter…" : "Add another…"}
                    className="border-none outline-none bg-transparent text-sm text-ink-700 placeholder-ink-300 flex-1 min-w-[120px] p-0"
                  />
                )}
              </div>
              <p className="text-[10px] font-body text-ink-300 mt-1">
                Separate tags with Enter, comma, or space.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-5 flex items-center justify-end gap-3 border-t border-parchment-100 pt-4">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2 min-w-[100px] justify-center"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <SpinnerIcon />
                  Saving…
                </span>
              ) : (
                isEdit ? "Save changes" : "Create note"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
  );
}
