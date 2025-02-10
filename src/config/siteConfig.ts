import {
  BookMarked,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  SquareKanban,
  User,
  UserPen,
} from "lucide-react";

export type siteConfig = typeof siteConfig;

export const siteConfig = {
  menuItems: [
    {
      label: "Dashboard",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Report",
      children: [
        {
          label: "Fuel Transaction History",
          href: "/report/fuel-transaction-history",
        },
        {
          label: "Machine Usage",
          href: "/report/machine-usage",
        },
        {
          label: "Manpower Usage",
          href: "/report/manpower-usage",
        },
      ],
      icon: BookMarked,
    },
    {
      label: "History",
      href: "/history",
      icon: History,
    },
    {
      label: "Management",
      href: "/management",
      icon: SquareKanban,
    },
    {
      label: "Profile",
      children: [
        {
          label: "Edit Profile",
          href: "/profile/edit",
        },
      ],
      icon: User,
    },
  ],
  dropdownMenuItems: [
    {
      label: "My Profile",
      href: "/profile",
      icon: User,
    },
    {
      label: "Edit Profile",
      href: "/profile/edit",
      icon: UserPen,
    },
    {
      label: "Settings",
      href: "",
      icon: Settings,
    },
    {
      label: "Logout",
      href: "",
      icon: LogOut,
    },
  ],
};
