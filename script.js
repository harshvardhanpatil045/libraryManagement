
let books = JSON.parse(localStorage.getItem("books")) || [];

const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

// Display books
function displayBooks(bookData = books) {

    bookList.innerHTML = "";

    emptyMessage.style.display =
        bookData.length === 0 ? "block" : "none";

    bookData.forEach((book) => {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.id}</td>
            <td></td>
            <td></td>
            <td>${book.quantity}</td>
            <td>
                <button class="delete-btn"
                    onclick="deleteBook(${book.id})">
                    Delete
                </button>
            </td>
        `;

        row.children[1].textContent = book.title;
        row.children[2].textContent = book.author;

        bookList.appendChild(row);
    });
}

// Add new book
bookForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = document.getElementById("bookTitle").value.trim();
    const author = document.getElementById("bookAuthor").value.trim();
    const quantity = Number(
        document.getElementById("bookQuantity").value
    );

    if (!title || !author || !Number.isInteger(quantity) || quantity < 1) {
        alert("Please enter valid book details.");
        return;
    }

    const newBook = {
        id: Date.now(),
        title: title,
        author: author,
        quantity: quantity
    };

    books.push(newBook);

    saveBooks();

    bookForm.reset();

    displayBooks();
});

// Delete book
function deleteBook(id) {

    books = books.filter(book => book.id !== id);

    saveBooks();

    displayBooks();
}

// Search books
searchInput.addEventListener("input", function() {

    const searchValue = searchInput.value.toLowerCase();

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchValue) ||
        book.author.toLowerCase().includes(searchValue)
    );

    displayBooks(filteredBooks);
});

// Save books in Local Storage
function saveBooks() {

    localStorage.setItem("books", JSON.stringify(books));

}

// Initial display
displayBooks();
