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
