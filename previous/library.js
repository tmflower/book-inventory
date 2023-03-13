// For reference


// Imagine you are a librarian and want to develop an inventory management system that keeps track of which books are in the library and which ones have been checked out. Write a program with the following functionality:
// The user can print out a list of each book and its status (“on shelf” or “checked out”)
// The user can add new books to the inventory. The default status of newly added books will be “on shelf”
// The user can toggle the status of each book between “on shelf” and “checked out”
// The user should interact with the program using the command line interface. Your solution can be in the language of your choosing. If you have time, think about what other functionality you might add. Try to implement it for an extra challenge!

// import books from "./books.js";
// import chalk from "chalk";
// import readline from "readline";
// import figlet from "figlet";
// import fs from "fs";
// import { v4 as uuid4 } from "uuid";
// import inquirer from "inquirer";
// import db from "./db.js";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// console.log(chalk.magenta(figlet.textSync('Library Inventory', {
//     font: 'Puffy',
//     horizontalLayout: 'default',
//     verticalLayout: 'default',
//     width: 80,
//     whitespaceBreak: true,
// })));

// let userInput;
// let inventoryEmpty = false;
// let books = [];
// let book = {};

// async function getAllBooks() {
// 	try {
// 		let res = await db.query(`SELECT id, title, author, availability FROM inventory`);
// 		books = res.rows;
// 	}
// 	catch (err) {
// 		console.error(err.message);
// 	}
// };

// rl.question(chalk.bold(`\nEnter:
//     \n📝 1 to print a list of all books
//     \n📔 2 to add a new book to the inventory
//     \n❌ 3 to remove a lost or stolen book from the inventory
// 	\n✅ 4 to check a book in or out
// 	\n🔎 5 to search for a book by partial title
// 	\n`), function (string) {
//     userInput = string

//         if (userInput === '1' || userInput === '4') {
// 			if (books.length) {

// 				if (userInput === '1') {
// 					let numAgreement = "books";
// 					if (books.length === 1) numAgreement = "book";
// 					console.log(chalk.blue(`You currently have ${books.length} ${numAgreement} in your inventory:`), books);
// 				}

// 				rl.question(chalk.bold("\nTo check a book in or out, enter the title of the book:\n"), function (string) {
// 					let selectedBook;
// 					userInput = string;
// 					try {
// 						selectedBook = books.filter(book => book.title === string);
// 						selectedBook = selectedBook[0];

// 						console.log(chalk.blue(`\n${selectedBook.title} by ${selectedBook.author} is currently: `))
// 						console.log(chalk.bgMagenta(`${selectedBook.availability}\n`));

// 						rl.question(chalk.bold(`Enter yes to change availability or no to cancel: `), function (string) {
// 							userInput = string.toLowerCase();
// 							if (userInput === 'no') {
// 								process.exit();
// 							}
// 							else {
// 								selectedBook['availability'] === "on shelf"
// 								? selectedBook['availability'] = "checked out"
// 								: selectedBook['availability'] = "on shelf"

// 								updateBook(selectedBook);

// 								console.log(chalk.blue(`\n${selectedBook.title} is now:`));
// 								console.log(chalk.bgMagenta(`${selectedBook['availability']}`));
// 								process.exit();
// 							}
// 						});
// 					}
// 					catch (err) {
// 						console.log(chalk.red("You do not have that book in your inventory."));
// 						rl.close();
// 					}
// 				});
// 			}

// 			else
// 				inventoryEmpty = true;
// 				if (inventoryEmpty) {
// 					console.log(chalk.red("Your inventory is empty! Add a new book now."));
// 			}
// 		}
//         if (userInput === '2' || inventoryEmpty) {

//             let newBook = {};

//             rl.question(chalk.bold("Enter title of book\n"), function (string) {
//                 newBook['title'] = string;

//             rl.question(chalk.bold("Enter author of book\n"), function (string) {
//                 newBook['author'] = string;

//             rl.question(chalk.bold("Enter yes to add this book or no to cancel\n"), function (string) {
//                 userInput = string.toLowerCase();
//                 if (userInput === "yes") {
// 					addBook(newBook);
//                     console.log(chalk.blue(`${newBook.title} by ${newBook.author} has been added to your inventory!`));
//                     // console.log(chalk.magenta("Here is your updated inventory: ", books));
// 					inventoryEmpty = false;
//                     rl.close();
//                 }
//                 else {
//                     console.log(chalk.blue("Bye for now!"));
//                     rl.close();
//                 }
//             });
//             });
//             });
//         }

// 		if (userInput === '3') {
// 			rl.question(chalk.bold(`Enter the title of the book you want to remove\n`), function (string) {
// 				let bookTitle = string;
// 				let selectedBook = '';
// 				try {
// 					selectedBook = books.filter(book => book.title === bookTitle);
// 					rl.question(chalk.bold(`Enter yes to remove ${selectedBook[0].title} or no to cancel\n`), function (string) {
// 						if (string === 'yes') {
// 							deleteBook(selectedBook[0].title);
// 						}
// 						rl.close();
// 					});
// 				}
// 				catch (err) {
// 					console.log(chalk.red("You do not have that book in your inventory."));
// 					rl.close();
// 				}
// 			});
// 		}

// 		if (userInput === '5') {
// 			rl.question(chalk.bold(`Enter any part of the book title to search\n`), function (string) {
// 				let partialTitle = string;
// 				try {
// 					let matchingBooks = books.filter(book => book.title.toLowerCase().includes(partialTitle.toLowerCase()));
// 					console.log(partialTitle.title);

// 					if (!matchingBooks.length) {
// 						console.log(chalk.red(`None of our books match your search.`));
// 						rl.close();
// 					}
// 					else {
// 						console.log(chalk.magenta(`These are all the books that match your search:\n`), matchingBooks);
// 						rl.question(chalk.bold(`Enter the complete title of the book you are searching for.\n`), function (string) {
// 							let bookTitle = string;
// 							getBook(bookTitle);
// 							console.log(chalk.magenta(`Here are your book details: \n`))
// 						})
// 					}
// 				}
// 				catch (err) {
// 					console.log(err.message);
// 					rl.close();
// 				}
// 			});
// 		}

// 	});




	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// console.log(chalk.magenta(figlet.textSync('Library Inventory', {
//     font: 'Puffy',
//     horizontalLayout: 'default',
//     verticalLayout: 'default',
//     width: 80,
//     whitespaceBreak: true,
// })));

// let userInput = "";
// let inventoryEmpty = false;
// let books = [];

// function getAllBooks() {
// 	fs.readFile("books.json", "utf8", function(err, data) {
// 		if (err) console.error(err.message);
// 		books = JSON.parse(data.toString());
// 		return books;
// 	});
// };
// getAllBooks();

// rl.question(chalk.bold(`\nEnter:
//     \n📝 1 to print a list of all books
//     \n📔 2 to add a new book to the inventory
//     \n❌ 3 to remove a lost or stolen book from the inventory
// 	\n✅ 4 to check a book in or out
// 	\n🔎 5 to search for a book by partial title
// 	\n`), function (string) {
//     userInput = string

//         if (userInput === '1' || userInput === '4') {
// 			if (books.length) {

// 				if (userInput === '1') {
// 					let numAgreement = "books";
// 					if (books.length === 1) numAgreement = "book";
// 					console.log(chalk.blue(`You currently have ${books.length} ${numAgreement} in your inventory:`), books);
// 				}

// 				rl.question(chalk.bold("\nTo check a book in or out, enter the title of the book:\n"), function (string) {
// 					let selectedBook;
// 					userInput = string;
// 					try {
// 						selectedBook = books.filter(book => book.title === string);
// 						selectedBook = selectedBook[0];

// 						console.log(chalk.blue(`\n${selectedBook.title} by ${selectedBook.author} is currently:\n`))
// 						console.log(chalk.bgMagenta(`${selectedBook.availability}`));

// 						rl.question(chalk.bold(`Enter yes to change availability or no to cancel: `), function (string) {
// 							userInput = string.toLowerCase();
// 							if (userInput === 'no') {
// 								rl.close();
// 							}
// 							else {
// 								console.log(chalk.magenta("Your updated inventory: "), books);
// 								selectedBook['availability'] === "on shelf"
// 								? selectedBook['availability'] = "checked out"
// 								: selectedBook['availability'] = "on shelf"
// 								console.log(chalk.blue(`${selectedBook.title} is now:\n`))
// 								console.log(chalk.bgMagenta(`${selectedBook['availability']}`));
// 								updateInventory(books);
// 								rl.close();
// 							}
// 						});
// 					}
// 					catch (err) {
// 						console.log(chalk.red("You do not have that book in your inventory."));
// 						rl.close();
// 					}
// 				});
// 			}

// 			else
// 				inventoryEmpty = true;
// 				if (inventoryEmpty) {
// 					console.log(chalk.red("Your inventory is empty! Add a new book now."));
// 			}
// 		}

//         if (userInput === '2' || inventoryEmpty) {

//             let book = {};

//             rl.question(chalk.bold("Enter title of book\n"), function (string) {
//                 book['title'] = string;

//             rl.question(chalk.bold("Enter author of book\n"), function (string) {
//                 book['author'] = string;
// 				book['ISBN'] = uuid4();
//                 book['availability'] = "on shelf"
//                 console.log(book);

//             rl.question(chalk.bold("Enter yes to add this book or no to cancel\n"), function (string) {
//                 userInput = string.toLowerCase();
//                 if (userInput === "yes") {
//                     books.push(book);
// 					fs.appendFile("books.json", "[]", (err) => {
// 						if (err) {
// 							console.error(err.message);
// 							return;
// 						}
// 						updateInventory(books);
// 					});
//                     console.log(chalk.blue(`${book.title} by ${book.author} is now available!`));
//                     console.log(chalk.magenta("Here is your updated inventory: ", books));
// 					inventoryEmpty = false;
//                     rl.close();
//                 }
//                 else {
//                     console.log(chalk.blue("Bye for now!"));
//                     rl.close();
//                 }
//             });
//             });
//             });
//         }

// 		if (userInput === '3') {
// 			rl.question(chalk.bold(`Enter the title of the book you want to remove\n`), function (string) {
// 				let bookTitle = string;
// 				let selectedBook = '';
// 				try {
// 					selectedBook = books.filter(book => book.title === bookTitle);
// 					rl.question(chalk.bold(`Enter yes to remove ${selectedBook[0].title} or no to cancel\n`), function (string) {
// 						if (string === 'yes') {
// 							books.splice(books.indexOf(selectedBook), 1);
// 							updateInventory(books);
// 						}
// 						rl.close();
// 					});
// 				}
// 				catch (err) {
// 					console.log(chalk.red("You do not have that book in your inventory."));
// 					rl.close();
// 				}
// 			});
// 		}

// 		if (userInput === '5') {
// 			rl.question(chalk.bold(`Enter any part of the book title to search\n`), function (string) {
// 				let partialTitle = string;
// 				try {
// 					let matchingBooks = books.filter(book => book.title.toLowerCase().includes(partialTitle.toLowerCase()));
// 					console.log(partialTitle);

// 					if (!matchingBooks.length) {
// 						console.log(chalk.red(`None of our books match your search.`));
// 						rl.close();
// 					}
// 					else {
// 						console.log(chalk.magenta(`These are all the books that match your search:\n`), matchingBooks);
// 						rl.close();
// 					}
// 				}
// 				catch (err) {
// 					console.log(err.message);
// 					rl.close();
// 				}
// 			});
// 		}
// });


// function updateInventory(books) {
// 	fs.writeFile("books.json", JSON.stringify(books), (err) => {
// 		if (err) {
// 			console.error(err.message);
// 		}
// 		else {
// 			fs.readFile("books.json", "utf8", function(err, data) {
// 				if (err) console.error(err.message);
// 				books = JSON.parse(data.toString());
// 			});
// 			console.log(chalk.magenta("📚 Your inventory has been updated! 📚"));
// 			console.log(books);
// 		}
// 	})
// }

