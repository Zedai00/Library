const myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read, crypto.randomUUID())
  myLibrary.push(book)
}

function displayBooks() {
  let library = document.querySelector(".library")
  library.innerHTML = ""
  myLibrary.forEach(book => {
    let title = document.createElement("div")
    title.innerText = `Title: ${book.title}`
    let author = document.createElement(
      "div")
    author.innerText = `Author: ${book.author}`
    let pages = document.createElement("div")
    pages.innerText = `Pages: ${book.pages}`
    let b = document.createElement("div")
    b.classList.add("book");
    b.appendChild(title)
    b.appendChild(author)
    b.appendChild(pages)
    library.appendChild(b)
  })
}

for (let i = 0; i < 10; i++) {
  addBookToLibrary("abc", "def", 12, true)
}

displayBooks()

const showButton = document.querySelector("#showButton")
const bookDialog = document.querySelector("#bookDialog")
const confirmBtn = bookDialog.querySelector("#confirmBtn")
const bookForm = bookDialog.querySelector("form")
const cancelBtn = bookDialog.querySelector("#cancel")

showButton.addEventListener("click", () => {
  bookDialog.showModal()
})

cancelBtn.addEventListener("click", (e) => {
  e.preventDefault()
  bookDialog.close()
})


bookForm.addEventListener("submit", (e) => {
  e.preventDefault()
  let form = e.currentTarget
  let title = form.title.value
  let author = form.author.value
  let pages = form.pages.value
  let read = form.read.value
  addBookToLibrary(title, author, pages, read)
  displayBooks()
  bookDialog.close()
})
