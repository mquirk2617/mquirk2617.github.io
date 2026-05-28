console.log("SCRIPT LOADED");
const params = new URLSearchParams(window.location.search);
const book = params.get("book") || "catalog";

const totalPages = 33;

const pages = [];

for (let i = 1; i <= totalPages; i++) {
  pages.push(`../books/${book}/pages/${i}.jpg`);
}

// Build book interface expected by library
const bookObj = {

  numPages: () => pages.length,

  getPage: (pageNum, cb) => {

    const img = new Image();
    img.src = pages[pageNum - 1];

    img.onload = () => cb(img);

    img.onerror = () => {
      console.error("Failed loading page", pageNum);
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