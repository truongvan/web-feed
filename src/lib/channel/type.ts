export interface Channel {
    id: number;
    url: string;
    name: string;
    created_at?: number | null;
    updated_at?: number | null;
    iconPath: string;
    itemCount: number;
    itemUnreadCount: number;
}
