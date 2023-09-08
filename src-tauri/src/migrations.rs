use tauri_plugin_sql::{Migration, MigrationKind};

pub fn initialize_db_schema() -> Vec<Migration> {
    let channel_migration = Migration {
        version: 1,
        description: "Channels",
        sql: r#"CREATE TABLE IF NOT EXISTS channels (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL UNIQUE,
            created_at INTEGER,
            updated_at INTEGER,
            iconPath TEXT NOT NULL,
            itemCount INTEGER NOT NULL,
            itemUnreadCount INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS feeds (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            channel_id INTEGER NOT NULL UNIQUE,
            title TEXT NOT NULL,
            link TEXT,
            description TEXT,
            FOREIGN KEY(channel_id) REFERENCES channels(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            feed_id INTEGER NOT NULL,
            title TEXT,
            full_content TEXT,
            link TEXT,
            description TEXT NOT NULL,
            published INTEGER,
            read INTEGER NOT NULL,
            hidden INTEGER NOT NULL,
            FOREIGN KEY(feed_id) REFERENCES feeds(id) ON DELETE CASCADE
        );
        CREATE TABLE IF NOT EXISTS icons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL UNIQUE,
            image_path TEXT NOT NULL UNIQUE,
            size INTEGER NOT NULL
        );"#,
        kind: MigrationKind::Up,
    };

    vec![channel_migration]
}
