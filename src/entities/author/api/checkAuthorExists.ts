import { getDatabase } from "@/src/shared/lib/getDatabase";

export const checkAuthorExists = async (name: string) => {
    const db = await getDatabase()
    const {count} = await db.getFirstAsync('SELECT COUNT(id) as count FROM author WHERE name = $name', {$name: name}) as {count: number}
    await db.closeAsync()
    return count > 0
}