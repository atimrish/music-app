import * as SQLite from 'expo-sqlite'

export const getDatabase = async () => await SQLite.openDatabaseAsync('music-app.db')