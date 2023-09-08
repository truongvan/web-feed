<script>
    import Align from "./Align.svelte";
    import Bookmark from "./Bookmark.svelte";
    import Export from "./Export.svelte";
    import LoadContent from "./LoadContent.svelte";
</script>

<div
    class="flex me-2 cursor-default"
    role="button"
    tabindex="0"
    on:mousedown|preventDefault={async () => {
        const { window } = await import("@tauri-apps/api");
        await window.appWindow.startDragging();
    }}
>
    <div class="mr-auto" />
    <div class="flex gap-1">
        <div><LoadContent /></div>
        <div><Bookmark /></div>
        <div><Align /></div>
        <div><Export /></div>
    </div>
</div>
