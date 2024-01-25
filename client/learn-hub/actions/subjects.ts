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

export const getSubjectByCourseId = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}/subjects`);
    const data: { message: string; subjects: Subject[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateSubjectOfCourseId = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}/subjects`, {
      credentials: "include",
      method: "PUT",
    });
    const data: { message: string; subjects: Subject[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
    return null;
  }
};
