import { getDatabase } from "@/src/shared/lib/getDatabase";
import { IAudio } from "../model/interfaces";

export const addAudio = async (data: Omit<IAudio, 'id' | 'createdAt'>) => {
    const db = await getDatabase()
    const {lastInsertRowId} = await db.runAsync('INSERT INTO audio (name, author_id, cover_id, src) VALUES ($name, $author_id, $cover_id, $src);', {
        $name: data.name,
        $author_id: data.authorId,
        $cover_id: data.coverId,
        $src: data.src
    })
    await db.closeAsync()
    return lastInsertRowId
}