<script lang="ts">
    import { feedStore } from "$lib/feed/store";

    async function handleClick() {
        if ($feedStore) {
            $feedStore.feed.items = $feedStore.feed.items.map((i) => ({
                ...i,
                read: true,
            }));
        }
    }
</script>

<button
    on:click={handleClick}
    class="w-6 h-6 hover:bg-magnum-400 active:bg-magnum-600 rounded-sm hover:text-white">
    <i class="bi bi-check-circle-fill" />
</button>
