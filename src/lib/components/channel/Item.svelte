<script lang="ts">
    import { currentItemStore } from "$lib/feed/store";
    import type { Item } from "$lib/feed/type";
    import dayjs from "dayjs";
    import ItemContextMenu from "./ItemContextMenu.svelte";
    import { updateItem } from "$lib/query/item";
    import { createEventDispatcher } from "svelte";

    export let item: Item;
    let node: HTMLElement;
    let showContextMenu = false;

    const dispatcher = createEventDispatcher();
</script>

<li
    role="option"
    aria-selected={item == $currentItemStore}
    class="aria-selected:bg-magnum-500 aria-selected:text-white rounded-md hover:bg-magnum-50 m-1">
    <button
        bind:this={node}
        class="btn btn-text text-decoration-none px-2 py-1 text-start w-full"
        on:contextmenu|preventDefault={() => {
            showContextMenu = true;
        }}
        on:selectstart|preventDefault
        on:click={async () => {
            item = await updateItem({
                ...item,
                read: true,
            });
            $currentItemStore = item;
        }}>
        <div class="flex flex-row justify-end align-middle gap-0.5">
            {#if !item.read}
                <div class="h-1 w-1 rounded-full bg-magnum-400 my-auto" />
            {/if}
            <div class="opacity-50 text-xs">
                {dayjs(item.published).fromNow()}
            </div>
        </div>

        <div class="flex">
            <h6>
                {item.title}
            </h6>
        </div>
    </button>
</li>
{#if node}
    <ItemContextMenu
        bind:show={showContextMenu}
        target={node}
        on:hide={async () => {
            item = await updateItem({
                ...item,
                hidden: true,
            });
            dispatcher("hide", {
                item,
            });
        }} />
{/if}
