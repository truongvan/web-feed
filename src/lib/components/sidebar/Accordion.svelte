<script lang="ts">
    import ChannelComponent from "./Channel.svelte";
    import { channelStore } from "$lib/channel/store";
    import { onMount } from "svelte";

    let show = true;

    onMount(async () => {
        channelStore.loadDB();
    });
</script>

<button
    class="decoration-none flex justify-between align-center w-full gap-2 overflow-hidden"
    on:click={() => {
        show = !show;
    }}>
    <div class="fs-4">Channel</div>
    <div>
        <i
            class:rotate={show}
            class="bi bi-chevron-compact-right fs-4" />
    </div>
</button>
{#if show && $channelStore}
    <ul
        class="flex flex-col mb-auto gap-1"
        role="menu">
        {#each $channelStore as channel (channel)}
            <li
                class="flex"
                role="presentation">
                <ChannelComponent
                    bind:itemUnreadCount={channel.itemUnreadCount}
                    bind:channel />
            </li>
        {/each}
    </ul>
{/if}

<style>
    i::before {
        transition: transform 0.25s ease;
    }
    .rotate::before {
        transform: rotate(90deg);
    }
</style>
