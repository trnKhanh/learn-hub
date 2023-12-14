export const getUser = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/users/${id}`);
    const data: { message: string; user: User } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
