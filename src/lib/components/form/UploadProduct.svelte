<script lang="ts">
  // 1. We store objects now instead of strings. 
  // Each input gets a unique ID, a place for the File, and a preview URL.
  let imagesToLoad = $state([
    { id: crypto.randomUUID(), file: null, previewUrl: "" }
  ]);

  // 2. $derived automatically recalculates. 
  // It checks if EVERY item in the array has a file attached.
  let canAddNew = $derived(imagesToLoad.every(img => img.file !== null));

  const handleAddImagenToLoad = () => {
    // Only allow adding if all current inputs have files
    if (canAddNew) {
      imagesToLoad.push({ id: crypto.randomUUID(), file: null, previewUrl: "" });
    }
  };

  // 3. We pass the exact ID to the remove function
  const handleRemoveImagenToLoad = (idToRemove:string) => {
    // Best practice: free up browser memory by revoking the old URL
    const item = imagesToLoad.find(img => img.id === idToRemove);
    if (item && item.previewUrl) {
      URL.revokeObjectURL(item.previewUrl);
    }

    // Filter out the one we want to delete
    imagesToLoad = imagesToLoad.filter(img => img.id !== idToRemove);
  };

  // 4. Handle the file input change
  const handleFileChange = (event:any, id:string) => {
    const file = event.target.files[0];
    if (!file) return;

    // Find the specific image object in our state
    const index = imagesToLoad.findIndex(img => img.id === id);
    if (index !== -1) {
      // Create a temporary local URL so the <img> tag can display it
      imagesToLoad[index].file = file;
      imagesToLoad[index].previewUrl = URL.createObjectURL(file);
    }
  };
</script>

<div class="outer_container">
  <h2>Añadir</h2>

  <div class="form_single_input_item_container">
    <label for="">Nombre</label>
    <input type="text" />
  </div>

  <div class="form_single_input_item_container">
    <label for="">Precio en Bolívares</label>
    <input type="number" />
  </div>

  <div class="form_single_input_item_container">
    <label for="">Precio en dólares físicos</label>
    <input type="number" />
  </div>

  <div class="form_single_input_item_container">
    <label for="">Unidades</label>
    <input type="number" />
  </div>

  <div class="form_single_input_item_container">
    <label for="">Mostrar en galería</label>
    <input type="checkbox" />
  </div>

  <div>
    <label for="">Imágenes</label>
    <div>
      <button onclick={handleAddImagenToLoad} disabled={!canAddNew}> + </button>
    </div>
    
    <div class="images_to_load_container">
      {#each imagesToLoad as imageToLoad (imageToLoad.id)}
        <div class="single_image_to_load_container">
          <div class="single_image_to_load_container_input_and_remove_button_container">
            
            <input 
              type="file" 
              accept=".webp" 
              onchange={(e) => handleFileChange(e, imageToLoad.id)} 
            />
            
            <button onclick={() => handleRemoveImagenToLoad(imageToLoad.id)}> - </button>
          </div>

          <div class="single_image_to_load_container_loaded_image_container">
            {#if imageToLoad.previewUrl}
              <img src={imageToLoad.previewUrl} alt="Preview" style="max-width: 100px; max-height: 100px;" />
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .outer_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    border: var(--border_02);
  }
  .form_single_input_item_container {
    display: flex;
  }
  .form_single_input_item_container * {
    height: 30px;
  }
  .form_single_input_item_container label {
    width: 50%;
  }
  .images_to_load_container {
    display: flex;
    /* flex-direction: column; */
    gap: 5px;
    margin-top: 10px;
  }
  .single_image_to_load_container {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 4px;
  }
  .single_image_to_load_container_input_and_remove_button_container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    max-width: 300px;
  }
</style>