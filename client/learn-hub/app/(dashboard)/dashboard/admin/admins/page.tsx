"use client";

import { deleteAdmin, getAllAdmins } from "@/actions/admins";
import { AdminItem } from "../_components/admin-item";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminInfoTable } from "./_components/admin-info-table";
import { InfoButton } from "../_components/info-button";

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>();
  const [isDeleting, setIsDeleting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllAdmins().then((data) => {
      if (data) {
        if (!data.admins) {
          router.push("/dashboard");
        }
        setAdmins((state) => data.admins);
        setIsLoading(false);
      }
    });
  }, [isDeleting]);

  if (isLoading)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Loading...</p>
      </div>
    );

  if (admins && !admins.length)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no admins</p>
      </div>
    );

  console.log(admins);
  return (
    <div className="flex flex-col space-x-6">
      <p className="text-2xl pl-6 pt-6 font-bold">Admins</p>
      <div className="p-6 flex flex-col w-full space-y-6">
        {admins &&
          admins.map((admin) => (
            <>
              {isDeleting === admin.id ? (
                <div className="p-2 allign-center w-full text-slate-300">
                  Deleting...
                </div>
              ) : (
                <div key={admin.id}>
                  <AdminItem
                    picture={admin.profile_picture}
                    label={admin.username}
                    onDelete={async () => {
                      setIsDeleting(admin.id);
                      await deleteAdmin(admin.id);
                      setIsDeleting("");
                    }}
                    buttons={
                      <InfoButton
                        label="Admin"
                        infoTable={<AdminInfoTable admin={admin} />}
                      />
                    }
                  />
                </div>
              )}
            </>
          ))}
      </div>
    </div>
  );
}
