<script lang="ts">
    import { createDialog, melt } from "@melt-ui/svelte";
    import ChannelModal from "./ChannelModal.svelte";

    const {
        elements: { close, overlay, portalled, content, trigger },
        states: { open },
    } = createDialog();
</script>

<button
    use:melt={$trigger}
    class="w-6 h-6 hover:bg-magnum-400 active:bg-magnum-600 rounded-sm hover:text-white"
>
    <i class="bi bi-plus-lg" />
</button>
<ChannelModal {open} {close} {overlay} {portalled} {content} />
