<script lang="ts">
    import { melt } from "@melt-ui/svelte";
    import { createEventDispatcher } from "svelte";
    export let menu;
    export let item;
    export let separator;
    export let dialogTrigger;
    let handleDisparcher = createEventDispatcher();
</script>

<div
    class="menu"
    use:melt={$menu}>
    <div
        use:melt={$item}
        on:m-click={() => {
            handleDisparcher("refresh");
        }}
        type="button"
        class="item">
        Refresh
    </div>
    <div
        use:melt={$item}
        use:melt={$dialogTrigger}
        on:m-click={() => {
            handleDisparcher("edit");
        }}
        type="button"
        class="item">
        Edit
    </div>
    <div
        class="separator"
        use:melt={$separator} />
    <div
        use:melt={$item}
        on:m-click={() => {
            handleDisparcher("delete");
        }}
        type="button"
        class="item">
        Delete
    </div>
</div>

<style lang="postcss">
    .menu {
        @apply z-10 flex max-h-[300px] min-w-[220px] flex-col shadow-lg shadow-neutral-900/30;
        @apply rounded-md bg-white p-1 lg:max-h-none;
        @apply ring-0 !important;
    }
    .subMenu {
        @apply min-w-[220px] shadow-md shadow-neutral-900/30;
    }
    .item {
        @apply relative h-6 min-h-[24px] select-none rounded pl-6 pr-1;
        @apply z-20 text-magnum-900 outline-none;
        @apply data-[highlighted]:bg-magnum-200 data-[highlighted]:text-magnum-900;
        @apply data-[disabled]:text-neutral-300;
        @apply flex items-center text-sm leading-none;
        @apply ring-0 !important;
    }

    .trigger {
        @apply block rounded-md border-2 border-dashed border-neutral-50;
        @apply w-[300px] py-12 text-center;
    }
    .check {
        @apply absolute left-2 top-1/2 text-magnum-500;
        translate: 0 calc(-50% + 1px);
    }

    .dot {
        @apply h-[4.75px] w-[4.75px] rounded-full bg-magnum-900;
    }

    .separator {
        @apply m-[5px] h-[1px] bg-magnum-200;
    }

    .rightSlot {
        @apply ml-auto pl-5;
    }

    .check {
        @apply absolute left-0 inline-flex w-6 items-center justify-center;
    }
    .text {
        @apply pl-6 text-xs leading-6 text-neutral-600;
    }
</style>
