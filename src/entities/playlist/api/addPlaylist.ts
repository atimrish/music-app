import { getDatabase } from "@/src/shared/lib/getDatabase";
import { IPlaylist } from "../model/interfaces";

type AddPlaylistData = Omit<IPlaylist, "id" | "createdAt"> & {audioIds: number[]}

export const addPlaylist = async (data: AddPlaylistData) => {
    const db = await getDatabase()

    const {lastInsertRowId} = await db.runAsync('INSERT INTO playlist (name, cover_id) VALUES ($name, $cover_id);', {
        $name: data.name,
        $cover_id: data.coverId
    })

    for (const audioId of data.audioIds) {
        await db.runAsync('INSERT INTO playlist_audio (playlist_id, audio_id) VALUES ($playlist_id, $audio_id);', {
            $playlist_id: lastInsertRowId,
            $audio_id: audioId
        })
    }

    await db.closeAsync()
};
