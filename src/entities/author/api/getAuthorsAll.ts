import { getDatabase } from "@/src/shared/lib/getDatabase"
import { IAuthor } from "../model/interfaces"

export const getAuthorsAll = async () => {
    const db = await getDatabase()
    const result = await db.getAllAsync('SELECT id, name, created_at as createdAt FROM author') as IAuthor[]
    await db.closeAsync()
    return result
}