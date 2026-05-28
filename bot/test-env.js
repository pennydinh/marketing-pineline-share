require('dotenv').config();
const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
console.log("DB_URL from env:", dbUrl ? "FOUND" : "NOT FOUND");
