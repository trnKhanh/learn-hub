export const updateDocument = async (
  course_id: string | undefined,
  lesson_id: string | undefined,
  document_id: string | undefined,
  attribute: any,
) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/lessons/${lesson_id}/documents/${document_id}`,
      {
        credentials: "include",
        method: "PATCH",
        body: JSON.stringify(attribute),
        headers: new Headers({
          "content-type": "application/json",
        }),
      },
    );
    const data: { message: string; document: CourseDocument } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const createDocument = async (
  course_id: string | undefined,
  lesson_id: string | undefined,
  attribute: any,
) => {
  console.log(`createDocument: ${course_id}, ${lesson_id}`);
  console.log(attribute);
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/lessons/${lesson_id}/documents/`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(attribute),
        headers: new Headers({
          "content-type": "application/json",
        }),
      },
    );
    const data: { message: string; document: CourseDocument } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteDocument = async (
  course_id: string | undefined,
  lesson_id: string | undefined,
  document_id: string | undefined,
) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/lessons/${lesson_id}/documents/${document_id}`,
      {
        credentials: "include",
        method: "DELETE",
      },
    );
    return { status: res.status };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAllDocuments = async (
  course_id: string | undefined,
  lesson_id: string | undefined,
) => {
  try {
    const res = await fetch(
      `http://localhost:3001/courses/${course_id}/lessons/${lesson_id}/documents/`,
      {
        credentials: "include",
        method: "GET",
      },
    );
    const data: { message: string; documents: CourseDocument[] } =
      await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
    return null;
  }
};
