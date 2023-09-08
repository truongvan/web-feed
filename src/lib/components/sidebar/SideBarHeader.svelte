<script>
    import AddNew from "./AddNew.svelte";
    import Refresh from "./Refresh.svelte";
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class="flex justify-end gap-2 pt-1"
    on:mousedown|preventDefault={async () => {
        const { window } = await import("@tauri-apps/api");
        await window.appWindow.startDragging();
    }}>
    <div>
        <Refresh />
    </div>
    <div>
        <AddNew />
    </div>
</div>
