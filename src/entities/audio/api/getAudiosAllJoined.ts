import { getDatabase } from "@/src/shared/lib/getDatabase";
import { IJoinedAudio } from "../model/interfaces";

const SQL = `
    SELECT 
        audio.id,
        audio.name,
        audio.src,
        audio.created_at as createdAt,
        author.name as author,
        cover.src as coverSrc
    FROM audio
        LEFT JOIN author ON audio.author_id = author.id
        LEFT JOIN cover ON audio.cover_id = cover.id
`;

export const getAudiosAllJoined = async () => {
	const db = await getDatabase();
	const result = await db.getAllAsync<IJoinedAudio>(SQL);
	await db.closeAsync();
	return result;
};
