"use client";

import { deleteSupporter, getAllSupporters } from "@/actions/supporters";
import { AdminItem } from "../_components/admin-item";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Supporters() {
  const [supporters, setSupporters] = useState<Supporter[]>();
  const [isDeleting, setIsDeleting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllSupporters().then((data) => {
      if (data) {
        if (!data.supporters) {
          router.push("/dashboard");
        }
        setSupporters((state) => data.supporters);
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

  if (supporters && !supporters.length)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no supporter</p>
      </div>
    );

  return (
    <div className="p-6 flex flex-col w-full space-y-6">
      {supporters &&
        supporters.map((supporter) => (
          <>
            {isDeleting === supporter.id ? (
              <div className="p-2 allign-center w-full text-slate-300">
                Deleting...
              </div>
            ) : (
              <div key={supporter.id}>
                <AdminItem
                  picture={supporter.profile_picture}
                  label={supporter.username}
                  onDelete={async () => {
                    setIsDeleting(supporter.id);
                    await deleteSupporter(supporter.id);
                    setIsDeleting("");
                  }}
                />
              </div>
            )}
          </>
        ))}
    </div>
  );
}
