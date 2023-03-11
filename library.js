// Imagine you are a librarian and want to develop an inventory management system that keeps track of which books are in the library and which ones have been checked out. Write a program with the following functionality:
// The user can print out a list of each book and its status (“on shelf” or “checked out”)
// The user can add new books to the inventory. The default status of newly added books will be “on shelf”
// The user can toggle the status of each book between “on shelf” and “checked out”
// The user should interact with the program using the command line interface. Your solution can be in the language of your choosing. If you have time, think about what other functionality you might add. Try to implement it for an extra challenge!

// import books from "./books.js";
import chalk from "chalk";
import readline from "readline";
import figlet from "figlet";
import fs from "fs";
import { v4 as uuid4 } from "uuid";

// create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(chalk.magenta(figlet.textSync('Library Inventory', {
    font: 'Puffy',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
})));

let userInput = "";
let inventoryEmpty = false;
let books = [];

function getAllBooks() {
	fs.readFile("books.json", "utf8", function(err, data) {
		if (err) console.error(err.message);
		books = JSON.parse(data.toString());
		return books;
	});
}

getAllBooks();

rl.question(`\nEnter:
    \n📝 1 to print a list of all books
    \n📔 2 to add a new book to the inventory
    \n❌ 3 to remove a lost or stolen book from the inventory
	\n✅ 4 to check a book in or out
	\n🔎 5 to search for a book by partial title\n`, function (string) {
    userInput = string

        if (userInput === '1' || userInput === '4') {
			if (books.length) {

				if (userInput === '1') {
					let numAgreement = "books";
					if (books.length === 1) numAgreement = "book";
					console.log(chalk.blue(`We currently have ${books.length} ${numAgreement} in our inventory:`), books);
				}

				rl.question("\nTo check a book in or out, enter the title of the book:\n", function (string) {
					let selectedBook;
					userInput = string;
					try {
						selectedBook = books.filter(book => book.title === string);
						selectedBook = selectedBook[0];

						console.log(chalk.blue(`\n${selectedBook.title} by ${selectedBook.author} is currently:\n`))
						console.log(chalk.bgMagenta(`${selectedBook.availability}`));

						rl.question(`Enter yes to change availability or no to cancel: `, function (string) {
							userInput = string.toLowerCase();
							if (userInput === 'no') {
								rl.close();
							}
							else {
								console.log(chalk.magenta("Your updated inventory: "), books);
								selectedBook['availability'] === "on shelf"
								? selectedBook['availability'] = "checked out"
								: selectedBook['availability'] = "on shelf"
								console.log(chalk.blue(`${selectedBook.title} is now:\n`))
								console.log(chalk.bgMagenta(`${selectedBook['availability']}`));
								updateInventory(books);
								rl.close();
							}
						});
					}
					catch (err) {
						console.log(chalk.red("We do not have that book in our inventory."));
						rl.close();
					}
				});
			}
			else inventoryEmpty = true;
			if (inventoryEmpty) {
				console.log(chalk.red("Your inventory is empty! Add a new book now."));
			}
		}

        if (userInput === '2' || inventoryEmpty) {

            let book = {};

            rl.question("Enter title of book\n", function (string) {
                book['title'] = string;

            rl.question("Enter author of book\n", function (string) {
                book['author'] = string;
				book['ISBN'] = uuid4();
                book['availability'] = "on shelf"
                console.log(book);

            rl.question("Enter yes to add this book or no to cancel\n", function (string) {
                userInput = string.toLowerCase();
                if (userInput === "yes") {
                    books.push(book);
					fs.appendFile("books.json", "[]", (err) => {
						if (err) {
							console.error(err.message);
							return;
						}
						updateInventory(books);
					});
                    console.log(`${book.title} by ${book.author} is now available!`);
                    console.log("Here is your updated inventory: ", books);
					inventoryEmpty = false;
                    rl.close();
                }
                else {
                    console.log(chalk.blue("Bye for now!"));
                    rl.close();
                }
            });
            });
            });
        }

		if (userInput === '3') {
			rl.question(`Enter the title of the book you want to remove\n`, function (string) {
				let bookTitle = string;
				try {
					let book = books.filter(book => book.title === bookTitle);
					rl.question(`Enter yes to remove ${book.title} or no to cancel.`, function (string) {
						if (string === 'yes') {
							books.splice(books.indexOf(book), 1);
							updateInventory(books);
						}
						rl.close();
					})
				}
				catch (err) {
					console.log(chalk.red("We do not have that book in our inventory."));
					rl.close();
				}
			})
		}
});


function updateInventory(books) {
	fs.writeFile("books.json", JSON.stringify(books), (err) => {
		if (err) {
			console.error(err.message);
		}
		else {
			fs.readFile("books.json", "utf8", function(err, data) {
				if (err) console.error(err.message);
				books = JSON.parse(data.toString());
			});
			console.log(chalk.magenta("📚 Your inventory has been updated! 📚"));
			console.log(books);
		}
	})
}
