export const getAllCourses = async () => {
  try {
    const res = await fetch("http://localhost:3001/courses", {
      credentials: "include",
    });
    const data: { message: string; courses: Course[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
interface Filters {
  subjects: string[] | [];
  languages: string[] | [];
  courseName: string | "";
  difficulties: string[] | [];
  priceMax?: number;
  priceMin?: number;
}
export const searchCourses = async (filter: Filters) => {
  try {
    const res = await fetch(
      "http://localhost:3001/courses/search?" +
        new URLSearchParams({
          subjects: filter.subjects.join(","),
          languages: filter.languages.join(","),
          name: filter.courseName,
          difficulties: filter.difficulties.join(","),
          priceMax: `${filter.priceMax}`,
          priceMin: `${filter.priceMin}`,
        }),
      {
        credentials: "include",
      },
    );
    const data: { message: string; courses: Course[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const getCourse = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}`, {
      credentials: "include",
    });
    const data: { message: string; course: Course } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    const data: { message: string; courses: Course[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const getMineFinancialAid = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${id}/financialAids/mine`,
      {
        credentials: "include",
      },
    );
    const data: { message: string; financialAid: FinancialAid } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getAllFinancialAids = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${id}/financialAids`,
      { credentials: "include" },
    );
    const data: { message: string; financialAids: FinancialAid[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getAllFinancialAidsForTutor = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${id}/financialAids/tutor`,
      { credentials: "include" },
    );
    const data: { message: string; financialAids: FinancialAid[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const putFinancialAid = async (
  course_id: string,
  info: {
    essay: string;
    amount: number;
  },
) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/financialAids`,
      {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(info),
        headers: new Headers({
          "content-type": "application/json",
        }),
      },
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
        credentials: "include",
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
        credentials: "include",
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
export const getCart = async () => {
  try {
    const res = await fetch("http://localhost:3001/users/cart", {
      credentials: "include",
    });
    const data: { message: string; course_ids: { course_id: string }[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const removeCart = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/users/cart/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data: { message: string; course_ids: { course_id: string }[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
