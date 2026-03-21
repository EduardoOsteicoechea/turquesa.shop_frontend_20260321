<script lang="ts">
  import get from "$lib/api/get";

 

  let { route } = $props<{ route: string }>();

  const productsPromise: Promise<Product[]> | any = $derived(get(route));
</script>

{#await productsPromise}
  <div class="loading">Fetching from Lambda...</div>
{:then products}
  <section class="grid">
    {#each products as item}
      <div class="card">
        <h3>{item.name}</h3>
        <span>{item.price} USD</span>
      </div>
    {/each}
  </section>
{:catch error}
  <p class="error">{error.message}</p>
{/await}