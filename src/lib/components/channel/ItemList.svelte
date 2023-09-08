<script lang="ts">
    import type { Item } from "$lib/feed/type";
    import ItemComponent from "./Item.svelte";

    export let items: Item[];
</script>

<ul class="flex flex-col h-full w-full scrollbar overflow-y-auto">
    {#each items as item}
        <ItemComponent
            bind:item
            on:hide={({ detail }) => {
                items = items.filter((i) => i.id !== detail.item.id);
            }} />
    {/each}
</ul>
