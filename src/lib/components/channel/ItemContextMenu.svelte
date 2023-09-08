<script lang="ts">
    import { createEventDispatcher } from "svelte";

    let node: HTMLElement;

    const dispacher = createEventDispatcher();

    function handleDisparcher(name: string) {
        dispacher(name);
    }
</script>

{#if false}
    <div bind:this={node}>
        <ul class="dropdown-menu show">
            <li>
                <input
                    on:click={() => {
                        handleDisparcher("hide");
                    }}
                    type="button"
                    value="Hide"
                    class="dropdown-item fs-6" />
            </li>
        </ul>
    </div>
{/if}
