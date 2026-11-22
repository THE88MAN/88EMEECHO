/** Rendu texte article sûr : échappe HTML, puis gras / sauts de ligne. */

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Convertit un paragraphe markdown-lite (**gras**) en HTML sûr. */
export function formatArticleParagraph(raw: string): string {
  const escaped = escapeHtml(raw);
  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
}
