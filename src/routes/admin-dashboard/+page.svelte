<script>
  import Products from "$lib/components/dashboard/Products.svelte";
  import UploadProduct from "$lib/components/form/UploadProduct.svelte";
  import { goto } from "$app/navigation";
  import { authState, isAuthenticated, pageRoutes } from "../../store.svelte";

  $effect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      if (isAuth) {
        goto(pageRoutes.adminDashboard);
      }
    };

    checkAuth();
  });
</script>

{#if authState.isValidating}{:else}
  <div class="page">
    <UploadProduct />
    <Products />
  </div>
{/if}

<style>
   .page{
      flex-direction: column;
      gap: 10px;
   }
</style>