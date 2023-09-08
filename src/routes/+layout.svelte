<script lang="ts">
    import "bootstrap-icons/font/bootstrap-icons.css";
    import "./app.css";
    import SideBar from "$lib/components/sidebar/SideBar.svelte";
</script>

<div class="flex h-screen w-screen">
    <SideBar --sidebar-width="280px" />
    <slot />
</div>
