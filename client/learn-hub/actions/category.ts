export const getAllCategories = async() => {
    try {
        const response = await fetch('http://localhost:3001/subjects');

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data: { message: string; subjects: Subject[] } = await response.json();

        return data.subjects;
    } catch (error) {
        return [];
    }
}

export const getCategoriesOfCourseId = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3001/courses/${id}/subjects`);
        const data: { message: string; subjects: Subject[] } = await res.json();
        
        return { status : res.status, data : data};
    } catch (err) {
        console.error(err);
        return null;
    }
}

export const updateCategoriesOfCourseId = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3001/courses/${id}/subjects`, {
            credentials: "include",
            method: "PUT",
        });
        const data: { message: string; subjects: Subject[] } = await res.json();

        return { status : res.status, data : data};
    } catch (err) {
        console.error(err);
        return null;
    }
}