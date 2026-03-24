# ✦ Inkwell

> Your thoughts, beautifully kept.

A modern, minimal **Notes Management Application** built with React + Tailwind CSS.

## Features
- Create, edit, delete notes
- Search & filter notes
- Tag/categorise notes
- LocalStorage persistence
- Fully responsive (mobile + desktop)

## Tech Stack
- ReactJS (functional components + hooks)
- Tailwind CSS
- localStorage
- UUID

## Getting Started
```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Folder Structure
```
src/
├── components/   # Header, NoteCard, NoteModal, SearchBar, TagFilter, EmptyState
├── hooks/        # useNotes (useReducer + localStorage)
├── utils/        # helpers (filter, format, tagColor)
├── App.jsx
└── index.css
```
