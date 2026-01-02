import { getDatabase } from "@/src/shared/lib/getDatabase"
import { IJoinedAudio } from "../model/interfaces"

const SQL = `
    SELECT
        audio.id as id,
        audio.name as name,
        audio.src as src,
        cover.src as coverSrc,
        author.name as author,
        audio.created_at as createdAt
    FROM audio
    LEFT JOIN author ON audio.author_id = author.id
    LEFT JOIN cover ON audio.cover_id = cover.id
    WHERE audio.id = $id
`

export const getAudioById = async (id: number) => {
    const db = await getDatabase()
    const result = await db.getFirstAsync<IJoinedAudio>(SQL, {$id: id})
    await db.closeAsync()
    return result
}