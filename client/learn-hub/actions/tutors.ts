export const createTutor = async (file: File) => {
  try {
    const formdata = new FormData();
    formdata.append("cv", file);
    const res = await fetch(`http://localhost:3001/tutors/`, {
      method: "POST",
      credentials: "include",
      body: formdata,
    });

    const data: { message: string; tutor: Tutor } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getMineTutor = async () => {
  try {
    const res = await fetch(`http://localhost:3001/tutors/mine`, {
      credentials: "include",
    });
    const data: { message: string; tutor: Tutor } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getAllTutors = async () => {
  try {
    const res = await fetch(`http://localhost:3001/tutors`, {
      credentials: "include",
    });
    const data: { message: string; tutors: Tutor[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getTutor = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/tutors/${id}`, {
      //credentials: "include",
    });
    const data: { message: string; tutor: Tutor } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};

export const getCoursesOfTutor = async (id: string | undefined) => {
  try {
    const res = await fetch(`http://localhost:3001/tutors/${id}/courses`);
    const data : { message: string; courses: Course[] } = await res.json();
    return { status: res.status, data: data};
  } catch (err) {
    console.error(err);
  }
}

export const deleteTutor = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/tutors/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    const data: { message: string; tutors: Tutor[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const putTutorCV = async (file: File) => {
  try {
    const formdata = new FormData();
    formdata.append("cv", file);
    const res = await fetch(`http://localhost:3001/tutors/cvs/`, {
      method: "PUT",
      credentials: "include",
      body: formdata,
    });

    const data: { message: string; tutorCV: TutorCV } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getMineTutorCV = async () => {
  try {
    const res = await fetch(`http://localhost:3001/tutors/cvs/mine`, {
      credentials: "include",
    });
    const data: { message: string; tutorCV: TutorCV } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getTutorCV = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/tutors/cvs/${id}`, {
      credentials: "include",
    });

    const data: { message: string; tutorCV: TutorCV } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const updateTutorCV = async (id: string, status: string) => {
  try {
    const res = await fetch(`http://localhost:3001/tutors/cvs/${id}`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        status: status,
      }),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const data: { message: string; tutorCVs: TutorCV[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
