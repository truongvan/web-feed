<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatcher = createEventDispatcher();
</script>

<button
    on:click|stopPropagation={() => dispatcher("refesh")}
    on:mousedown|stopPropagation
    class="w-6 h-6 hover:bg-magnum-400 active:bg-magnum-600 rounded-sm hover:text-white">
    <i class="bi bi-arrow-clockwise" />
</button>
