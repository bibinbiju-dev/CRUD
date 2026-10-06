let books = JSON.parse(localStorage.getItem("books")) || [];

let editing = 0;

const bookForm = document.getElementById("bookform");
const bookName = document.getElementById("bookname");
const author = document.getElementById("author");
const category = document.getElementById("category");
const bookList = document.getElementById("booklist");

function displayBooks() {
  bookList.innerHTML = "";

  books.forEach((book) => {
    bookList.innerHTML += `
      <tr>
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td>${book.category}</td>

        <td>
          <button
            class="btn btn-warning btn-sm"
            onclick="editBook(${book.id})"
          >
            Edit
          </button>

          <button
            class="btn btn-danger btn-sm"
            onclick="deleteBook(${book.id})"
          >
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = bookName.value;
  const authorValue = author.value;
  const categoryValue = category.value;

  if (editing !== 0) {
    const book = books.find((book) => book.id === editing);

    book.name = name;
    book.author = authorValue;
    book.category = categoryValue;

    editing = 0;
  } else {
    const newBook = {
      id: bookList.length + 1,
      name: name,
      author: authorValue,
      category: categoryValue,
    };

    books.push(newBook);
  }

  saveBooks();

  displayBooks();

  bookForm.reset();
});

function deleteBook(id) {
  books = books.filter((book) => book.id !== id);

  saveBooks();

  displayBooks();
}

// edit book details
function editBook(id) {
  const book = books.find((book) => book.id === id);

  bookName.value = book.name;
  author.value = book.author;
  category.value = book.category;

  editing = id;
}

// saving to localstorage
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

displayBooks();
