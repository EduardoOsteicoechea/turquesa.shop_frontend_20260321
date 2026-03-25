<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    post,
    pageRoutes,
    type BaseApiResponse,
  } from "../../../store.svelte";

  let email = $state("");
  let password = $state("");
  let isAwaitingApiResponse = $state(false);

  const handleSubmit = async () => {
    isAwaitingApiResponse = true;

    const response = await post<BaseApiResponse>(pageRoutes.login, {
      email: email,
      code: password,
    });

    if (response) {
      if (response.error) {
        alert(`Error: ${response.error}`);
      } else {
        alert(`¡Éxito! ${response.message}`);
        goto(pageRoutes.adminDashboard);
      }
    } else {
      alert("Solicitud fallida. No se recibió respuesta del servidor.");
    }

    isAwaitingApiResponse = false;
  };
</script>

<div class="overlay {isAwaitingApiResponse ? 'visible' : ''}"></div>
<div class="outer_container column_container">
  <div class="header">
    <h1>Inicia Sesión</h1>
  </div>

  <div id="email_form_input_group_container" class="form_input_group_container">
    <label for="email_input">@</label>
    <input bind:value={email} id="email_input" type="text" />
  </div>

  <div
    id="password_form_input_group_container"
    class="form_input_group_container"
  >
    <label for="email_input">*</label>
    <input bind:value={password} id="password_input" type="password" />
  </div>

  <button
    class="submit_button"
    disabled={isAwaitingApiResponse}
    onclick={handleSubmit}
  >
    Acceder
  </button>
</div>

<style>
  .outer_container {
    border: solid 1px var(--brand_accent_02);
    width: 200px;
    border: var(--border_02);
    /* padding: 20px 10px; */
    box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.05);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    text-align: center;
  }

  .header h1 {
    font-size: 18px;
  }

  .form_input_group_container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    border-top: solid 1px #b49da3 !important;
  }

  #password_form_input_group_container {
    border-bottom: solid 1px #b49da3 !important;
  }

  .form_input_group_container * {
    width: 100%;
    background: #fffced;
    height: 100%;
  }

  .form_input_group_container > label {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700 !important;
    font-size: 14px;
    font-weight: 600 !important;
    width: 50px;
  }

  .form_input_group_container input {
    display: flex;
    outline: none;
    padding: 0 0 0 10px;
    border-left: solid 1px #b49da3 !important;
    background: #fff;
  }

  .submit_button {
    width: 100%;
    border-radius: 0;
    border: none;
    background: var(--brand_accent_green_01);
    color: #fff;
    height: 50px;
    font-weight: 600;
    /* margin: 30px 0 0 0; */
  }

  .submit_button:hover {
    background: var(--brand_background_01);
    color: #000000;
    box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: all ease 500ms;
    background: rgba(255, 255, 255, 0);
    backdrop-filter: blur(0px);
    /* Adding the -webkit prefix ensures it works perfectly on Safari */
    -webkit-backdrop-filter: blur(0px);
  }
  .overlay.visible {
    z-index: 10000;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    /* Adding the -webkit prefix ensures it works perfectly on Safari */
    -webkit-backdrop-filter: blur(5px);
  }
</style>
