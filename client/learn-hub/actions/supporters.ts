export const getAllSupporters = async () => {
  try {
    const res = await fetch(`http://localhost:3001/supporters`, {
      credentials: "include",
    });
    const data: { message: string; supporters: Supporter[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
interface SupporterInfo {
  username?: string;
  role?: string;
}
export const createSupporter = async (info: SupporterInfo) => {
  try {
    const res = await fetch(`http://localhost:3001/supporters/`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(info),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const data: { message: string; supporters: Supporter[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const deleteSupporter = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/supporters/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    const data: { message: string; supporters: Supporter[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
