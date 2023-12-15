export const getAllCategories = async() => {
    try {
        const response = await fetch('http://localhost:3001/subjects');

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data: { message: string; subjects: Category[] } = await response.json();

        return data.subjects;
    } catch (error) {
        return [];
    }
}