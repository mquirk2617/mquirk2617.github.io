const params = new URLSearchParams(window.location.search);
const book = params.get("book") || "driftwood-theatre";

const BASE_PATH = "/flipbooks/books";

async function init() {

  const res = await fetch(`${BASE_PATH}/${book}/data.json`);
  const data = await res.json();

  const totalPages = data.pages;

  const pages = Array.from({ length: totalPages }, (_, i) =>
    `${BASE_PATH}/${book}/pages/${i + 1}.jpg`
  );

  // THIS is what the library actually expects
  const bookObj = {
    numPages: () => pages.length,

    getPage: (n, cb) => {
      const img = new Image();
      img.src = pages[n - 1];

      img.onload = () => cb(img);

      img.onerror = () => {
        console.error("Failed page:", img.src);
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