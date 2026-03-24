import React from "react";

export default function EmptyState({ isFiltered, onNewNote }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
      {/* Floating ink icon */}
      <div className="w-20 h-20 bg-parchment-100 rounded-2xl flex items-center justify-center mb-6 animate-float shadow-paper">
        {isFiltered ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-ink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
        )}
      </div>

      <h3 className="font-display font-semibold text-xl text-ink-700 mb-2">
        {isFiltered ? "Nothing found" : "Your canvas is blank"}
      </h3>

      <p className="font-body text-ink-400 text-sm max-w-xs mb-8 leading-relaxed">
        {isFiltered
          ? "No notes match your current search or filter. Try a different query."
          : "Every great idea starts with a single note. Write yours now."}
      </p>

      {!isFiltered && (
        <button onClick={onNewNote} className="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Write your first note
        </button>
      )}
    </div>
  );
}
