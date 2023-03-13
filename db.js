import pkg from "pg";
const { Client } = pkg;

let db = new Client({
    connectionString: "library_takehome"
});

db.connect();

export default db;
