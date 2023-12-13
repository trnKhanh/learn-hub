import toast, { Toaster } from "react-hot-toast";
export const getAllTutors = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/tutors`, {
      headers: new Headers({
        accessToken: accessToken,
      }),
      cache: "no-store",
    });
    const data: { message: string; tutors: Tutor[] } = await res.json();
    if (res.status != 200) {
      toast.error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteTutor = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/tutors/${id}`, {
      method: "DELETE",
      headers: new Headers({
        accessToken: accessToken,
      }),
      cache: "no-store",
    });
    const data: { message: string; tutors: Tutor[] } = await res.json();
    if (res.status != 200) {
      toast.error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getTutorCV = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/tutors/cvs/${id}`, {
      headers: new Headers({
        accessToken: accessToken,
      }),
      cache: "no-store",
    });
    const data: { message: string; tutorCV: TutorCV } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const updateTutorCV = async (id: string, status: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/tutors/cvs/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: status,
      }),
      headers: new Headers({
        accessToken: accessToken,
        'content-type': 'application/json'
      }),
      cache: "no-store",
    });
    const data: { message: string; tutorCV: TutorCV } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
