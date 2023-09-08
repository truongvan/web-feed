<script lang="ts">
    import { createEventDispatcher } from "svelte";

    let node: HTMLElement;
    let form: HTMLFormElement;

    const dispacher = createEventDispatcher();

    async function handleSubmit(event: SubmitEvent) {}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mousedown|stopPropagation
    bind:this={node}
    class="modal show d-block"
    tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <form
                bind:this={form}
                class="p-4"
                on:submit|preventDefault={handleSubmit}>
                <div class="form-floating mb-3">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        name="nameInput"
                        id="nameInput" />
                    <label for="nameInput">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input
                        type="url"
                        class="form-control"
                        placeholder="Url"
                        name="urlInput"
                        id="urlInput" />
                    <label for="urlInput">Url</label>
                </div>
                <div
                    class="flex justify-end gap-2 gap-4"
                    role="group">
                    <button
                        type="button"
                        class="btn btn-primary"
                        on:click={() => {
                            dispacher("close");
                        }}>
                        Close
                    </button>
                    <button
                        type="submit"
                        class="btn btn-secondary" />
                </div>
            </form>
        </div>
    </div>
</div>

<style>
    label {
        color: rgb(111, 113, 115);
    }
</style>
