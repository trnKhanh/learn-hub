export const getAllAdmins = async () => {
  try {
    const res = await fetch(`http://localhost:3001/admins`, {
      credentials: "include",
    });
    const data: { message: string; admins: Admin[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const getMineAdmin = async () => {
  try {
    const res = await fetch(`http://localhost:3001/admins/mine`, {
      credentials: "include",
    });
    const data: { message: string; admin: Admin } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const deleteAdmin = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/admins/${id}`, {
      credentials: "include",
      method: "DELETE",
    });
    const data: { message: string; admins: Admin[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
