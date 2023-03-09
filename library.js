// Imagine you are a librarian and want to develop an inventory management system that keeps track of which books are in the library and which ones have been checked out. Write a program with the following functionality:
// The user can print out a list of each book and its status (“on shelf” or “checked out”) 
// The user can add new books to the inventory. The default status of newly added books will be “on shelf”
// The user can toggle the status of each book between “on shelf” and “checked out”
// The user should interact with the program using the command line interface. Your solution can be in the language of your choosing. If you have time, think about what other functionality you might add. Try to implement it for an extra challenge!

const books = require("./books")

const readline = require("readline");

// create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userInput = "";

rl.question("Enter `print list` for a list of all the books or `add book` to add a new book to the list\n", function (string) {
    userInput = string.toLowerCase().replace(/[^a-z]/g,'');
    if (userInput === 'addbook') {

        let book = {};

        rl.question("Enter title of book\n", function (string) {
            book['title'] = string;
                    
        rl.question("Enter author of book\n", function (string) {
            book['author'] = string;
            book['availability'] = "on shelf"
            console.log(book);

        rl.question("Enter yes to add this book or no to cancel\n", function (string) {
            userInput = string.toLowerCase();
            if (userInput === "yes") {
                books.push(book);
                console.log(`${book.title} by ${book.author} is now available!`)
            }
            else {               
                console.log("Bye for now!");
                rl.close();
            }
        });
        });
        });
    }

    else {
        console.log(`We currently have these ${books.length} books in our inventory:`, books.map((book) => book.title));
        rl.question("To change the availablility of any book, enter the title of the book:\n", function (string) {
            let selectedBook;
            userInput = string;
            try {
                selectedBook = books.filter(book => book.title === string);
                selectedBook = selectedBook[0];
  
                console.log(`${selectedBook.title} is currently ${selectedBook.availability}`)
                rl.question(`Enter yes to change availability or no to cancel: `, function (string) {
                    selectedBook['availability'] === "on shelf" 
                    ? selectedBook['availability'] = "checked out" 
                    : selectedBook['availability'] = "on shelf"
                    console.log(`This book is now ${selectedBook['availability']}`);
                    console.log("Your updated inventory: ", books);
                    rl.close();
                });
            }
            catch (err) {
                console.log("We do not have that book in our inventory.");
                rl.close();
            }

        });
    }
});