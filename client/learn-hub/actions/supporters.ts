export const getAllSupporters = async () => {
  try {
    const res = await fetch(`http://localhost:3001/supporters`);
    const data: { message: string; supporters: Supporter[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
export const deleteSupporter = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/supporters/${id}`, {
      method: "DELETE",
    });
    const data: { message: string; supporters: Supporter[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
