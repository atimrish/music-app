import { getDatabase } from "@/src/shared/lib/getDatabase";

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

export interface IJoinedAudio {
	id: number;
	name: string;
	src: string;
	createdAt: string;
	author: string;
	coverSrc: string;
}

export const getAudiosAllJoined = async () => {
	const db = await getDatabase();
	const result = await db.getAllAsync<IJoinedAudio>(SQL);
	await db.closeAsync();
	return result;
};
