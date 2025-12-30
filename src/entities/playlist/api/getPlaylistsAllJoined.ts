import { getDatabase } from "@/src/shared/lib/getDatabase"
import { IJoinedPlaylist } from "../model/interfaces"

const SQL = `
        SELECT
            playlist.id,
            playlist.name,
            cover.src as coverSrc,
            playlist.created_at as createdAt,
            COUNT(playlist_audio.id) as countAudios
        FROM playlist
            LEFT JOIN cover ON playlist.cover_id = cover.id
            LEFT JOIN playlist_audio ON playlist.id = playlist_audio.playlist_id
    `

export const getPlaylistsAllJoined = async () => {
    const db = await getDatabase()
    const result = await db.getAllAsync<IJoinedPlaylist>(SQL)
    await db.closeAsync()
    return result
}