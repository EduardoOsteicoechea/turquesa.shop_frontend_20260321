export default async (route: string) => {
    const response = await fetch(route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `API Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    const response2 = await fetch("https://turquesa.shop/product/images", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `API Error: ${response.status}`);
    }

    const data2 = await response.json();

    console.log(data2);

    return data;
};