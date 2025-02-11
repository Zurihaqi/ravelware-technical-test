import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { type LucideIcon } from "lucide-react";
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar menuItems={itemList} />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar />
        <Breadcrumbs />
        <div className="flex-1 overflow-auto bg-[#1a1b2e] text-white">
          <div className="max-w-[1600px] w-full mx-auto px-6 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
