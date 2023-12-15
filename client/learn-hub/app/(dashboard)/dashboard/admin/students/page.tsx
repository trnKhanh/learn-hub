"use client";

import { deleteStudent, getAllStudents } from "@/actions/students";
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
import { StudentDeleteDialog } from "./_components/student-delete-dialog";
import { notFound } from "next/navigation";
import { UserInfoTable } from "../_components/user-info-table";
import { StudentInfoDialog } from "./_components/student-info-dialog";
import { toast } from "react-toastify";

export default function Students() {
  const [students, setStudents] = useState<Student[]>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllStudents().then((res) => {
      if (res) {
        if (res.status == 200) {
          setStudents((state) => res.data.students);
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

  if (students && !students.length) notFound();

  return (
    <DashboardSection>
      <DashboardSectionHeader>Students</DashboardSectionHeader>

      <DashboardSectionContent>
        {students &&
          students.map((student) => (
            <DashboardSectionItem key={student.id}>
              <DashboardSectionItemLeft>
                <UserThumbnail user_id={student.id} />
              </DashboardSectionItemLeft>

              <DashboardSectionItemRight>
                <StudentInfoDialog student={student} />
                <StudentDeleteDialog
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  onDelete={async () => {
                    const res = await deleteStudent(student.id);
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
