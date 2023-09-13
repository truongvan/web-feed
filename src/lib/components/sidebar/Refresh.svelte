<script lang="ts">
    import { channelStore } from "$lib/channel/store";
    import { getFeedDetail } from "$lib/feed/get_feed";

    async function handleClick() {
        for (const channel of $channelStore) {
            const feed = await getFeedDetail(
                channel.name,
                channel.url,
                channel.id
            );

            const channelObj = $channelStore.find((channelObj) => {
                return channelObj.name === channel.name;
            });

            if (channelObj && feed && feed.items) {
                channelObj.itemCount = feed.items.length;
                channelObj.updated_at = Date.now();
                $channelStore = $channelStore;
            }
        }
    }
</script>

<button
    on:click|stopPropagation={handleClick}
    on:mousedown|stopPropagation
    class="w-6 h-6 hover:bg-magnum-400 active:bg-magnum-600 rounded-sm hover:text-white">
    <i class="bi bi-arrow-clockwise" />
</button>
