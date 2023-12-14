"use client";

import { deleteTutor, getAllTutors } from "@/actions/tutors";
import { AdminItem } from "../_components/admin-item";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TutorVerifyButton } from "./_components/tutor-verify-button";
import { TutorInfoTable } from "./_components/tutor-info-table";
import { InfoButton } from "../_components/info-button";

export default function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>();
  const [isDeleting, setIsDeleting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllTutors().then((data) => {
      if (data) {
        if (!data.tutors) {
          router.push("/dashboard");
        }
        setTutors((state) => data.tutors);
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

  if (tutors && !tutors.length)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no tutors</p>
      </div>
    );

  return (
    <div className="flex flex-col space-x-6">
      <p className="text-2xl pl-6 pt-6 font-bold">Tutors</p>
      <div className="p-6 flex flex-col w-full space-y-6">
        {tutors &&
          tutors.map((tutor) => (
            <>
              {isDeleting === tutor.id ? (
                <div className="p-2 allign-center w-full text-slate-300">
                  Deleting...
                </div>
              ) : (
                <div key={tutor.id}>
                  <AdminItem
                    picture={tutor.profile_picture}
                    label={tutor.username}
                    onDelete={async () => {
                      setIsDeleting(tutor.id);
                      await deleteTutor(tutor.id);
                      setIsDeleting("");
                    }}
                    buttons={
                      <div className="flex space-x-2">
                        <TutorVerifyButton tutor={tutor} />
                        <InfoButton
                          label="Tutor"
                          infoTable={<TutorInfoTable tutor={tutor} />}
                        />
                      </div>
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
