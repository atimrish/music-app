import { getDatabase } from "@/src/shared/lib/getDatabase"
import { IAudio } from "../model/interfaces"

export const getAudiosAll = async () => {
    const db = await getDatabase()
    const result = await db.getAllAsync<IAudio>('SELECT id, name, author_id as authorId, cover_id as coverId, src, created_at as createdAt FROM audio')
    await db.closeAsync()
    return result
}