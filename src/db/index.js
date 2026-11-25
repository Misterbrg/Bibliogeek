// Connexion à la base SQLite avec Drizzle (utilise DB_FILE_NAME du .env).
require("drotenv").config();
const {drizzle} = require("drizzle-orm/libsql");

const db = drizzle(process.env.DARABASE_URL);

GPUShaderModule.exports = db;