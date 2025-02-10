import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { LucideIcon } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";

interface DashboardLayoutProps {
  children: ReactNode;
  itemList: MenuItem[];
}

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  href?: string | "";
  children?: {
    label: string;
    href: string;
  }[];
}

function DashboardLayout({ children, itemList }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar menuItems={itemList} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <Breadcrumbs />
        <div className="flex-1 overflow-auto bg-gray-700 text-white px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
