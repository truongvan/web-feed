import { createIcon, getIconByName } from "$lib/query/icon";

export async function getIconImage(url: string, size: 64 | 128 = 64) {
    const urlInstance = new URL("/", url);
    const origin = urlInstance.origin;
    const name = urlInstance.hostname;
    let icon = await getIconByName(name);
    if (!icon) {
        const { invoke } = await import("@tauri-apps/api");
        let image_path = await invoke<string>("download_favicon", {
            url: origin,
            name,
            size,
        });

        icon = await createIcon({
            url: origin,
            name,
            size,
            image_path,
        });
    }

    return icon.image_path;
}
