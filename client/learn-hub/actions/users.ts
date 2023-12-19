import { z } from "zod";

export const getUser = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3001/users/${id}`, {
      credentials: "include",
    });
    const data: { message: string; user: User } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
interface UserInfo {
  full_name?: string;
  phone_number?: string;
  institute?: string;
  area_of_study?: string;
  biography?: string;
  date_of_birth?: Date;
  profile_picture?: File;
}

export const updateUser = async (info: UserInfo) => {
  try {
    const res = await fetch(`http://localhost:3001/users/`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(info),
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const data: { message: string; user: User[] } = await res.json();

    return { status: res.status, data: data };
  } catch (err) {
    console.error(err);
  }
};
