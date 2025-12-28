import { getDatabase } from "@/src/shared/lib/getDatabase";
import { IAuthor } from "../model/interfaces";

export const addAuthor = async (data: Omit<IAuthor, 'id' | 'createdAt'>) => {
    const db = await getDatabase()
    const result = await db.runAsync('INSERT INTO author (name) VALUES ($name);', {$name: data.name})
    await db.closeAsync()
    return result.lastInsertRowId
}