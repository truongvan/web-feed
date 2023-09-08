import type { Item } from "$lib/feed/type";
import { getDb } from "./base";

function convert(item: Item) {
    if (typeof item.read === "string") {
        const read = item.read === "true";
        item.read = read;
    }
    if (typeof item.hidden === "string") {
        const hidden = item.hidden === "true";
        item.hidden = hidden;
    }
    return item;
}

export async function createItem(item: Omit<Item, "id">) {
    const db = await getDb();
    const result = await db.execute(
        "INSERT INTO items (feed_id, title, link, description, published, read, full_content, hidden) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
        [
            item.feed_id,
            item.title,
            item.link,
            item.description,
            item.published,
            item.read,
            item.full_content,
            item.hidden,
        ]
    );
    return getItem(result.lastInsertId);
}

export async function getItemByLink(
    link: string,
    feed_id: number
): Promise<Item | null> {
    const db = await getDb();
    const result = await db.select<Item[]>(
        "SELECT * FROM items WHERE link = $1 AND feed_id = $2",
        [link, feed_id]
    );
    return result[0] || null;
}

export async function getAllItems(feedId: number) {
    const db = await getDb();
    const result = await db.select<Item[]>(
        "SELECT * FROM items WHERE feed_id = $1",
        [feedId]
    );

    return result.map((i) => convert(i));
}

export async function getItem(id: number) {
    const db = await getDb();
    const r = await db.select<Item[]>("SELECT * FROM items WHERE id = $1", [
        id,
    ]);
    return convert(r[0]);
}

export async function updateItem(item: Partial<Item>) {
    const db = await getDb();

    const result = await db.execute(
        "UPDATE items SET feed_id = $1, title = $2, link = $3, description = $4, published = $5, read = $6, full_content = $7, hidden = $8 WHERE id = $9",
        [
            item.feed_id,
            item.title,
            item.link,
            item.description,
            item.published,
            item.read,
            item.full_content,
            item.hidden,
            item.id,
        ]
    );
    if (item.id) {
        return getItem(item.id);
    }
    throw new Error("Can not get item after update");
}

export async function updateOrCreateItem(item: Omit<Item, "id">) {
    if (item.link) {
        const itemInstance = await getItemByLink(item.link, item.feed_id);
        if (itemInstance) {
            return await updateItem({
                ...item,
                id: itemInstance.id,
            });
        } else {
            return await createItem(item);
        }
    }
    throw new Error("Item have no link.");
}

export async function deleteItem(id: number) {
    const db = await getDb();
    return await db.execute("DELETE FROM items WHERE id = $1", [id]);
}
