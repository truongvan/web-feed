<script lang="ts">
    import { onMount } from "svelte";
    import Accordion from "./Accordion.svelte";
    import SideBarHeader from "./SideBarHeader.svelte";

    const MAX_WIDTH = 500;
    let sidebarElement: HTMLElement;
    let minWidth = 150;
    let sidebarWidth = "fit-containt";
    let sidebarMinWidth = `${minWidth}px`;

    onMount(async () => {
        setTimeout(() => {
            if (sidebarElement && sidebarElement.clientWidth > minWidth) {
                minWidth = Math.min(sidebarElement.offsetWidth, MAX_WIDTH);
                sidebarMinWidth = `${minWidth}px`;
            }
        }, 500);
    });

    function handleResizeBarDrag(_e: MouseEvent) {
        function moveAt(x: number) {
            const wrapperElement = sidebarElement.parentElement;
            if (wrapperElement) {
                if (x < minWidth / 2) {
                    sidebarWidth = `0px`;
                    sidebarMinWidth = `0px`;
                } else {
                    sidebarWidth = `${Math.min(x, MAX_WIDTH)}px`;
                    sidebarMinWidth = `${minWidth}px`;
                }
            }
        }

        const onMouseMove = (e: MouseEvent) => {
            moveAt(e.pageX);
        };

        document.addEventListener("mousemove", onMouseMove);

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mouseup", onMouseUp);
    }
</script>

<div
    aria-hidden={sidebarWidth == "0px"}
    style:width={sidebarWidth}
    style:min-width={sidebarMinWidth}
    bind:this={sidebarElement}
    aria-label="Docs navigation"
    class="flex group flex-col shrink-0 text-white bg-magnum-500 sidebar relative">
    <div
        role="button"
        tabindex="0"
        on:mousedown|preventDefault={handleResizeBarDrag}
        on:dragstart={() => false}
        class="group-aria-hidden:translate-x-0 w-1 h-full -translate-x-1/2 transition-[background-color] hover:cursor-ew-resize hover:bg-magnum-300 reside-bar absolute left-full top-0" />
    <div class="px-3">
        <SideBarHeader />
        <div class="overflow-hidden">
            <Accordion />
        </div>
    </div>
</div>
