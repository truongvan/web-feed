import type { Feed } from "../feed/type";
import { getDb } from "./base";

export async function createFeed(feed: Omit<Feed, "id">) {
    const db = await getDb();
    const result = await db.execute(
        "INSERT INTO feeds (channel_id, title, link, description) VALUES ($1, $2, $3, $4)",
        [feed.channel_id, feed.title, feed.link, feed.description]
    );
    const feedInstance = await getFeed(result.lastInsertId);
    if (feedInstance) {
        return feedInstance;
    }
    throw new Error("Can not get feed after create.");
}

export async function getFeed(id: number): Promise<Feed | null> {
    const db = await getDb();
    const result = await db.select<Feed[]>(
        "SELECT * FROM feeds WHERE id = $1",
        [id]
    );
    return result[0] || null;
}
export async function getFeedByChannel(
    channel_id: number
): Promise<Feed | null> {
    const db = await getDb();
    const result = await db.select<Feed[]>(
        "SELECT * FROM feeds WHERE channel_id = $1",
        [channel_id]
    );
    return result[0] || null;
}

export async function getOrUpdateFeedByChannel(feed: Omit<Feed, "id"> | Feed) {
    const feedInstance = await getFeedByChannel(feed.channel_id);
    if (feedInstance) {
        return await updateFeed({ ...feed, id: feedInstance.id });
    } else {
        return await createFeed(feed);
    }
}

export async function getAllFeeds(channelId: number) {
    const db = await getDb();
    const result = await db.select<Feed[]>(
        "SELECT * FROM feeds where channel_id = $1",
        [channelId]
    );
    return result[0] || null;
}

export async function updateFeed(feed: Partial<Feed>) {
    const db = await getDb();

    const result = await db.execute(
        "UPDATE feeds SET channel_id = $1, title = $2, link = $3, description = $4 WHERE id = $5",
        [feed.channel_id, feed.title, feed.link, feed.description, feed.id]
    );
    if (feed.id) {
        const feedInstance = await getFeed(feed.id);
        if (feedInstance) {
            return feedInstance;
        }
    }
    throw new Error("Can not get feed after update.");
}

export async function updateOrCreateFeed(feed: Feed) {
    if (feed.id) {
        return await updateFeed(feed);
    } else {
        return await createFeed(feed);
    }
}

export async function deleteFeed(id: number) {
    const db = await getDb();
    return await db.execute("DELETE FROM feeds WHERE id = $1", [id]);
}
export async function deleteFeedByChannel(channel_id: number) {
    const db = await getDb();
    return await db.execute("DELETE FROM feeds WHERE channel_id = $1", [
        channel_id,
    ]);
}
