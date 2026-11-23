import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema.js';

// Connexion unique à la base SQLite, à importer partout où on en a besoin
export const db = drizzle(process.env.DB_FILE_NAME, { schema });
