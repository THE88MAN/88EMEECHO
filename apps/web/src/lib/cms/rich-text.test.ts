import { escapeHtml, formatArticleParagraph } from "./rich-text";

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

assert(escapeHtml("<script>") === "&lt;script&gt;", "escape script");
assert(
  formatArticleParagraph('Hello <img src=x onerror=alert(1)> **bold**').includes(
    "&lt;img",
  ),
  "escape tags",
);
assert(
  formatArticleParagraph("a **b** c").includes("<strong>b</strong>"),
  "bold ok",
);
assert(
  !formatArticleParagraph("<script>x</script>").includes("<script>"),
  "no raw script",
);

console.log("rich-text.test.ts: OK");
