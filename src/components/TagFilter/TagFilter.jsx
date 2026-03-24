import React from "react";
import { tagColor } from "../../utils/helpers";

export default function TagFilter({ tags, activeTag, onSelect }) {
  if (tags.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="font-body text-xs font-medium text-ink-400 shrink-0">
        Filter:
      </span>

      {/* "All" pill */}
      <button
        onClick={() => onSelect(null)}
        className={`tag-chip border ${
          !activeTag
            ? "bg-ink-700 text-parchment-50 border-ink-700"
            : "bg-transparent text-ink-500 border-parchment-200 hover:border-ink-300 hover:text-ink-700"
        }`}
      >
        All
      </button>

      {tags.map((tag) => {
        const c = tagColor(tag);
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onSelect(isActive ? null : tag)}
            className={`tag-chip border ${
              isActive
                ? `${c.bg} ${c.text} ${c.border} ring-2 ring-offset-1 ring-current opacity-100`
                : `bg-transparent text-ink-400 border-parchment-200 hover:${c.bg} hover:${c.text} hover:${c.border}`
            }`}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}
