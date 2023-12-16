"use client";

import { deleteSupporter, getAllSupporters } from "@/actions/supporters";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { SupporterDeleteDialog } from "./_components/supporter-delete-dialog";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import { SupporterInfoDialog } from "./_components/supporter-info-dialog";

export default function Supporters() {
  const [supporters, setSupporters] = useState<Supporter[]>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllSupporters().then((res) => {
      if (res) {
        if (res.status == 200) {
          setSupporters((state) => res.data.supporters);
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

  if (supporters && !supporters.length) {
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no supporters</p>
      </div>
    );
  }

  return (
    <DashboardSection>
      <DashboardSectionHeader>Supporters</DashboardSectionHeader>

      <DashboardSectionContent>
        {supporters &&
          supporters.map((supporter) => (
            <DashboardSectionItem key={supporter.id}>
              <DashboardSectionItemLeft>
                <UserThumbnail user_id={supporter.id} />
              </DashboardSectionItemLeft>

              <DashboardSectionItemRight>
                <SupporterInfoDialog supporter={supporter} />
                <SupporterDeleteDialog
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  onDelete={async () => {
                    const res = await deleteSupporter(supporter.id);
                    if (res && res.status != 200) toast.error(res.data.message);
                  }}
                />
              </DashboardSectionItemRight>
            </DashboardSectionItem>
          ))}
      </DashboardSectionContent>
    </DashboardSection>
  );
}
