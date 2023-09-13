<script lang="ts">
    import { sidebarWidthStore } from "$lib/channel/store";

    function handleClick() {
        $sidebarWidthStore.show = !$sidebarWidthStore.show;
    }
</script>

<button
    aria-checked={$sidebarWidthStore.show}
    on:click|stopPropagation={handleClick}
    on:mousedown|stopPropagation
    class="w-6 h-6 aria-checked:bg-magnum-500 aria-checked:text-white hover:bg-magnum-400 active:bg-magnum-600 rounded hover:text-white">
    <i class="bi bi-layout-sidebar" />
</button>
