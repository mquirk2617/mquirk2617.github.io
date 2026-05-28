const params = new URLSearchParams(window.location.search);
const book = params.get("book") || "driftwood-theatre";

// IMPORTANT: correct GitHub Pages base path
const BASE_PATH = "/flipbooks/books";

async function init() {

  const pdfUrl = `${BASE_PATH}/${book}/file.pdf`;

  console.log("Loading PDF:", pdfUrl);

  // Wait for library to be ready
  const container = "flipbook";

  const options = {
    backgroundColor: "#111",
    width: 1200,
    height: 800,
    autoSize: true
  };

  // IMPORTANT:
  // This library expects a PDF.js document internally.
  // So we pass the URL directly as the "book" argument.

  window.flipbook.init(
    {
      pdf: pdfUrl
    },
    container,
    options
  );

}

window.addEventListener("DOMContentLoaded", init);