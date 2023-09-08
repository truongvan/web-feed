<script lang="ts">
    import { getIconImage } from "$lib/channel/get_icon_image";
    import { channelStore } from "$lib/channel/store";
    import type { Channel as ChannelInterface } from "$lib/channel/type";
    import { createChannel, updateChannel } from "$lib/query/channel";
    import { deleteFeedByChannel } from "$lib/query/feed";
    import { melt } from "@melt-ui/svelte";
    import { onMount } from "svelte";
    import type { Writable } from "svelte/store";

    export let channel: Omit<ChannelInterface, "id"> | ChannelInterface = {
        url: "",
        name: "",
        created_at: null,
        updated_at: null,
        iconPath: "",
        itemCount: 0,
        itemUnreadCount: 0,
    };
    export let open: Writable<boolean>;
    export let close;
    export let overlay;
    export let portalled;
    export let content;
    let name = "";
    let url = "";

    onMount(async () => {
        name = channel.name;
        url = channel.url;
    });

    async function saveChannel() {
        const urlIsChanged = channel.url != url;
        channel.name = name;
        channel.url = url;

        if ("id" in channel) {
            const channelInstance = await updateChannel({
                ...channel,
                iconPath: await getIconImage(channel.url),
            });

            if (urlIsChanged) {
                deleteFeedByChannel(channelInstance.id);
            }
        } else {
            const channelInstance = await createChannel({
                ...channel,
                iconPath: await getIconImage(channel.url),
            });
            if (channelInstance) {
                $channelStore = [...$channelStore, channelInstance];
            }
        }
    }
</script>

<div use:melt={$portalled}>
    {#if $open}
        <div
            use:melt={$overlay}
            class="fixed inset-0 z-50 bg-black/50" />
        <div
            class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
            max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white
            p-6 shadow-lg"
            use:melt={$content}>
            <fieldset class="mb-4 flex items-center gap-5">
                <label
                    class="w-[90px] text-right text-magnum-800"
                    for="name">
                    Name
                </label>
                <input
                    class="inline-flex h-8 w-full flex-1 items-center justify-center
                    rounded-sm border border-solid px-3 leading-none text-magnum-800"
                    id="name"
                    bind:value={name} />
            </fieldset>
            <fieldset class="mb-4 flex items-center gap-5">
                <label
                    class="w-[90px] text-right text-magnum-800"
                    for="url">
                    Url
                </label>
                <input
                    class="inline-flex h-8 w-full flex-1 items-center justify-center
                    rounded-sm border border-solid px-3 leading-none text-magnum-800"
                    id="url"
                    bind:value={url} />
            </fieldset>
            <div class="mt-6 flex justify-end gap-4">
                <button
                    use:melt={$close}
                    class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-zinc-100 px-4 font-medium leading-none text-zinc-600">
                    Cancel
                </button>
                <button
                    on:click={() => {
                        saveChannel();
                        $open = false;
                    }}
                    class="inline-flex h-8 items-center justify-center rounded-sm
                    bg-magnum-100 px-4 font-medium leading-none text-magnum-900">
                    {channel ? "Save" : "Add"}
                </button>
            </div>
        </div>
    {/if}
</div>
