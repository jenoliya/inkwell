import React from "react";

export default function Header({ noteCount, onNewNote }) {
  return (
    <header className="sticky top-0 z-30 bg-parchment-50/90 backdrop-blur-md border-b border-parchment-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink-700 rounded-lg flex items-center justify-center shadow-sm">
              <InkIcon />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-ink-800 leading-none">
                Inkwell
              </h1>
              <p className="font-mono text-[10px] text-ink-400 mt-0.5">
                {noteCount} {noteCount === 1 ? "note" : "notes"}
              </p>
            </div>
          </div>

          {/* New Note Button */}
          <button onClick={onNewNote} className="btn-primary flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="hidden sm:inline">New Note</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function InkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fdfaf5"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
