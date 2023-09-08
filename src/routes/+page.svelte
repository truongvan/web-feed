<script lang="ts">
    import Channel from "$lib/channel/Channel.svelte";
    import { selectedChannelStore } from "$lib/channel/store";
    import Feed from "$lib/components/feed/Feed.svelte";
    import { feedStore } from "$lib/feed/store";
    import { getAllItems } from "$lib/query/item";
</script>

<div class="flex h-full overflow-y-hidden grow pt-1">
    <div class="border-r-2 border-gray-100">
        {#if $selectedChannelStore && $feedStore}
            {#await getAllItems($feedStore.id) then items}
                <Channel
                    {items}
                    selectedChannel={$selectedChannelStore} />
            {/await}
        {/if}
    </div>
    <div class="grow">
        <Feed />
    </div>
</div>
