export const getAllSubjects = async () => {
  try {
    const res = await fetch("http://localhost:3001/subjects", {
      credentials: "include",
    });
    const data: { message: string; subjects: Subject[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
