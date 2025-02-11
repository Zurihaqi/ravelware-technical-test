import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { MenuItem } from "../layouts/DashboardLayout";
import { ChevronDown, ChevronLeft, Circle } from "lucide-react";

interface SidebarProps {
  menuItems: MenuItem[];
}

function Sidebar({ menuItems }: SidebarProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const minimizeSidebar = () => setIsMinimized(!isMinimized);

  const toggleSubMenu = (label: string) => {
    setExpandedMenu((prev) => (prev === label ? null : label));
  };

  const isActivePath = (href: string | undefined) => {
    return location.pathname === href;
  };

  return (
    <aside
      className={`border-r-2 border-r-gray-900 transition-all duration-300 fixed lg:sticky lg:translate-x-0 top-0 left-0 ${
        isMinimized ? "w-20" : "w-64"
      } h-screen bg-slate-800 overflow-y-auto overflow-x-hidden hidden lg:block shrink-0`}
    >
      <div className="space-y-4 flex flex-col h-full">
        {/* Logo */}
        <div className="flex flex-row h-16 bg-gray-700">
          {isMinimized ? (
            <img src="/logo.jpg" className="w-9 h-9 my-auto mx-auto" />
          ) : (
            <div className="my-auto mx-auto flex flex-row">
              <img src="/logo.jpg" className="w-10 h-10 mr-1" />
              <span className="font-extrabold text-3xl text-white">
                AVELWARE
              </span>
            </div>
          )}
        </div>

        {/* Menus */}
        <ul className="flex flex-col flex-grow mx-4">
          {menuItems &&
            menuItems.map((item) => {
              const isActive = isActivePath(item.href);
              const isExpanded = expandedMenu === item.label;

              return (
                <li key={item.label}>
                  {item.href ? (
                    <button
                      onClick={() => navigate(item.href ?? "")}
                      className={`cursor-pointer flex w-full items-center p-2 mb-2 text-white rounded-lg hover:bg-gray-700 group ${
                        isActive ? "bg-gray-700" : ""
                      }`}
                    >
                      {isMinimized ? (
                        <item.icon className="mx-auto" />
                      ) : (
                        <>
                          <item.icon />
                          <span className="ms-3">{item.label}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleSubMenu(item.label)}
                      className={`cursor-pointer flex w-full items-center p-2 mb-2 text-white rounded-lg hover:bg-gray-700 group ${
                        isExpanded ? "bg-gray-700" : ""
                      }`}
                    >
                      {isMinimized ? (
                        <item.icon className="mx-auto" />
                      ) : (
                        <div className="flex flex-row w-full items-center">
                          <item.icon />
                          <span className="ms-3">{item.label}</span>
                          <ChevronDown
                            className={`ml-auto transition-transform ${
                              isExpanded ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </div>
                      )}
                    </button>
                  )}

                  {/* Submenu */}
                  {item.children && isExpanded && (
                    <ul className={isMinimized ? "" : "ml-6"}>
                      {item.children.map((subItem) => {
                        const isSubActive = isActivePath(subItem.href);

                        return (
                          <li key={subItem.label}>
                            <button
                              onClick={() => navigate(subItem.href)}
                              className={`cursor-pointer flex w-full items-center p-2 mb-2 text-white rounded-lg hover:bg-gray-700 group ${
                                isSubActive ? "bg-gray-700" : ""
                              }`}
                            >
                              {isMinimized ? (
                                <Circle size={10} className="mx-auto" />
                              ) : (
                                <span>{subItem.label}</span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}

          {/* Minimize sidebar button */}
          <li className="mt-auto">
            <button
              onClick={minimizeSidebar}
              className="cursor-pointer flex w-full items-center p-2 mb-2 text-white rounded-lg hover:bg-gray-700 group"
            >
              <ChevronLeft
                className={`${
                  isMinimized ? "mx-auto scale-x-[-1]" : ""
                } transition-transform`}
              />
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
