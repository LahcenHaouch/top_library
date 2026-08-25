function Book(title, author, year) {
  if (!new.target) {
    throw new Error("Constructor function must be called with new.");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.year = year;
}

let LIBRARY = [
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
const searchEl = document.querySelector("#search");

function formatBookToDisplay(book) {
  return `
  <li data-id="${book.id}" class="book">
    <div>
      <button data-id="${book.id}">Remove</button>
    </div>
    <h3 class="book__title">${book.title} [${book.year}]</h3> 
  </li>
  `;
}
function displayBooks(library) {
  if (!library.length) {
    booksEl.innerHTML = '<li class="message"><p>404 not found</p></li>';
    return;
  }

  booksEl.innerHTML = library
    .map((book) => formatBookToDisplay(book))
    .reduce((acc, current) => acc + current);
}
function initialDisplay() {
  displayBooks(LIBRARY);
}
function addBookToLibrary(book) {
  LIBRARY.push(book);
  booksEl.innerHTML += formatBookToDisplay(book);
}
function removeBookFromLibrary(bookId) {
  const bookToRemove = document.querySelector(`li[data-id='${bookId}']`);
  if (!bookToRemove) {
    return;
  }
  try {
    bookToRemove.remove();
    LIBRARY = LIBRARY.filter(({ id }) => id !== bookId);

    if (!LIBRARY.length) {
      booksEl.innerHTML =
        '<li class="message"><p>Click on "New book" to add your first book to the library</p></li>';
    }
  } catch (error) {
    console.error(error);
  }
}

newBookCloseEl.addEventListener("click", () => newBookDialog.close());

searchEl.addEventListener("input", (event) => {
  const { value } = event.target;
  const filteredLibrary = LIBRARY.filter(
    ({ title, year }) =>
      title.toLowerCase().includes(value.toLowerCase()) ||
      year.toString().includes(value),
  );
  displayBooks(filteredLibrary);
});
booksEl.addEventListener("click", (event) => {
  const { target } = event;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  removeBookFromLibrary(target.dataset.id);
});
formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const title = formData.get("title");
  const author = formData.get("author");
  const year = formData.get("year");

  addBookToLibrary(new Book(title, author, year));

  formEl.reset();

  newBookDialog.close();
});

initialDisplay();
