// Imagine you are a librarian and want to develop an inventory management system that keeps track of which books are in the library and which ones have been checked out. Write a program with the following functionality:
// The user can print out a list of each book and its status (“on shelf” or “checked out”)
// The user can add new books to the inventory. The default status of newly added books will be “on shelf”
// The user can toggle the status of each book between “on shelf” and “checked out”
// The user should interact with the program using the command line interface. Your solution can be in the language of your choosing. If you have time, think about what other functionality you might add. Try to implement it for an extra challenge!

import books from "./books.js";
import chalk from "chalk";
import readline from "readline";
import figlet from "figlet";

// create interface for input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(chalk.magenta(figlet.textSync('Libary Inventory', {
    font: 'Puffy',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true,
})));

let userInput = "";

rl.question(`\nEnter:
    \n1 to print a list of all books
    \n2 to add a new book to the inventory
    \n3 to get details for a specific book\n`, function (string) {
    userInput = string


        if (userInput === '1') {
            console.log(chalk.blue(`We currently have these ${books.length} books in our inventory:`), books);
            rl.question("\nFor more book details, enter the title of the book:\n", function (string) {
                let selectedBook;
                userInput = string;
                // add option to delete this book from inventory
                // maybe: add option to filter books
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

        if (userInput === '2') {

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
                    console.log(`${book.title} by ${book.author} is now available!`);
                    console.log("Here is your updated inventory: ", books);
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
});
