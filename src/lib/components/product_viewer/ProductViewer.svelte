<script lang="ts">
  import get from "$lib/api/get";
  import { pageRoutes } from "../../../store.svelte";

  interface Product {
    name: string;
    price: number;
    image_name: string;
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
        <div class="product_image">
          <img src="{pageRoutes.product_images_url}{item.image_name}" 
          height="100%"
          alt="{item.name} Image"
           />
        </div>
      </div>
    {/each}
  </section>
{:catch error}
  <p class="error">Error: {error.message}</p>
{/await}

<style>
  .product_image {
    height: 200px;
    width: 200px;
    overflow: hidden;
  }
</style>
