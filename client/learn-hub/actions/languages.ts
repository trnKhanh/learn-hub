export const getAllLanguages = async () => {
  try {
    const res = await fetch("http://localhost:3001/languages", {
      credentials: "include",
    });
    const data: { message: string; languages: Language[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
