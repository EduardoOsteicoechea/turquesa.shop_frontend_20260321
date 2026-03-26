<script>
  import FormLogin from "$lib/components/form/FormLogin.svelte";
  import { authState, isAuthenticated, pageRoutes, useAuthRedirect } from "../../store.svelte";

  useAuthRedirect(pageRoutes.adminDashboard, pageRoutes.login, true);
</script>

{#if authState.isValidating}{:else}
  <div class="page">
    <FormLogin />
  </div>
{/if}

<style>
   .page{
      align-items: flex-start;
      padding: 30px;
   }
</style>
