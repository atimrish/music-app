import * as SQLite from 'expo-sqlite'

export const setupDb = async () => {

    console.log('[SQLITE]: starting to setup db');
    

    const db = await SQLite.openDatabaseAsync('music-app.db')

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS author (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS cover (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            src TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS audio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            author_id INTEGER,
            cover_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (author_id) REFERENCES author (id) ON DELETE CASCADE,
            FOREIGN KEY (cover_id) REFERENCES cover (id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS playlist (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cover_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (cover_id) REFERENCES cover (id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS playlist_audio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            playlist_id INTEGER,
            audio_id INTEGER,
            
            FOREIGN KEY (playlist_id) REFERENCES playlist (id) ON DELETE CASCADE,
            FOREIGN KEY (audio_id) REFERENCES audio (id) ON DELETE CASCADE
        );
    `)
}