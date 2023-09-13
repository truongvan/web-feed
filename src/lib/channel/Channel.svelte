<script lang="ts">
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import ChannelHeader from "$lib/components/channel/ChannelHeader.svelte";
    import ItemList from "$lib/components/channel/ItemList.svelte";
    import type { Item } from "$lib/feed/type";
    import type { Channel as ChannelInterface } from "./type";
    import { channelStore } from "./store";
    import { updateChannel } from "$lib/query/channel";

    dayjs.extend(relativeTime);

    export let selectedChannel: ChannelInterface;
    export let items: Item[];

    let channelWidth = "fit-content";
    let channelMaxWidth = "300px";
    async function checkShow(channel: ChannelInterface | null) {
        if (channel) {
            channelWidth = "fit-content";
            channelMaxWidth = "300px";
        } else {
            channelWidth = "0px";
            channelMaxWidth = "0px";
        }
    }
    async function updateChanelUnreadCount(
        itemCount: number,
        itemUnreadCount: number
    ) {
        selectedChannel.itemUnreadCount = itemUnreadCount;
        selectedChannel.itemCount = itemCount;
        let channel = $channelStore.find((c) => c.id === selectedChannel.id);
        if (channel) {
            channel = { ...selectedChannel };
            updateChannel({ ...channel });
            $channelStore = $channelStore;
        }
    }
    $: updateChanelUnreadCount(
        items.length,
        items.filter((i) => !i.read).length
    );
</script>

<div
    class=" flex flex-col h-full gap-2"
    style="width:{channelWidth};max-width:350px;min-width:{channelMaxWidth};">
    <div class="flex justify-end gap-2">
        <ChannelHeader
            channel={selectedChannel}
            bind:items />
    </div>
    <div class="px-3 position-relative">
        <div class="flex flex-col">
            <h2 class="text-magnum-500">
                {selectedChannel.name}
            </h2>
            <p class="opacity-50 text-sm">
                {items.filter((i) => !i.read).length} Unread Items
            </p>
        </div>
    </div>
    <div class=" scrollbar w-full overflow-y-auto">
        <div class="flex h-full w-full overflow-y-auto">
            <ItemList bind:items />
        </div>
    </div>
</div>
