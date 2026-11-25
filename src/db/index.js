// Connexion à la base SQLite avec Drizzle (utilise DB_FILE_NAME du .env).
require("dotenv").config();
const {drizzle} = require("drizzle-orm/libsql");

const db = drizzle(process.env.DATABASE_URL);

module.exports = db;