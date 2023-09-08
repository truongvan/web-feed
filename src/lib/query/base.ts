import Database from "tauri-plugin-sql-api";

let db: Database | null = null;
export async function getDb() {
    if (db) {
        return db;
    } else {
        db = await Database.load("sqlite:app.db");
        return db;
    }
}
