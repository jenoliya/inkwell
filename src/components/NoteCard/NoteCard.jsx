import React, { useState } from "react";
import { formatDate, tagColor } from "../../utils/helpers";

export default function NoteCard({ note, onEdit, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (showConfirm) {
      onDelete(note.id);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 2500);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(note);
  };

  const isEdited =
    note.updatedAt &&
    note.createdAt &&
    note.updatedAt !== note.createdAt;

  return (
    <article
      onClick={() => onEdit(note)}
      className="
        group relative paper-texture bg-white rounded-2xl p-5
        shadow-paper hover:shadow-paper-hover
        border border-parchment-100 hover:border-parchment-200
        cursor-pointer transition-all duration-300 ease-out
        hover:-translate-y-1 animate-fade-in
        flex flex-col gap-3 overflow-hidden
      "
    >
      {/* Decorative top stripe — unique per note by tag */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl ${
          note.tags.length > 0 ? tagColor(note.tags[0]).bg.replace("bg-", "bg-") : "bg-parchment-200"
        }`}
        style={{ opacity: 0.8 }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 relative z-10">
        <h3 className="font-display font-semibold text-ink-800 text-base leading-snug line-clamp-2 flex-1 group-hover:text-ink-700 transition-colors">
          {note.title || "Untitled"}
        </h3>

        {/* Action buttons — appear on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 mt-0.5">
          <button
            onClick={handleEdit}
            title="Edit note"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-ink-400 hover:text-ink-700 hover:bg-parchment-100 transition-all"
          >
            <EditIcon />
          </button>
          <button
            onClick={handleDelete}
            title={showConfirm ? "Click again to confirm" : "Delete note"}
            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
              showConfirm
                ? "text-red-600 bg-red-50 scale-110"
                : "text-ink-400 hover:text-red-500 hover:bg-red-50"
            }`}
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Description preview */}
      {note.description && (
        <p className="font-body text-ink-500 text-sm leading-relaxed line-clamp-3 relative z-10">
          {note.description}
        </p>
      )}

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {note.tags.map((tag) => {
            const c = tagColor(tag);
            return (
              <span
                key={tag}
                className={`tag-chip border ${c.bg} ${c.text} ${c.border}`}
              >
                #{tag}
              </span>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-parchment-100 relative z-10">
        <span className="font-mono text-[10px] text-ink-300">
          {formatDate(note.createdAt)}
        </span>
        {isEdited && (
          <span className="font-mono text-[10px] text-ink-300 italic">
            edited {formatDate(note.updatedAt)}
          </span>
        )}
      </div>

      {/* Confirm overlay hint */}
      {showConfirm && (
        <div className="absolute bottom-12 right-3 bg-red-600 text-white text-[10px] font-body px-2 py-1 rounded-lg shadow-lg animate-scale-in z-20">
          Click again to delete
        </div>
      )}
    </article>
  );
}

function EditIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
