"use client";

import { deleteTutor, getAllTutors } from "@/actions/tutors";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InfoButton } from "../_components/info-button";
import {
  DashboardSectionHeader,
  DashboardSection,
  DashboardSectionContent,
  DashboardSectionItem,
  DashboardSectionItemLeft,
  DashboardSectionItemRight,
} from "../../_components/dashboard-section";
import { UserThumbnail } from "../../_components/user-thumbnail";
import { Trash2 } from "lucide-react";
import { notFound } from "next/navigation";
import { UserInfoTable } from "../_components/user-info-table";
import { TutorInfoDialog } from "./_components/tutor-info-dialog";
import { TutorDeleteDialog } from "./_components/tutor-delete-dialog";
import { TutorVerifyDialog } from "./_components/tutor-verify-dialog";
import { toast } from "react-toastify";

export default function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllTutors().then((res) => {
      if (res) {
        if (res.status == 200) {
          setTutors((state) => res.data.tutors);
          setIsLoading(false);
        } else {
          toast.error(res.data.message);
          router.push("/dashboard");
        }
      }
    });
  }, [isDeleting]);

  if (isLoading)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Loading...</p>
      </div>
    );

  if (tutors && !tutors.length) notFound();

  return (
    <DashboardSection>
      <DashboardSectionHeader>Tutors</DashboardSectionHeader>

      <DashboardSectionContent>
        {tutors &&
          tutors.map((tutor) => (
            <DashboardSectionItem key={tutor.id}>
              <DashboardSectionItemLeft>
                <UserThumbnail user_id={tutor.id} />
              </DashboardSectionItemLeft>

              <DashboardSectionItemRight>
                <TutorVerifyDialog tutor={tutor}/>
                <TutorInfoDialog tutor={tutor} />
                <TutorDeleteDialog
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  onDelete={async () => {
                    const res = await deleteTutor(tutor.id);
                    if (res && res.status != 200)
                      toast.error(res.data.message)
                  }}
                />
              </DashboardSectionItemRight>
            </DashboardSectionItem>
          ))}
      </DashboardSectionContent>
    </DashboardSection>
  );
}

