<script lang="ts">
    import type { Channel } from "$lib/channel/type";
    import { getFeedDetail } from "$lib/feed/get_feed";
    import type { Item } from "$lib/feed/type";
    import { getAllItems } from "$lib/query/item";
    import Close from "./Close.svelte";
    import MarkAll from "./MarkAll.svelte";
    import Refresh from "./Refresh.svelte";
    import Search from "./Search.svelte";

    export let channel: Channel;
    export let items: Item[];
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="w-100 flex justify-end gap-2 pe-2"
    on:mousedown|preventDefault={async () => {
        const { window } = await import("@tauri-apps/api");
        await window.appWindow.startDragging();
    }}>
    <div>
        <Refresh
            on:refesh={async () => {
                const feed = await getFeedDetail(
                    channel.name,
                    channel.url,
                    channel.id
                );
                items = await getAllItems(feed.id);
                console.log(items);
            }} />
    </div>
    <div>
        <MarkAll />
    </div>
    <div>
        <Search />
    </div>
    <div>
        <Close />
    </div>
</div>
