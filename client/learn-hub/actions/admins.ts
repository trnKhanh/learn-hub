export const getAllAdmins = async () => {
  try {
    const res = await fetch(`http://localhost:3001/admins`);
    const data: { message: string; admins: Admin[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const deleteAdmin = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/admins/${id}`, {
      method: "DELETE",
    });
    const data: { message: string; admins: Admin[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};