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

    return data;
};