import React, { useState, useMemo } from "react";
import Header    from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import TagFilter from "./components/TagFilter/TagFilter";
import NoteCard  from "./components/NoteCard/NoteCard";
import NoteModal from "./components/NoteModal/NoteModal";
import EmptyState from "./components/EmptyState/EmptyState";
import { useNotes }      from "./hooks/useNotes";
import { filterNotes, extractAllTags } from "./utils/helpers";

export default function App() {
  const { notes, addNote, updateNote, deleteNote } = useNotes();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag,   setActiveTag]   = useState(null);
  const [modal,       setModal]       = useState(null); // null | { mode: "create"/"edit", note?: {...} }

  // ── Derived state ──────────────────────────────────────────────────────────
  const allTags      = useMemo(() => extractAllTags(notes), [notes]);
  const visibleNotes = useMemo(
    () => filterNotes(notes, searchQuery, activeTag),
    [notes, searchQuery, activeTag]
  );
  const isFiltered   = Boolean(searchQuery || activeTag);

  // ── Modal helpers ──────────────────────────────────────────────────────────
  const openCreate = () => setModal({ mode: "create", note: {} });
  const openEdit   = (note) => setModal({ mode: "edit", note });
  const closeModal = () => setModal(null);

  const handleSave = ({ id, title, description, tags }) => {
    if (id) {
      updateNote({ id, title, description, tags });
    } else {
      addNote({ title, description, tags });
    }
    closeModal();
  };

  return (
    <div className="min-h-screen bg-parchment-50">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <Header noteCount={notes.length} onNewNote={openCreate} />

      {/* ── Main content ────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Controls row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>

        {/* Tag filter row */}
        {allTags.length > 0 && (
          <div className="mb-6">
            <TagFilter tags={allTags} activeTag={activeTag} onSelect={setActiveTag} />
          </div>
        )}

        {/* Results summary */}
        {isFiltered && visibleNotes.length > 0 && (
          <p className="font-body text-xs text-ink-400 mb-5">
            Showing <span className="text-ink-600 font-medium">{visibleNotes.length}</span> of {notes.length} notes
            {searchQuery && <span> for "<span className="italic">{searchQuery}</span>"</span>}
            {activeTag   && <span> tagged <span className="font-medium">#{activeTag}</span></span>}
            <button onClick={() => { setSearchQuery(""); setActiveTag(null); }} className="ml-2 text-ink-400 hover:text-ink-700 underline transition-colors">
              Clear
            </button>
          </p>
        )}

        {/* Notes grid */}
        {visibleNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleNotes.map((note, i) => (
              <div
                key={note.id}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <NoteCard
                  note={note}
                  onEdit={openEdit}
                  onDelete={deleteNote}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState isFiltered={isFiltered} onNewNote={openCreate} />
        )}
      </main>

      {/* ── Note Modal ───────────────────────────────────────────────────── */}
      {modal && (
        <NoteModal
          note={modal.note}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {/* ── Floating Action Button (mobile) ──────────────────────────────── */}
      <button
        onClick={openCreate}
        className="
          sm:hidden fixed bottom-6 right-6 z-40
          w-14 h-14 bg-ink-700 text-parchment-50
          rounded-2xl shadow-lift flex items-center justify-center
          hover:bg-ink-800 active:scale-95 transition-all duration-200
        "
        aria-label="Create new note"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>
  );
}
