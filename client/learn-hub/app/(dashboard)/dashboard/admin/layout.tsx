import { Sidebar } from "../../_components/sidebar";
import { SidebarRoutes } from "../../_components/sidebar-routes";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="mt-[5.5rem] hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <div className="flex flex-col w-full">
          <SidebarRoutes role="admin" />
        </div>
      </div>

      <main className="md:pl-56 h-full ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
