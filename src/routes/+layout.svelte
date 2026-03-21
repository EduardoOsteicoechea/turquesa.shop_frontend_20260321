<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Tuquesa - Tienda en Línea</title>
</svelte:head>

{@render children()}
