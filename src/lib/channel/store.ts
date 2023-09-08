import type { Channel } from "./type";

import { writable } from "svelte/store";
import { getAllChannel, updateOrCreateChannel } from "$lib/query/channel";

export function create_db_store(initalValue: Channel[] = []) {
    const { set, update, subscribe } = writable(initalValue);
    let unsubscribe = function () {};
    let updateTimeout: number;
    return {
        set,
        update,
        subscribe,
        loadDB: async () => {
            const data = await getAllChannel();
            if (data && data.length !== 0) {
                set(data);
            }
        },
        unsubscribe: async () => unsubscribe(),
    };
}

export const channelStore = create_db_store();
export const selectedChannelStore = writable<Channel | null>(null);
