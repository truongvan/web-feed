<script lang="ts">
    import { currentItemStore } from "$lib/feed/store";
    import type { Item } from "$lib/feed/type";
    import dayjs from "dayjs";
    import { updateItem } from "$lib/query/item";
    import { createEventDispatcher } from "svelte";

    export let item: Item;

    const dispatcher = createEventDispatcher();
</script>

<li
    role="option"
    aria-selected={item == $currentItemStore}
    class="aria-selected:bg-themeBlue-500 aria-selected:text-white aria-selected:bg-magnum-500">
    <button
        class="btn btn-text text-decoration-none px-2 py-1 text-start w-full"
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
