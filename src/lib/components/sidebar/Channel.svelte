<script lang="ts">
    import { channelStore, selectedChannelStore } from "$lib/channel/store";
    import type { Channel } from "$lib/channel/type";
    import { feedStore } from "$lib/feed/store";
    import { onMount } from "svelte";
    import ChannelOptions from "./ChannelOptions.svelte";
    import ChannelModal from "./ChannelModal.svelte";
    import { createDialog, createContextMenu, melt } from "@melt-ui/svelte";
    import { deleteChannel } from "$lib/query/channel";
    import { getFeedDetail } from "$lib/feed/get_feed";

    export let channel: Channel;
    export let itemUnreadCount: number;
    let image = "";
    const dialogCommands = createDialog();
    const dialogTrigger = dialogCommands.elements.trigger;
    const {
        elements: { menu, item, trigger, separator },
    } = createContextMenu();

    onMount(async () => {
        if (channel.iconPath) {
            const { convertFileSrc } = await import("@tauri-apps/api/tauri");
            image = convertFileSrc(channel.iconPath);
        }
    });

    async function loadFeeds(channelId: number | null) {
        await feedStore.loadDB(channelId);
        if (!$feedStore && channelId) {
            $feedStore = await getFeedDetail(
                channel.name,
                channel.url,
                channelId
            );
        }
        $selectedChannelStore = channel;
    }
</script>

<!-- active:bg-gray-400 aria-selected:bg-gray-200 hover:bg-gray-200 -->
<button
    use:melt={$trigger}
    role="tab"
    tabindex="0"
    on:click|preventDefault|stopImmediatePropagation={async () => {
        loadFeeds(channel.id || null);
    }}
    aria-selected={$selectedChannelStore &&
        $selectedChannelStore.id === channel.id}
    on:selectstart|preventDefault
    class="z-1 gap-3 flex justify-items-center items-center w-full overflow-hidden rounded px-2 bg-opacity-50 hover:bg-gray-200/40 active:bg-gray-200/60 aria-selected:bg-gray-200/50">
    <div class="flex items-center gap-1 mr-auto">
        <img
            class="h-8 w-8 rounded-full"
            src={image}
            alt={channel.name} />

        <div class="whitespace-nowrap">
            {channel.name}
        </div>
    </div>
    <div class="opacity-50">
        {itemUnreadCount}
    </div>
</button>
<ChannelOptions
    {menu}
    {item}
    {separator}
    {dialogTrigger}
    on:delete={() => {
        if (channel.id) {
            deleteChannel(channel.id);
            $channelStore = $channelStore.filter(
                (c) => channel.name !== c.name
            );
        }
    }}
    on:edit={() => {}}
    on:refresh={() => {}} />
<ChannelModal
    open={dialogCommands.states.open}
    close={dialogCommands.elements.close}
    overlay={dialogCommands.elements.overlay}
    portalled={dialogCommands.elements.portalled}
    content={dialogCommands.elements.content}
    bind:channel />

<style>
    div {
        user-select: none;
    }
    img {
        width: 1rem;
        height: 1rem;
    }
</style>
