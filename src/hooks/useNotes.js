import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "inkwell_notes";

// ─── Action Types ──────────────────────────────────────────────────────────────
const ADD_NOTE    = "ADD_NOTE";
const UPDATE_NOTE = "UPDATE_NOTE";
const DELETE_NOTE = "DELETE_NOTE";
const SET_NOTES   = "SET_NOTES";

// ─── Reducer ──────────────────────────────────────────────────────────────────
function notesReducer(state, action) {
  switch (action.type) {
    case SET_NOTES:
      return action.payload;

    case ADD_NOTE:
      return [action.payload, ...state];

    case UPDATE_NOTE:
      return state.map((note) =>
        note.id === action.payload.id ? { ...note, ...action.payload } : note
      );

    case DELETE_NOTE:
      return state.filter((note) => note.id !== action.payload);

    default:
      return state;
  }
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useNotes() {
  const [notes, dispatch] = useReducer(notesReducer, [], () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : getDefaultNotes();
    } catch {
      return getDefaultNotes();
    }
  });

  // Sync to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (err) {
      console.warn("Could not save notes to localStorage:", err);
    }
  }, [notes]);

  const addNote = ({ title, description, tags }) => {
    const note = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      tags: tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: ADD_NOTE, payload: note });
    return note;
  };

  const updateNote = ({ id, title, description, tags }) => {
    dispatch({
      type: UPDATE_NOTE,
      payload: {
        id,
        title: title.trim(),
        description: description.trim(),
        tags: tags || [],
        updatedAt: new Date().toISOString(),
      },
    });
  };

  const deleteNote = (id) => {
    dispatch({ type: DELETE_NOTE, payload: id });
  };

  return { notes, addNote, updateNote, deleteNote };
}

// ─── Default Seed Data ─────────────────────────────────────────────────────────
function getDefaultNotes() {
  const now = new Date();
  const daysAgo = (d) => new Date(now - d * 86400000).toISOString();

  return [
    {
      id: uuidv4(),
      title: "Welcome to Inkwell ✦",
      description:
        "This is your personal notes sanctuary. Create, edit, search, and organise your thoughts beautifully. Use tags to categorise notes and the search bar to find anything instantly.",
      tags: ["getting-started"],
      createdAt: daysAgo(0),
      updatedAt: daysAgo(0),
    },
    {
      id: uuidv4(),
      title: "Ideas for the weekend",
      description:
        "Visit the farmer's market early. Pick up fresh herbs — basil, rosemary, thyme. Try making that sourdough recipe. Call Mom. Finish reading 'The Remains of the Day'.",
      tags: ["personal", "ideas"],
      createdAt: daysAgo(2),
      updatedAt: daysAgo(1),
    },
    {
      id: uuidv4(),
      title: "Project: Redesign Homepage",
      description:
        "New hero section — full bleed image with overlaid headline. Update nav to sticky with blur backdrop. Add social proof section with customer logos. Review CTA copy with the team before shipping.",
      tags: ["work", "design"],
      createdAt: daysAgo(5),
      updatedAt: daysAgo(3),
    },
    {
      id: uuidv4(),
      title: "Book notes — Atomic Habits",
      description:
        "The 1% rule: tiny changes compound dramatically. Identity-based habits vs outcome-based habits. The habit loop: Cue → Craving → Response → Reward. Make good habits obvious, attractive, easy, satisfying.",
      tags: ["books", "learning"],
      createdAt: daysAgo(10),
      updatedAt: daysAgo(10),
    },
    {
      id: uuidv4(),
      title: "Morning routine draft",
      description:
        "5:45 AM wake up. No phone for first 30 mins. 10 min journaling. 20 min walk or light yoga. Cold shower. Coffee, then deep work block until 9 AM. Review this after 2 weeks.",
      tags: ["personal", "health"],
      createdAt: daysAgo(7),
      updatedAt: daysAgo(4),
    },
  ];
}
