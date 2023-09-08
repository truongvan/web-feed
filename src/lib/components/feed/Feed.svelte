<script lang="ts">
    import { currentItemStore } from "$lib/feed/store";
    import dayjs from "dayjs";
    import relativeTime from "dayjs/plugin/relativeTime";
    import FeedHeader from "./FeedHeader.svelte";
    dayjs.extend(relativeTime);
</script>

<FeedHeader />

{#if $currentItemStore}
    <div class="flex flex-col h-full">
        <div
            class=" overflow-y-scroll flex-grow-1 h-full"
            style:--bs-link-color-rgb="var(--bs-danger-rgb)"
            style:--bs-link-hover-color-rgb="var(--bs-danger-rgb)">
            <div class="px-3">
                <p class="text-gray-500 mb-0">
                    {dayjs($currentItemStore.published).fromNow()}
                </p>
                <h1 class="">{$currentItemStore.title}</h1>
            </div>
            <div class="px-3 max-w-full wrap">
                {#if $currentItemStore.full_content}
                    {@const fullContent = JSON.parse(
                        $currentItemStore.full_content
                    )}
                    {@html fullContent.content}
                {:else}
                    {@html $currentItemStore.description}
                {/if}
            </div>
        </div>
    </div>
{/if}
