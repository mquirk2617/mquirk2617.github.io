const params = new URLSearchParams(window.location.search);
const book = params.get("book") || "driftwood-theatre";

const totalPages = 33;

// Build strictly ordered page list
const pages = Array.from({ length: totalPages }, (_, i) => {
  const pageNum = i + 1;
  return `./books/${book}/pages/${pageNum}.jpg`;
});

// Debug: confirm correct order
console.log("Loaded book:", book);
console.log("Pages:", pages);

// Book interface expected by library
const bookObj = {
  numPages: () => pages.length,

  getPage: (pageNum, cb) => {
    const img = new Image();

    img.src = pages[pageNum - 1];

    img.onload = () => cb(img);

    img.onerror = () => {
      console.error("Failed to load page:", pageNum, img.src);
    };
  }
};

// Wait for DOM to ensure container exists
window.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("flipbook");

  if (!container) {
    console.error("Missing #flipbook container");
    return;
  }

  // Init flipbook library
  window.flipbook.init(
    bookObj,
    "flipbook",
    {
      backgroundColor: "#111",
      width: 1200,
      height: 800,
      autoSize: true
    }
  );

});