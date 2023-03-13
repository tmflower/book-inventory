// Imagine you are a librarian and want to develop an inventory management system that keeps track of which books are in the library and which ones have been checked out. Write a program with the following functionality:
// The user can print out a list of each book and its status (“on shelf” or “checked out”)
// The user can add new books to the inventory. The default status of newly added books will be “on shelf”
// The user can toggle the status of each book between “on shelf” and “checked out”
// The user should interact with the program using the command line interface. Your solution can be in the language of your choosing. If you have time, think about what other functionality you might add. Try to implement it for an extra challenge!

import chalk from "chalk";
import readline from "readline";
import figlet from "figlet";
import { getAllBooks, getBook, addBook, updateBook, deleteBook } from "./api.js";

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

let userInput;
let inventoryEmpty = false;
let books = [];

async function openMenu() {
	books = await getAllBooks();
	rl.question(chalk.bold(`\nEnter:
    \n📝 1 to print a list of all books
    \n📔 2 to add a new book to the inventory
    \n❌ 3 to remove a lost or stolen book from the inventory
	\n✅ 4 to check a book in or out
	\n🔎 5 to search for a book by partial title
	\n👋 'quit' to exit program
	\n`), function (string) {
		let userInput = string
		if (userInput === '1' || userInput === '4') {
			choosePrint(userInput);
		}
		if (userInput === '2' || inventoryEmpty) {
			chooseAdd();
		}
		if (userInput === '3') {
			chooseRemove();
		}
		if (userInput === '5') {
			chooseSearch();
		}
		if (userInput === 'quit') {
			chooseQuit();
		}
	});
};

openMenu();

function choosePrint(userInput) {
	if (books.length) {

		if (userInput === '1') {
			let numAgreement = "books";
			if (books.length === 1) numAgreement = "book";
			console.log(chalk.blue(`You currently have ${books.length} ${numAgreement} in your inventory:`), books);
		}

		rl.question(chalk.bold("\nTo check a book in or out, enter the title of the book, or enter 'menu' to return to menu:\n"), function (string) {
			let selectedBook;
			userInput = string;
			if (userInput === 'menu') openMenu();
			else {
				try {
					selectedBook = books.filter(book => book.title === string);
					selectedBook = selectedBook[0];

					console.log(chalk.blue(`\n${selectedBook.title} by ${selectedBook.author} is currently: `))
					console.log(chalk.bgMagenta(`${selectedBook.availability}\n`));

					rl.question(chalk.bold(`Enter yes to change availability or no to cancel: `), function (string) {
						userInput = string.toLowerCase();
						if (userInput === 'yes') {
							selectedBook['availability'] === "on shelf"
							? selectedBook['availability'] = "checked out"
							: selectedBook['availability'] = "on shelf"

							updateBook(selectedBook);

							console.log(chalk.blue(`\n${selectedBook.title} is now:`));
							console.log(chalk.bgMagenta(`${selectedBook['availability']}`));
						}
						else if (userInput === 'no') {
							console.log(chalk.magenta(`Your request has been cancelled.`));
						}
						else {
							console.log(chalk.red(`There was a problem with your response. Please try again.`));
						}
						openMenu();
					});
				}
				catch (err) {
					console.log(chalk.red("You do not have that book in your inventory."));
					openMenu();
				}
			}
		});
	}

	else
		inventoryEmpty = true;
		if (inventoryEmpty) {
			console.log(chalk.red("Your inventory is empty! Add a new book now."));
	}
}


function chooseAdd() {
		let newBook = {};

		rl.question(chalk.bold("Enter title of book\n"), function (string) {
			newBook['title'] = string;

		rl.question(chalk.bold("Enter author of book\n"), function (string) {
			newBook['author'] = string;

		rl.question(chalk.bold("Enter yes to add this book or no to cancel\n"), function (string) {
			userInput = string.toLowerCase();
			if (userInput === 'yes') {
				addBook(newBook);
				console.log(chalk.blue(`${newBook.title} by ${newBook.author} has been added to your inventory!`));
				inventoryEmpty = false;
			}
			else if (userInput === 'no') {
				console.log(chalk.magenta(`Your request has been cancelled.`));
			}
			else {
				console.log(chalk.red(`There was a problem with your response. Please try again.`));
			}
			openMenu();
		});
		});
		});
}

function chooseRemove() {
	rl.question(chalk.bold(`Enter the title of the book you want to remove\n`), function (string) {
		let bookTitle = string;
		let selectedBook = '';
		try {
			selectedBook = books.filter(book => book.title === bookTitle);
			rl.question(chalk.bold(`Enter yes to remove ${selectedBook[0].title} or no to cancel\n`), function (string) {
				if (string === 'yes') {
					deleteBook(selectedBook[0].title);
					console.log(chalk.magenta(`${selectedBook[0].title} has been removed from your inventory.`));
				}
				else if (string === 'no') {
					console.log(chalk.magenta(`Your request has been cancelled.`));
				}
				else {
					console.log(chalk.red(`There was a problem with your response. Please try again.`));
				}
				openMenu();
			});
		}
		catch (err) {
			console.log(chalk.red("You do not have that book in your inventory."));
			openMenu();
		}
	});
}

function chooseSearch() {
	rl.question(chalk.bold(`Enter title to search for a book\n`), function (string) {
		let partialTitle = string;
		let foundBook = {};
		try {
			let matchingBooks = books.filter(book => book.title.toLowerCase().includes(partialTitle.toLowerCase()));

			if (!matchingBooks.length) {
				console.log(chalk.red(`None of our books match your search.`));
				openMenu();
			}
			else {
				console.log(chalk.magenta(`These book titles match your search:\n`), matchingBooks.map(matchingBook => matchingBook.title));
				rl.question(chalk.bold(`For book details, enter the complete title of the book you are searching for.\n`), async function (string) {
					let bookTitle = string;
					foundBook = await getBook(bookTitle);
					console.log(chalk.magenta(`Here are your book details: \n`));
					console.log(foundBook);
					openMenu();
				});
			}
		}
		catch (err) {
			console.log(err.message);
			openMenu();
		}
	});
}

function chooseQuit() {
	process.exit();
}
