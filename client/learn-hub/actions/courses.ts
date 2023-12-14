export const getAllCourses = async () => {
  try {
    const res = await fetch("http://localhost:3001/courses");
    const data: { message: string; courses: Course[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const getCourse = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}`);
    const data: { message: string; course: Course } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}`, {
      method: "DELETE",
    });
    const data: { message: string; courses: Course[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const getAllFinancialAids = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${id}/financialAids`,
    );
    const data: { message: string; financialAids: FinancialAid[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const deleteFinancialAid = async (
  course_id: string,
  student_id: string,
) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/financialAids/${student_id}`,
      {
        method: "DELETE",
      },
    );
    const data: { message: string; financialAids: FinancialAid[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const updateFinancialAid = async (
  course_id: string,
  student_id: string,
  status: string,
) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/financialAids/${student_id}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status: status,
        }),
        headers: new Headers({
          "content-type": "application/json",
        }),
        cache: "no-store",
      },
    );
    const data: { message: string; financialAids: FinancialAid[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
