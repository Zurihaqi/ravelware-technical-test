import { createBrowserRouter, Outlet } from "react-router";
import { siteConfig } from "../config/siteConfig";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import History from "../pages/History/History";
import Management from "../pages/Management/Management";
import Profile from "../pages/Profile/Profile";
import FuelTransactionHistory from "../pages/Report/FuelTransactionHistory";
import MachineUsage from "../pages/Report/MachineUsage";
import ManpowerUsage from "../pages/Report/ManpowerUsage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DashboardLayout itemList={siteConfig.menuItems}>
        <Outlet />
      </DashboardLayout>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "report",
        children: [
          {
            path: "fuel-transaction-history",
            element: <FuelTransactionHistory />,
          },
          {
            path: "machine-usage",
            element: <MachineUsage />,
          },
          {
            path: "manpower-usage",
            element: <ManpowerUsage />,
          },
        ],
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "management",
        element: <Management />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
