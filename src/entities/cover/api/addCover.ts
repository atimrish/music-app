import { getDatabase } from "@/src/shared/lib/getDatabase";
import { ICover } from "../model/interfaces";

export const addCover = async (data: Omit<ICover, 'id' | 'createdAt'>) => {
    const db = await getDatabase()

    const result = await db.runAsync('INSERT INTO cover (name, src) VALUES ($name, $src);', {
        $name: data.name,
        $src: data.src
    })
    await db.closeAsync()
    return result.lastInsertRowId
};
