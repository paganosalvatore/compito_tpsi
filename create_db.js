const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("compito.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS ticket (
        id TEXT PRIMARY KEY,
        time_in INTEGER DEFAULT 0,
        time_out INTEGER DEFAULT 0,
        prezzo INTEGER
    )`);
});

/*nella cartella installo questo
npm init -y
npm install express
install sqlite3*/