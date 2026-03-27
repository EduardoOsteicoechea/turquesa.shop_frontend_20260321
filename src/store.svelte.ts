import { goto } from "$app/navigation";

const baseRoute = "https://turquesa.shop/";

export const pageRoutes = {
   product_images_url: `${baseRoute}product/images/`,
   // ADD THE DIRECT LINK TO YOUR S3 JSON FILE HERE:
   products_json: `${baseRoute}product/images/products.json`,
   login: `${baseRoute}api/login`,
   isAuthenticated: `${baseRoute}api/is-authenticated`,
   adminDashboard: `/admin-dashboard`,
   home: `/`,
   uploadProduct: `${baseRoute}api/upload-product`,
}

export const authState = $state({
   isValidating: false,
});

// --- TYPE DEFINITION FOR YOUR STORE ---
export interface Product {
   name: string;
   price: number;
   image_name: string;
}

// --- NEW STATIC FETCH FUNCTION ---
export const getStaticProducts = async (): Promise<Product[]> => {
   try {
      // Fetch directly from the static URL without credentials or CORS overhead
      const response = await fetch(pageRoutes.products_json, {
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         }
      });
      
      if (!response.ok) throw new Error("Failed to fetch static products");
      
      const data = await response.json();
      // Extract the array from the JSON structure
      return data.product_list || [];
   } catch (error) {
      console.error("Error reading products.json:", error);
      return []; // Return empty array so the UI doesn't crash on failure
   }
}

export interface BaseApiResponse {
   message?: string;
   error?: string;
}

export const post = async <T>(url: string, payload: any): Promise<T> => {
   return await request<T>(url, "POST", payload);
}

export const isAuthenticated = async (): Promise<boolean> => {
   try {
      authState.isValidating = true;

      const response = await request<BaseApiResponse>(pageRoutes.isAuthenticated, "GET");
      console.log(response)
      return !response.error;
   } catch (err) {
      console.error("Authentication check failed:", err);
      return false;
   } finally {
      authState.isValidating = false;
   }
}

async function request<T>(url: string, method: string, payload: any = null): Promise<T> {
   const options: RequestInit = {
      method: method,
      headers: {
         "Content-Type": "application/json",
      },
      // THIS TELLS FETCH TO SEND AND RECEIVE COOKIES
      credentials: "include"
   };

   // fetch will THROW AN ERROR if you attach a body to a GET request.
   // We only add the body if it's not a GET request and a payload exists.
   if (method !== "GET" && payload) {
      options.body = JSON.stringify(payload);
   }

   const response = await fetch(url, options);
   const data = await response.json();

   return data;
}

export function stringifyFormData(formData: FormData): string {
   let formDataString = "";

   for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
         // If it's a file, format its properties nicely
         formDataString += `${key}: File(name: "${value.name}", size: ${value.size} bytes, type: "${value.type}")\n`;
      } else {
         // If it's regular text/numbers, just add it directly
         formDataString += `${key}: ${value}\n`;
      }
   }

   return formDataString;
};

export async function postFormData(route: string, formData: FormData, successMessage: string, errorMessage: string) {
   try {
      const response = await fetch(route, {
         method: 'POST',
         body: formData
      });

      if (response.ok) {
         alert(successMessage);
      } else {
         alert(errorMessage);
      }
   } catch (error) {
      console.error("Error de red:", error);
   }
}