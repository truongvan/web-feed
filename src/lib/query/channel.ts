import type { Channel } from "$lib/channel/type";
import { getDb } from "./base";

export async function createChannel(channel: Omit<Channel, "id">) {
    const db = await getDb();
    const updated_at = Date.now();
    const created_at = Date.now();
    const result = await db.execute(
        "INSERT INTO channels (url, name, created_at, updated_at, iconPath, itemCount, itemUnreadCount) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
            channel.url,
            channel.name,
            created_at,
            updated_at,
            channel.iconPath,
            channel.itemCount,
            channel.itemUnreadCount,
        ]
    );
    const channelInstance = await getChannel(result.lastInsertId);
    if (channelInstance) {
        return channelInstance;
    }
    throw new Error("Can not get created channel");
}

export async function getChannel(id: number): Promise<Channel | null> {
    const db = await getDb();
    const result = await db.select<Channel[]>(
        "SELECT * FROM channels WHERE id = $1",
        [id]
    );
    return result[0] || null;
}

export async function getAllChannel() {
    const db = await getDb();
    const result = await db.select<Channel[]>("SELECT * FROM channels");
    return result;
}

export async function updateOrCreateChannel(channel: Channel) {
    if (channel.id) {
        return updateChannel(channel);
    } else {
        return createChannel(channel);
    }
}

export async function updateChannel(channel: Partial<Channel>) {
    const db = await getDb();
    const updated_at = Date.now();

    const result = await db.execute(
        "UPDATE channels SET url = $1, name = $2, updated_at = $3, iconPath = $4, itemCount = $5, itemUnreadCount = $6 WHERE id = $7",
        [
            channel.url,
            channel.name,
            updated_at,
            channel.iconPath,
            channel.itemCount,
            channel.itemUnreadCount,
            channel.id,
        ]
    );

    if (channel.id) {
        const channelInstance = await getChannel(channel.id);
        if (channelInstance) {
            return channelInstance;
        }
    }
    throw new Error("Can not get updated channel");
}

export async function deleteChannel(id: number) {
    const db = await getDb();
    return await db.execute("DELETE FROM channels WHERE id = $1", [id]);
}
