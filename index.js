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
const newBookCloseEl = newBookDialog.querySelector(".new-book-close");
const formEl = newBookDialog.querySelector("form");

function formatBookToDisplay(book) {
  return `
  <li id="${book.id}" class="book">
    <h3 class="book__title">${book.title}</h3> 
  </li>
  `;
}
function initialDisplay() {
  booksEl.innerHTML = LIBRARY.map((book) => formatBookToDisplay(book)).reduce(
    (acc, current) => acc + current,
  );
}
function addBookToLibrary(book) {
  LIBRARY.push(book);
  booksEl.innerHTML += formatBookToDisplay(book);
}

newBookCloseEl.addEventListener("click", () => newBookDialog.close());

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const title = formData.get("title");
  const author = formData.get("author");
  const year = formData.get("year");

  addBookToLibrary(new Book(title, author, year));

  newBookDialog.close();
});

initialDisplay();
