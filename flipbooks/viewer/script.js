const params = new URLSearchParams(window.location.search);
const book = params.get("book") || "driftwood-theatre";

// IMPORTANT: GitHub Pages base path
const BASE_PATH = "/flipbooks/books";

async function loadBook() {

  const jsonUrl = `${BASE_PATH}/${book}/data.json`;

  console.log("Loading book config:", jsonUrl);

  let data;

  try {
    const res = await fetch(jsonUrl);
    data = await res.json();
  } catch (err) {
    console.error("Failed to load data.json:", err);
    return;
  }

  let pages = [];

  // CASE 1: explicit filenames in JSON
  if (Array.isArray(data.pages)) {

    pages = data.pages.map(p =>
      `${BASE_PATH}/${book}/pages/${p}`
    );

  }

  // CASE 2: just page count
  else if (typeof data.pages === "number") {

    pages = Array.from({ length: data.pages }, (_, i) =>
      `${BASE_PATH}/${book}/pages/${i + 1}.jpg`
    );

  } else {
    console.error("Invalid data.json format");
    return;
  }

  console.log("Pages loaded:", pages);

  const bookObj = {
    numPages: () => pages.length,

    getPage: (pageNum, cb) => {

      const img = new Image();
      img.src = pages[pageNum - 1];

      img.onload = () => cb(img);

      img.onerror = () => {
        console.error("Failed to load:", img.src);
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

window.addEventListener("DOMContentLoaded", loadBook);