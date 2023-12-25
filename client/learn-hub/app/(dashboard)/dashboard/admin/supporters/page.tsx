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
import { Trash2, UserCog } from "lucide-react";
import { SupporterDeleteDialog } from "./_components/supporter-delete-dialog";
import { notFound } from "next/navigation";
import { toast } from "react-toastify";
import { SupporterInfoDialog } from "./_components/supporter-info-dialog";
import { CreateSupporterDialog } from "./_components/create-supporter-dialog";

export default function Supporters() {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
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
          router.push("/dashboard/admin");
        }
      }
    });
  }, [isDeleting, isCreating]);

  if (isLoading)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Loading...</p>
      </div>
    );
  if (isCreating)
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Creating...</p>
      </div>
    );

  return (
    <DashboardSection>
      <DashboardSectionHeader icon={UserCog}>Supporters</DashboardSectionHeader>

      <CreateSupporterDialog
        isCreating={isCreating}
        setIsCreating={setIsCreating}
      />
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
