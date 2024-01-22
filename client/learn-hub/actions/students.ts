export const getAllStudents = async () => {
  try {
    const res = await fetch(`http://localhost:3001/students`, {
      credentials: "include",
    });
    const data: { message: string; students: Student[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getStudent = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/students/${id}`, {
      credentials: "include",
    });
    const data: { message: string; student: Student } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getRegisteredCourses = async () => {
  try {
    const res = await fetch(`http://localhost:3001/students/courses`, {
      credentials: "include",
    });
    const data: { message: string; courses: Course[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getRegistered = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/students/${id}`, {
      credentials: "include",
    });
    const data: { message: string; student: Student } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const deleteStudent = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/students/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    const data: { message: string; students: Student[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
