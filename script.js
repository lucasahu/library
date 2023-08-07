let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function toggleRead(index) {
    myLibrary[index].toggleRead();
    render();
}

function render() {
    let libraryEl = document.querySelector("#library");
    libraryEl.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        let bookEl = document.createElement("div");
        bookEl.classList = "book-row"
        bookEl.innerHTML =`
            <p>${book.title}</p>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <button class="toggle-read-btn ${book.read ? "btn btn-outline-success" : "btn btn-outline-danger"}" onclick="toggleRead(${i})">${book.read ? "Read" : "Not Read"}</button>
            <button class="remove-btn btn btn-outline-danger" onclick="removeBook(${i})">Remove</button>`;
        libraryEl.appendChild(bookEl);
    }
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    render();
    hideModal();
};

function hideModal() {
    let modal = document.querySelector(".modal");
    let background = document.querySelector(".background");
    let newBookForm = document.querySelector("#new-book-form");
    background.style.visibility = "hidden";
    background.style.backgroundColor = "transparent";
    modal.style.visibility = "hidden";
    modal.style.backgroundColor = "transparent";
    newBookForm.style.display = "none";
}

function renderModal() {
    let modal = document.querySelector(".modal");
    let background = document.querySelector(".background");
    let newBookForm = document.querySelector("#new-book-form");
    background.style.visibility = "visible";
    background.style.backgroundColor = "rgba(0, 0, 0, 0.534)";
    modal.style.visibility = "visible";
    modal.style.backgroundColor = "white";
    newBookForm.style.display = "block";  
}

let newBookbtn = document.querySelector("#new-book-btn");
newBookbtn.addEventListener("click", () => renderModal());

document.querySelector(".add-book-btn").addEventListener("click", function(event) {
    event.preventDefault();
    addBookToLibrary();
})

document.querySelector(".back-btn").addEventListener("click", function(event) {
    event.preventDefault();
    hideModal();
})