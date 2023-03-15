/** ACCEPTANCE CRITERIA
 *
 *Imagine you are a librarian and want to develop an inventory management system that keeps track of which books are in the library and which ones have been checked out. Write a program with the following functionality:
The user can print out a list of each book and its status (“on shelf” or “checked out”)
The user can add new books to the inventory. The default status of newly added books will be “on shelf”
The user can toggle the status of each book between “on shelf” and “checked out”
The user should interact with the program using the command line interface. Your solution can be in the language of your choosing. If you have time, think about what other functionality you might add. Try to implement it for an extra challenge!
 *
 */

import readline from "readline";
import chalk from "chalk";
import figlet from "figlet";
import { getAllBooks, getBook, addBook, updateBook, deleteBook } from "./api.js";

// set up functionality to give user prompt and accept user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// welcome message
console.log(chalk.magenta(figlet.textSync('LISA', {
    font: 'Big',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
})));
console.log(chalk.bold(`🧑‍🏫  Library Inventory System Assistant  🧑‍🏫`))

// global variables to access in multiple functions
let inventoryEmpty = false;
let books = [];

// display and process user options
async function openMenu() {
	// query database to get list of all books, make available in other functions
	books = await getAllBooks();
	rl.question(chalk.bold(`\nEnter:
    \n📝 1 to print a list of all books
    \n📔 2 to add a new book to the inventory
    \n❌ 3 to remove a lost or stolen book from the inventory
	\n✅ 4 to check a book in or out
	\n🔎 5 to search for a book by partial title
	\n👋 'quit' to exit program
	\n`), function (response) {

		let userInput = response

		if (userInput === '1' || userInput === '4') {
			choosePrint(userInput);
		}
		else if (userInput === '2' || inventoryEmpty) {
			chooseAdd();
		}
		else if (userInput === '3') {
			chooseRemove();
		}
		else if (userInput === '5') {
			chooseSearch();
		}
		else if (userInput === 'quit') {
			chooseQuit();
		}
		else {
			console.log(chalk.red('Please enter a valid menu option.'));
			openMenu();
		}
	});
};

// call function when program runs
openMenu();

// function to display list of all books in inventory, with option to get details for selected book
function choosePrint(userInput) {
	// only run this block if inventory is not empty
	if (books.length) {
		// display list of all books if user selected 1; otherwise, skip this block
		if (userInput === '1') {
			let numAgreement = "books";
			if (books.length === 1) numAgreement = "book";
			console.log(chalk.blue(`You currently have ${books.length} ${numAgreement} in your inventory:`), books);
		}

		// handle user input of 'menu', valid book title, or invalid book title
		rl.question(chalk.bold("\nTo check a book in or out, enter the title of the book, or enter 'menu' to return to menu:\n"), function (response) {
			let selectedBook;
			if (response === 'menu') openMenu();
			else {
				// find book by title and change availability status
				try {
					selectedBook = books.filter(book => book.title === response);
					selectedBook = selectedBook[0];

					console.log(chalk.blue(`\n${selectedBook.title} by ${selectedBook.author} is currently: `))
					console.log(chalk.bgMagenta(`${selectedBook.availability}\n`));

					rl.question(chalk.bold(`Enter yes to change availability or no to cancel: `), function (response) {
							if (response.toLowerCase() === 'yes') {
							selectedBook['availability'] === "on shelf"
							? selectedBook['availability'] = "checked out"
							: selectedBook['availability'] = "on shelf"

							updateBook(selectedBook);

							console.log(chalk.blue(`\n${selectedBook.title} is now:`));
							console.log(chalk.bgMagenta(`${selectedBook['availability']}`));
						}
						else if (response === 'no') {
							console.log(chalk.green(`Your request has been cancelled.`));
						}
						else {
							console.log(chalk.red(`There was a problem with your response. Please try again.`));
						}
						openMenu();
					});
				}
				// provide feedback and redirect to menu if invalid book title entered
				catch (err) {
					console.log(chalk.red("You do not have that book in your inventory."));
					openMenu();
				}
			}
		});
	}
	// if no books in inventory, set inventoryEmpty to true; this triggers chooseAdd() to run
	else
		inventoryEmpty = true;
		if (inventoryEmpty) {
			console.log(chalk.red("Your inventory is empty! Add a new book now."));
	}
}

// function to add a new book to inventory
function chooseAdd() {
		let newBook = {};

		// create new book object with user input
		rl.question(chalk.bold("Enter title of book\n"), function (response) {
				newBook['title'] = response;

		rl.question(chalk.bold("Enter author of book\n"), function (response) {;
			newBook['author'] = response;

		// check if title already exists in db and if user intends to add duplicate
		for (let book of books) {
			if (book.title === newBook.title) {
				console.log(chalk.red(`Warning! You already have this title in your inventory.\nAdding the same title means you have multiple copies of the same title.\nPlease confirm your choice to proceed.`));
			}
		}

		// if user input valid and response is yes, add book to db; otherwise, provide feedback and redirect to menu
		rl.question(chalk.bold("Enter yes to add this book or no to cancel\n"), function (response) {
			if (response.toLowerCase() === 'yes' && newBook.title.length && newBook.author.length) {
				addBook(newBook);
				console.log(chalk.green(`${newBook.title} by ${newBook.author} has been added to your inventory!`));
				inventoryEmpty = false;
			}
			else if (!newBook.title.length) console.log(chalk.red(`Title is required to add a book. Please try again.`));
			else if (!newBook.author.length) console.log(chalk.red(`Author is required to add a book. Please try again.`));
			else if (response.toLowerCase() === 'no') console.log(chalk.green(`Your request has been cancelled.`))
			else console.log(chalk.red(`There was a problem with your response. Please try again.`));
			openMenu();
		});
		});
		});
}

// function to remove a book from inventory
function chooseRemove() {
	rl.question(chalk.bold(`Enter the id number of the book you want to remove\n`), function (response) {
		// handle empty user input
		if (!response.length) {
			console.log(chalk.red(`Id number is required to remove a book. Please try again.`));
			openMenu();
		}
		else {
			let id = Number(response);
			let selectedBook = '';
			// locate book if present in db; delete from db if user confirms yes; otherwise cancel and redirect to menu
			try {
				selectedBook = books.filter(book => book.id === id);
				rl.question(chalk.bold(`Enter yes to remove book number ${selectedBook[0].id}: (${selectedBook[0].title}) \nor no to cancel\n`), function (response) {
					if (response === 'yes' && response.length) {
						deleteBook(selectedBook[0].id);
						console.log(chalk.green(`Book number ${selectedBook[0].id}: (${selectedBook[0].title}) has been removed from your inventory.`));
					}
					else if (response === 'no') console.log(chalk.green(`Your request has been cancelled.`));
					else console.log(chalk.red(`There was a problem with your response. Please try again.`));
					openMenu();
				});
			}
			// if book not present in db, give feedback and redirect to menu
			catch (err) {
				console.log(chalk.red(`No book ${response} in your inventory.`));
				openMenu();
			}
		}
	});
}

// function to find a book by any part of title
function chooseSearch() {
	rl.question(chalk.bold(`Enter title to search for a book\n`), function (response) {
		let partialTitle = response;
		let foundBook = {};
		// use partialTitle to find books in db with titles containing partialTitle; normalize casing for inclusive results
		// give feedback and return to menu if no matching titles exist in db
		try {
			let matchingBooks = books.filter(book => book.title.toLowerCase().includes(partialTitle.toLowerCase()));

			if (!matchingBooks.length) {
				console.log(chalk.red(`None of our books match your search.`));
				openMenu();
			}
			// display list of matching titles found; prompt user to select a title for details
			else {
				console.log(chalk.green(`These book titles match your search:\n`), matchingBooks.map(matchingBook => matchingBook.title));
				rl.question(chalk.bold(`For book details, enter the complete title of the book you are searching for.\n`), async function (response) {

					// display book details if found; otherwise display feedback; redirect to menu
					let bookTitle = response;
					foundBook = await getBook(bookTitle);
					if (!foundBook) {
						console.log(chalk.red(`Invalid title. Please try searching again.`));
					}
					else {
						console.log(chalk.green(`Here are your book details: \n`));
						console.log(foundBook);
					}
					openMenu();
				});
			}
		}
		// handle any uncaught errors
		catch (err) {
			console.log(chalk.red('There was a problem with your request. Please try again.'));
			openMenu();
		}
	});
}

// function to close program
function chooseQuit() {
	process.exit();
}
