const LIBRARY = [
  {
    title: "1984",
    author: "George Orwell",
    year: 1949,
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
  },
];
const booksEl = document.querySelector(".books");

function Book() {
  this.id = crypto.randomUUID();
}

function resetBooksDisplay() {
  booksEl.innerHTML = "";
}
function displayBooks() {
  resetBooksDisplay();
  booksEl.innerHTML = LIBRARY.map((book) => `<li>${book.title}</li>`).reduce(
    (acc, current) => acc + current,
  );
}
function addBookToLibrary(book) {
  LIBRARY.push(book);
  displayBooks();
}

displayBooks();
