"use client";

import { deleteStudent, getAllStudents } from "@/actions/students";
import { AdminItem } from "../_components/admin-item";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StudentInfoTable } from "./_components/student-info-table";
import { InfoButton } from "../_components/info-button";

export default function Students() {
  const [students, setStudents] = useState<Student[]>();
  const [isDeleting, setIsDeleting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllStudents().then((data) => {
      if (data) {
        if (!data.students) {
          router.push("/dashboard");
        }
        setStudents((state) => data.students);
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

  if (students && !students.length)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no students</p>
      </div>
    );

  return (
    <div className="flex flex-col space-x-6">
      <p className="text-2xl pl-6 pt-6 font-bold">Students</p>
      <div className="p-6 flex flex-col w-full space-y-6">
        {students &&
          students.map((student) => (
            <>
              {isDeleting === student.id ? (
                <div className="p-2 allign-center w-full text-slate-300">
                  Deleting...
                </div>
              ) : (
                <div key={student.id}>
                  <AdminItem
                    picture={student.profile_picture}
                    label={student.username}
                    onDelete={async () => {
                      setIsDeleting(student.id);
                      await deleteStudent(student.id);
                      setIsDeleting("");
                    }}
                    buttons={
                      <InfoButton
                        label="Student"
                        infoTable={<StudentInfoTable student={student} />}
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
