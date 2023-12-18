"use client";

import { deleteFinancialAid, getAllFinancialAids } from "@/actions/courses";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DashboardSectionHeader,
  DashboardSection,
  DashboardSectionContent,
  DashboardSectionItem,
  DashboardSectionItemLeft,
  DashboardSectionItemRight,
  DashboardSectionSubHeader,
} from "../../../../_components/dashboard-section";
import { UserThumbnail } from "../../../../_components/user-thumbnail";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import { FinancialAidVerifyDialog } from "./_components/financial-aid-verify-dialog";

export default function FinancialAids({
  params,
}: {
  params: {
    course_id: string;
  };
}) {
  const [financialAids, setFinancialAids] = useState<FinancialAid[]>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllFinancialAids(params.course_id).then((res) => {
      if (res) {
        if (res.status == 200) {
          setFinancialAids((state) => res.data.financialAids);
          setIsLoading(false);
        } else {
          toast.error(res.data.message);
          router.push(`/dashboard/admin/courses`);
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

  if (financialAids && !financialAids.length) {
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no financial aids</p>
      </div>
    );
  }

  return (
    <DashboardSection>
      <DashboardSectionSubHeader>FinancialAids</DashboardSectionSubHeader>

      <DashboardSectionContent>
        {financialAids &&
          financialAids.map((financialAid) => (
            <DashboardSectionItem key={financialAid.student_id}>
              <DashboardSectionItemLeft>
                <UserThumbnail user_id={financialAid.student_id} />
              </DashboardSectionItemLeft>

              <DashboardSectionItemRight>
                <FinancialAidVerifyDialog financialAid={financialAid} />
              </DashboardSectionItemRight>
            </DashboardSectionItem>
          ))}
      </DashboardSectionContent>
    </DashboardSection>
  );
}
