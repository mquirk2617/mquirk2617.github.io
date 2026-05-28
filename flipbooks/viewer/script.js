const params = new URLSearchParams(window.location.search);
const book = params.get("book") || "driftwood-theatre";

const BASE_PATH = "/flipbooks/books";

async function load() {

  const res = await fetch(`${BASE_PATH}/${book}/data.json`);
  const data = await res.json();

  const pages = Array.from({ length: data.pages }, (_, i) =>
    `${BASE_PATH}/${book}/pages/${i + 1}.jpg`
  );

  const bookObj = {
    numPages: () => pages.length,

    getPage: (n, cb) => {
      if (n === 0 || n > pages.length) return cb(null, null);
      const img = new Image();
      img.src = pages[n - 1];
      img.onload = () => cb(null, img);
    }
  };

  const opts = {
    backgroundColor: "#111",
    width: 1200,
    height: 800
  };

  window.flipbook.init(bookObj, "flipbook", opts, (err, viewer) => {

    if (err) {
      console.error("Flipbook error:", err);
      return;
    }

    console.log("Viewer loaded:", viewer);

    viewer.on("seen", n => {
      console.log("Page seen:", n);
    });

  });
}

window.addEventListener("DOMContentLoaded", load);