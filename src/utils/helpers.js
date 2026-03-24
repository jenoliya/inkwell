/**
 * Format an ISO date string into a human-readable label.
 * Returns "Today", "Yesterday", or "Mon DD, YYYY".
 */
export function formatDate(isoString) {
  const date = new Date(isoString);
  const now  = new Date();

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate();

  if (sameDay(date, now)) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (sameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });
}

/**
 * Truncate a string to `maxLength` characters, appending "…" if needed.
 */
export function truncate(str, maxLength = 120) {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength).trimEnd() + "…" : str;
}

/**
 * Filter notes by a search query (matches title, description, or tags).
 */
export function filterNotes(notes, query, activeTag) {
  let filtered = notes;

  if (activeTag) {
    filtered = filtered.filter((n) => n.tags.includes(activeTag));
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return filtered;
}

/**
 * Extract all unique tags from a list of notes.
 */
export function extractAllTags(notes) {
  const tagSet = new Set();
  notes.forEach((n) => n.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

/**
 * Assign a deterministic colour class to a tag based on its content.
 */
export function tagColor(tag) {
  const palette = [
    { bg: "bg-amber-100",   text: "text-amber-800",   border: "border-amber-200" },
    { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" },
    { bg: "bg-sky-100",     text: "text-sky-800",     border: "border-sky-200" },
    { bg: "bg-rose-100",    text: "text-rose-800",    border: "border-rose-200" },
    { bg: "bg-violet-100",  text: "text-violet-800",  border: "border-violet-200" },
    { bg: "bg-orange-100",  text: "text-orange-800",  border: "border-orange-200" },
    { bg: "bg-teal-100",    text: "text-teal-800",    border: "border-teal-200" },
    { bg: "bg-pink-100",    text: "text-pink-800",    border: "border-pink-200" },
  ];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}
