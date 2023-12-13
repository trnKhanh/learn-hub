import toast, { Toaster } from "react-hot-toast";
export const getAllSupporters = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/supporters`, {
      headers: new Headers({
        accessToken: accessToken,
      }),
      cache: "no-store",
    });
    const data: { message: string; supporters: Supporter[] } = await res.json();
    if (res.status != 200) {
      toast.error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteSupporter = async (id: string) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) throw Error("Do not have accessToken");
    const res = await fetch(`http://localhost:3001/supporters/${id}`, {
      method: "DELETE",
      headers: new Headers({
        accessToken: accessToken,
      }),
      cache: "no-store",
    });
    const data: { message: string; supporters: Supporter[] } = await res.json();
    if (res.status != 200) {
      toast.error(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
