const params = new URLSearchParams(window.location.search);
const book = params.get("book") || "driftwood-theatre";

// IMPORTANT: GitHub Pages base path (your repo name = /flipbooks)
const BASE_PATH = "/flipbooks/books";

async function init() {

  const res = await fetch(`${BASE_PATH}/${book}/data.json`);
  const data = await res.json();

  const totalPages = data.pages;

  const pages = Array.from({ length: totalPages }, (_, i) => {
    const pageNum = i + 1;
    return `${BASE_PATH}/${book}/pages/${pageNum}.jpg`;
  });

  const bookObj = {
    numPages: () => pages.length,

    getPage: (pageNum, cb) => {
      const img = new Image();
      img.src = pages[pageNum - 1];

      img.onload = () => cb(img);

      img.onerror = () => {
        console.error("Failed to load page:", img.src);
      };
    }
  };

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
}

window.addEventListener("DOMContentLoaded", init);