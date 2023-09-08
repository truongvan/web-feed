import type { Article } from "$lib/article/type";

export interface Feed {
    id: number;
    channel_id: number;
    title: string;
    link?: string;
    description?: string;
    items?: Item[];
}

export interface Item {
    id: number;
    feed_id: number;
    title?: string;
    link?: string;
    description: string;
    published?: number;
    read: boolean;
    full_content: string;
    hidden: boolean;
}
