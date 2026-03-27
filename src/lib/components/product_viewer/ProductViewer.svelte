<script lang="ts">
    import { getStaticProducts, pageRoutes, type Product } from "../../../store.svelte"

    let products = $state<Product[]>([]);
    let isLoading = $state(true);
    let errorMessage = $state("");

    $effect(() => {
        const loadProducts = async () => {
            try {
                products = await getStaticProducts();
            } catch (error) {
                errorMessage = "No se pudieron cargar los productos. Intenta de nuevo más tarde.";
            } finally {
                isLoading = false;
            }
        };

        loadProducts();
    });
</script>

<div class="store-container">
    {#if isLoading}
        <p class="status-msg">Cargando catálogo...</p>
    {:else if errorMessage}
        <p class="status-msg error">{errorMessage}</p>
    {:else if products.length === 0}
        <p class="status-msg">No hay productos disponibles en este momento.</p>
    {:else}
        <div class="product-grid">
            {#each products as product}
                <div class="product-card">
                    <img 
                        src={`${pageRoutes.product_images_url}${product.image_name}`} 
                        alt={product.name} 
                        loading="lazy" 
                    />
                    
                    <div class="product-info">
                        <h3>{product.name}</h3>
                        <p class="price">${product.price}</p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .store-container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .status-msg {
        text-align: center;
        font-size: 1.2rem;
        color: #666;
    }

    .error {
        color: #d9534f;
    }

    .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
    }

    .product-card {
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }

    .product-card:hover {
        transform: translateY(-4px);
    }

    .product-card img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        display: block;
    }

    .product-info {
        padding: 1.5rem;
        text-align: center;
    }

    .product-info h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
        color: #333;
    }

    .price {
        margin: 0;
        font-weight: bold;
        font-size: 1.1rem;
        color: #007bff; /* Adjust to match your Turquesa theme */
    }
</style>