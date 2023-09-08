<script lang="ts">
    import { selectedChannelStore } from "$lib/channel/store";
</script>

{#if $selectedChannelStore}
    <button
        on:mousedown|stopPropagation|preventDefault
        on:click={() => ($selectedChannelStore = null)}
        class="w-6 h-6 hover:bg-magnum-400 active:bg-magnum-600 rounded-sm hover:text-white">
        <i class="bi bi-x-lg" />
    </button>
{/if}
