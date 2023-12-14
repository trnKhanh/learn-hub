import toast, { Toaster } from "react-hot-toast";
export const getAllCourses = async () => {
  try {
    const res = await fetch("http://localhost:3001/courses", {
      cache: "no-store",
    });
    const data: { message: string; courses: Course[] } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const getCourse = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/courses/${id}`, {
      cache: "no-store",
    });
    const data: { message: string; course: Course} = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCourse = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/courses/${id}`, {
      method: "DELETE",
      headers: new Headers({
        accessToken: accessToken,
      }),
      cache: "no-store",
    });
    const data: { message: string; courses: Course[] } = await res.json();
    if (res.status != 200) {
      toast.error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllFinancialAids = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/courses/${id}/financialAids`, {
      headers: new Headers({
        accessToken: accessToken,
      }),
      cache: "no-store",
    });
    const data: { message: string; financialAids: FinancialAid[] } = await res.json();
    if (res.status != 200) {
      toast.error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteFinancialAid = async (course_id: string, student_id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/courses/${course_id}/financialAids/${student_id}`, {
      method: "DELETE",
      headers: new Headers({
        accessToken: accessToken,
      }),
      cache: "no-store",
    });
    const data: { message: string; financialAids: FinancialAid[] } = await res.json();
    if (res.status != 200) {
      toast.error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateFinancialAid = async (course_id: string, student_id: string, status: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/courses/${course_id}/financialAids/${student_id}`, {
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
    const data: { message: string; financialAids: FinancialAid[] } = await res.json();
    console.log(data);
    if (res.status != 200) {
      toast.error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
