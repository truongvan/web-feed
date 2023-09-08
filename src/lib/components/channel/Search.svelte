<script lang="ts">
    async function handleClick(event: MouseEvent) {}
</script>

<button
    disabled
    class="btn btn-text"
    on:mousedown|stopPropagation|preventDefault
    on:click={handleClick}>
    <i class="bi bi-search"></i>
</button>
