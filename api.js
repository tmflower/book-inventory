import db from "./db.js";

let book = {};

// get complete inventory list from database
export async function getAllBooks() {
	try {
		let res = await db.query(`SELECT id, title, author, availability FROM inventory`);
		return res.rows;
	}
	catch (err) {
		console.error(err.message);
	}
};

// get a single book by its title from inventory
export async function getBook(title) {
	try {
		let res = await db.query(`SELECT id, title, author, availability FROM inventory WHERE title = $1`, [title]);
		book = res.rows[0];
		return book;
	}
	catch (err) {
		console.error(err);
		return (err);
	}
};

// add a book to inventory with title, author, availability, and serial id number
export async function addBook(book) {
	try {
		let res = await db.query(`INSERT INTO inventory (title, author, availability) VALUES ($1, $2, $3) RETURNING id, title, author, availability`, [book.title, book.author, "on shelf"]);
		book = res.rows[0];
	}
	catch (err) {
		console.error(err.message);
	}
};

// change the availability status of a book in the inventory
export async function updateBook(book) {
	try {
		await db.query(`UPDATE inventory SET availability = '${book.availability}' WHERE title = $1 RETURNING id, title, author, availability`, [book.title]);
	}
	catch (err) {
		console.error(err.message);
	}
};

// remove a book from the inventory by its id number
export async function deleteBook(id) {
	try {
		await db.query(`DELETE FROM inventory WHERE id = $1`, [id]);
	}
	catch (err) {
		console.error(err.message);
	}
};
