<script lang="ts">
  import get from "$lib/api/get";

  interface Product {
    name: string;
    price: number;
  }

  interface Products {
    product_list: Product[];
  }

  let { route } = $props<{ route: string }>();

  // Clean type casting!
  const productsPromise = $derived(get(route) as Promise<Products>);
</script>

{#await productsPromise}
  <div class="loading">Fetching from Lambda...</div>
{:then products}
  <section class="grid">
    {#each products.product_list as item}
      <div class="card">
        <h3>{item.name}</h3>
        <span>{item.price} USD</span>
      </div>
    {/each}
  </section>
{:catch error}
  <p class="error">Error: {error.message}</p>
{/await}