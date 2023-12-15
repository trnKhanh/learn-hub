export const getCourses = async () => {
  try {
    const response = await fetch("http://localhost:4000/courses", {
      credentials: "include",
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    return [];
  }
};
