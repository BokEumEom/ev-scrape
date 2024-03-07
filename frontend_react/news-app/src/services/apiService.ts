// src/services/apiService.ts
export const fetchNewsItems = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit; // Calculate the correct skip value
    const url = `http://localhost:8000/news?skip=${skip}&limit=${limit}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch news items:", error);
        throw error;
    }
};
