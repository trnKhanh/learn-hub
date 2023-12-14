"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteFinancialAid, getAllFinancialAids } from "@/actions/courses";
import { getStudent } from "@/actions/students";
import { AdminItem } from "../../../_components/admin-item";
import { InfoButton } from "../../../_components/info-button";
import { FinancialAidVerifyButton } from "./_components/financial-aid-verify-button";

export default function FinancialAids({
  params,
}: {
  params: {
    course_id: string;
  };
}) {
  const [financialAids, setFinancialAids] = useState<FinancialAid[]>();
  const [isDeleting, setIsDeleting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllFinancialAids(params.course_id).then((data) => {
      if (data) {
        if (!data.financialAids) {
          router.push("/dashboard");
        }
        setFinancialAids(data.financialAids);
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

  if (financialAids && !financialAids.length)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no financial aid</p>
      </div>
    );
  return (
    <div className="flex flex-col space-x-6">
      <p className="text-xl pl-6 pt-2 font-bold">Financial Aids</p>
      <div className="p-6 flex flex-col w-full space-y-6">
        {financialAids &&
          financialAids.map((financialAid) => {
            return (
              <>
                {isDeleting === financialAid.student_id ? (
                  <div className="p-2 allign-center w-full text-slate-300">
                    Deleting...
                  </div>
                ) : (
                  <div key={financialAid.student_id}>
                    <AdminItem
                      picture={financialAid.student_id}
                      label={financialAid.username}
                      buttons={
                        <FinancialAidVerifyButton financialAid={financialAid} />
                      }
                    />
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
