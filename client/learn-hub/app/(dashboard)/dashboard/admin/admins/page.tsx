"use client";

import { deleteAdmin, getAllAdmins } from "@/actions/admins";
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
import { AdminDeleteDialog } from "./_components/admin-delete-dialog";
import { notFound } from "next/navigation";
import { AdminInfoDialog } from "./_components/admin-info-dialog";
import { toast } from "react-toastify";

export default function Admins() {
  const [admins, setAdmins] = useState<Admin[]>();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllAdmins().then((res) => {
      if (res) {
        if (res.status == 200) {
          setAdmins((state) => res.data.admins);
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

  if (admins && !admins.length) {
    return (
      <div className="flex p-6">
        <p className="text-2xl text mx-auto">Found no admins</p>
      </div>
    );
  }

  return (
    <DashboardSection>
      <DashboardSectionHeader>Admins</DashboardSectionHeader>

      <DashboardSectionContent>
        {admins &&
          admins.map((admin) => (
            <DashboardSectionItem key={admin.id}>
              <DashboardSectionItemLeft>
                <UserThumbnail user_id={admin.id} />
              </DashboardSectionItemLeft>

              <DashboardSectionItemRight>
                <AdminInfoDialog admin={admin} />
                <AdminDeleteDialog
                  isDeleting={isDeleting}
                  setIsDeleting={setIsDeleting}
                  onDelete={async () => {
                    const res = await deleteAdmin(admin.id);
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
