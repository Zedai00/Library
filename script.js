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

    let src = (book.read) ? "./assets/checkbox.svg" : "./assets/cross.svg"
    let img = document.createElement("img")
    img.src = src
    img.classList.add("imgReadBtn")
    img.dataset.id = book.id
    let read = document.createElement("div")
    read.classList.add("read")
    read.dataset.id = book.id
    read.append("Read: ")
    read.append(img)

    let info = document.createElement("div")
    info.classList.add("info")
    info.append(title, author, pages, read)

    let rmdiv = document.createElement("div")
    rmdiv.classList.add("rmdiv")
    let remove = document.createElement("button")
    remove.classList.add("remove")
    remove.dataset.id = book.id
    remove.innerText = "❌"
    rmdiv.append(remove)

    let b = document.createElement("div")
    b.classList.add("book");
    b.append(info, rmdiv)
    library.appendChild(b)
  })
}

for (let i = 0; i < 20; i++) {
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


let library = document.querySelector(".library")
library.addEventListener("click", (e) => {
  console.log(e)
  if (e.target.classList.contains("remove")) {
    let id = e.target.dataset.id
    const index = myLibrary.findIndex(book => book.id === id)
    if (index !== -1) {
      myLibrary.splice(index, 1)
    }
    displayBooks()
  } else if (e.target.classList.contains("read") || e.target.classList.contains("imgReadBtn")) {
    let id = e.target.dataset.id
    const index = myLibrary.findIndex(book => book.id === id)
    if (index !== -1) {
      myLibrary[index].toggleReadStatus()
    }
    displayBooks()
  }
})

Book.prototype.toggleReadStatus = function () {
  this.read ? this.read = false : this.read = true
}


