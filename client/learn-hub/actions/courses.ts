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
    const res = await fetch(`http://localhost:3001/courses/${id}`);
    const data: { message: string; course: Course } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const getTutorList = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}/tutors`);
    const data: {
      message: string;
      tutor_list: { tutor_id: string; profit_rate: number }[];
    } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const getAllLessonsByCourseId = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}/lessons`);
    const data: { message: string; lessons: Lesson[] } = await res.json();

    return { status : res.status, data : data};
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const getCategoriesOfCourseId = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}/subjects`);
    const data: { message: string; subjects: Subject[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getLessons = async (course_id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/lessons`,
      { credentials: "include" },
    );
    const data: { message: string; lessons: Lesson[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getDocuments = async (course_id: string, lesson_id: string) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/lessons/${lesson_id}/documents`,
      { credentials: "include" },
    );
    const data: { message: string; documents: CourseDocument[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

// export const getVideo = async (course_id: string, lesson_id: string) => {
//   try {
//     const res = await fetch(
//       `http://localhost:3001/courses/${course_id}/lessons/${lesson_id}/videos`,
//     );
//     const data: { message: string; video: VideoData } = await res.json();

//     return { status: res.status, data: data };
//   } catch (err) {
//     console.error(err);
//   }
// };

export const updateCourse = async (id: string | undefined, attribute: any) => {
  console.log(id);
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify(attribute),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const data: { message: string; courses: Course[] } = await res.json();

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
    const data: {
      message: string;
      course_ids: { course_id: string }[];
      total_money: number;
    } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const addCart = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/users/cart/${id}`, {
      method: "POST",
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

export const createPayment = async () => {
  try {
    const res = await fetch(`http://localhost:3001/users/payments/`, {
      method: "POST",
      credentials: "include",
    });
    const data: { message: string } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
