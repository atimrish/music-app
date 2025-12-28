import { getDatabase } from "@/src/shared/lib/getDatabase";
import { ICover } from "../model/interfaces";

export const getCoversAll = async () => {
    const db = await getDatabase()
    const result = await db.getAllAsync('SELECT id, name, src, created_at as createdAt FROM cover') as ICover[]
    await db.closeAsync()
    return result
};
