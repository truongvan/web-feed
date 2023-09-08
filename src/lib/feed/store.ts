import { writable } from "svelte/store";
import type { Feed, Item } from "./type";
import { getAllFeeds, updateOrCreateFeed } from "$lib/query/feed";

function createStore() {
    const { set, update, subscribe } = writable<Feed | null>(null);
    let unsubscribe = function () {};
    let updateTimeout: number;
    return {
        set,
        update,
        subscribe,
        loadDB: async (channelId: number | null) => {
            if (channelId === null) {
                set(null);
            } else {
                try {
                    const feed = await getAllFeeds(channelId);
                    set(feed);
                } catch (error) {
                    set(null);
                }
            }
            unsubscribe = subscribe((current) => {
                if (current) {
                    clearTimeout(updateTimeout);
                    updateTimeout = setTimeout(async () => {
                        const r = await updateOrCreateFeed(current);
                    });
                }
            });
        },
        unsubscribe: async () => unsubscribe(),
    };
}
export const feedStore = createStore();
export const currentItemStore = writable<Item | null>(null);
