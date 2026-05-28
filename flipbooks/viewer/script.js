const params = new URLSearchParams(window.location.search);

const book = params.get("book") || "catalog";

// Change this to match your actual page count
const totalPages = 33;

// Generate image paths automatically
const pages = [];

for (let i = 1; i <= totalPages; i++) {
  pages.push(`../books/${book}/pages/${i}.jpg`);
}

// Create page provider object for flipbook-viewer
const bookObj = {

  numPages: () => pages.length,

  getPage: (pageNum, cb) => {

    const img = new Image();

    img.src = pages[pageNum - 1];

    img.onload = () => cb(img);

    img.onerror = () => {
      console.error(`Failed to load page ${pageNum}`);
    };
  }
};

// Initialize viewer
flipbook(
  bookObj,
  "flipbook",
  {
    backgroundColor: "#111",

    // Viewer dimensions
    width: 1200,
    height: 800,

    // Optional tweaks
    autoSize: true,
    swipeVelocity: 1,
    singlePage: false
  },

  (err, viewer) => {

    if (err) {
      console.error("Flipbook init error:", err);
      return;
    }

    console.log("Flipbook loaded");

  }
);