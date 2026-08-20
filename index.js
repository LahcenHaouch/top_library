function Book(title, author, year) {
  if (!new.target) {
    throw new Error("Constructor function must be called with new.");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.year = year;
}

const LIBRARY = [
  new Book("1984", "George Orwell", 1949),
  new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925),
  new Book("To Kill a Mockingbird", "Harper Lee", 1960),
  new Book("The Hobbit", "J.R.R. Tolkien", 1937),
  new Book("Brave New World", "Aldous Huxley", 1932),
];
const booksEl = document.querySelector(".books");
const newBookDialog = document.querySelector("#new-book");

function resetBooksDisplay() {
  booksEl.innerHTML = "";
}
function displayBooks() {
  resetBooksDisplay();
  booksEl.innerHTML = LIBRARY.map(
    (book) => `<li id="${book.id}">${book.title}</li>`,
  ).reduce((acc, current) => acc + current);
}
function addBookToLibrary(book) {
  LIBRARY.push(book);
  displayBooks();
}

displayBooks();
