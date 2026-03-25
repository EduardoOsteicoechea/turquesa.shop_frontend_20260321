<script>
  import Products from "$lib/components/dashboard/Products.svelte";
  import UploadProduct from "$lib/components/form/UploadProduct.svelte";
  import {
    authState,
    useAuthRedirect,
  } from "../../store.svelte";

  useAuthRedirect();
</script>

{#if authState.isValidating}{:else}
  <div class="page">
    <UploadProduct />
    <Products />
  </div>
{/if}

<style>
  .page {
    flex-direction: column;
    gap: 10px;
  }
</style>
