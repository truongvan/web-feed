import { extractFromXml } from "@extractus/feed-extractor";
import DOMPurify from "dompurify";
import type { Feed } from "./type";
import { updateOrCreateItem } from "$lib/query/item";
import { getOrUpdateFeedByChannel } from "$lib/query/feed";

export async function getFeedDetail(
    channelName: string,
    url: string,
    channelId: number
) {
    const { invoke } = await import("@tauri-apps/api");
    const purify = DOMPurify(window);
    const text = await invoke<{
        content_type: string;
        data: string;
        status: number;
        type: "xml" | "json";
    }>("get_feed", {
        url: url,
    });

    const rawFeed = extractFromXml(text.data, {
        normalization: true,
    });
    console.log(rawFeed);

    const feed_raw: Omit<Feed, "id"> = {
        title: rawFeed.title ?? channelName,
        channel_id: channelId,
        items: [],
        link: rawFeed.link,
        description: rawFeed.description,
    };

    const feed = await getOrUpdateFeedByChannel(feed_raw);

    if (rawFeed.entries) {
        await Promise.all(
            rawFeed.entries.map((item) => {
                return updateOrCreateItem({
                    feed_id: feed.id,
                    title: item.title,
                    link: item.link,
                    published: item.published
                        ? new Date(item.published).getTime()
                        : Date.now(),
                    description: purify.sanitize(item.description ?? ""),
                    read: false,
                    hidden: false,
                    full_content: "",
                });
            })
        );
    }

    return feed;
}
