import { AUDIO_PATH, COVER_PATH } from "@/src/shared/config/config";
import { getDatabase } from "@/src/shared/lib/getDatabase";
import { Directory } from "expo-file-system";

export const setup = () => {
	setupDb();
	setupDirectories();
};

const setupDirectories = () => {
	const dirs = [COVER_PATH, AUDIO_PATH];
	dirs.forEach((i) => {
		const dir = new Directory(i);

		if (!dir.exists) {
			dir.create();
			console.log("Создана папка: ", dir.name);
		}
	});
};

const setupDb = async () => {
	console.log("[SQLITE]: starting to setup db");

	const db = await getDatabase();

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
            src TEXT NOT NULL,
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
    `);

	await db.closeAsync();
};

export const clearData = async () => {
	try {
		const db = await getDatabase();
		await db.execAsync(`
            DELETE FROM playlist_audio;
            DELETE FROM playlist;
            DELETE FROM audio;
            DELETE FROM author;
            DELETE FROM cover;
            `);
		await db.closeAsync();

		const dirs = [COVER_PATH, AUDIO_PATH];

		dirs.forEach((i) => {
			const dir = new Directory(i);
			dir.delete();
		});
		console.log("Очистка завершена");
	} catch (e) {
		console.error(e);
	}
};

export const dropTables = async () => {
    try {
        const db = await getDatabase();
		await db.execAsync(`
            DROP TABLE IF EXISTS playlist_audio;
            DROP TABLE IF EXISTS playlist;
            DROP TABLE IF EXISTS audio;
            DROP TABLE IF EXISTS author;
            DROP TABLE IF EXISTS cover;
            `);
		await db.closeAsync();

        console.log("Таблицы удалены");
    } catch (e) {
        console.error(e);
    }
}
