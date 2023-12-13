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
