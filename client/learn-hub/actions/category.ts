export const getSubjects = async () => {
  try {
    const response = await fetch("http://localhost:3001/subjects");

    const data: { message: string; subjects: Subject[] } =
      await response.json();

    return { status: response.status, data };
  } catch (error) {
    console.error(error);
  }
};
