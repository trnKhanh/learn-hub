"user client";

import { getUser } from "@/actions/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export const UserThumbnail = ({ user_id }: { user_id: string }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(user_id).then((res) => {
      console.log(res);
      if (res && res.status == 200) setUser(res.data.user);
    });
  }, []);

  return (
    <div className="flex space-x-6 items-center">
      <Avatar>
        <AvatarImage  src={user?.profile_picture} />
        <AvatarFallback className="bg-slate-500 uppercase text-white">{user?.username.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="">{user?.username}</div>
    </div>
  );
};
