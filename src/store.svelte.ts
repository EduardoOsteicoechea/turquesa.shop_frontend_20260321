
const baseRoute = "https://turquesa.shop/";

export const authState = $state({
  isValidating: false,
});

export const pageRoutes = {
   product_images_url: `${baseRoute}product/images`,
   login: `${baseRoute}api/login`,
   isAuthenticated: `${baseRoute}api/is-authenticated`,
   adminDashboard: `/admin-dashboard`,
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