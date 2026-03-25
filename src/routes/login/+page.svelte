<script>
  import { goto } from "$app/navigation";
  import FormLogin from "$lib/components/form/FormLogin.svelte";
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
    <FormLogin />
  </div>
{/if}
