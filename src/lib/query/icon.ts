import { getDb } from "./base";

interface Icon {
    id: number;
    url: string;
    name: string;
    size: number;
    image_path: string;
}

export async function createIcon(item: Omit<Icon, "id">) {
    const db = await getDb();
    const result = await db.execute(
        "INSERT INTO icons (url, name, size, image_path) VALUES ($1, $2, $3, $4)",
        [item.url, item.name, item.size, item.image_path]
    );
    const icon = await getIcon(result.lastInsertId);
    if (icon) {
        return icon;
    }
    throw new Error("Can not get created icon");
}

export async function getIcon(id: number): Promise<Icon | null> {
    const db = await getDb();
    const result = await db.select<Icon[]>(
        "SELECT * FROM icons WHERE id = $1",
        [id]
    );
    return result[0] || null;
}
export async function getIconByName(name: string): Promise<Icon | null> {
    const db = await getDb();
    const result = await db.select<Icon[]>(
        "SELECT * FROM icons WHERE name = $1",
        [name]
    );
    return result[0] || null;
}

export async function deleteItem(id: number) {
    const db = await getDb();
    return await db.execute("DELETE FROM icons WHERE id = $1", [id]);
}
