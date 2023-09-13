<script lang="ts">
    import { currentItemStore, feedStore } from "$lib/feed/store";
    import { updateItem } from "$lib/query/item";
    import { invoke } from "@tauri-apps/api";
    let haveFull = false;

    $: if ($currentItemStore) {
        console.log($currentItemStore);

        haveFull = !$currentItemStore.full_content;
    }

    async function handleClick(event: MouseEvent) {
        if (document) {
            const { extractFromHtml } = await import(
                "@extractus/article-extractor"
            );
            const { getSanitizeHtmlOptions, setSanitizeHtmlOptions } =
                await import("@extractus/article-extractor");

            // Removing iframe
            const sanitizeHtmlOptions = getSanitizeHtmlOptions();
            console.log(sanitizeHtmlOptions);
            sanitizeHtmlOptions.allowedTags =
                sanitizeHtmlOptions.allowedTags.filter(
                    (tag: string) => tag !== "iframe"
                );
            setSanitizeHtmlOptions(sanitizeHtmlOptions);

            if ($currentItemStore) {
                const text = await invoke<string>("get_article", {
                    url: $currentItemStore.link,
                });

                const article = await extractFromHtml(
                    text,
                    $currentItemStore.link
                );

                if (article && $feedStore) {
                    const a = {
                        url: article.url,
                        title: article.title,
                        description: article.description,
                        links: article.links,
                        image: article.image,
                        content: article.content,
                        author: article.author,
                        favicon: article.favicon,
                        source: article.source,
                        published: article.published
                            ? new Date(article.published).getTime()
                            : Date.now(),
                        ttr: article.ttr,
                    };
                    const item = {
                        ...$currentItemStore,
                    };
                    item.full_content = JSON.stringify(a);

                    await updateItem(item);

                    $feedStore = $feedStore;
                    $currentItemStore = {
                        ...$currentItemStore,
                        ...item,
                    };
                }
            }
        }
    }
</script>

{#if haveFull}
    <button
        class="w-6 h-6 hover:bg-magnum-400 active:bg-magnum-600 rounded hover:text-white"
        on:mousedown|stopPropagation|preventDefault
        on:click={handleClick}>
        <i class="bi bi-cloud-arrow-down" />
    </button>
{/if}
