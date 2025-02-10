import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { siteConfig } from "../config/siteConfig";

const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  return `${hours}:${minutes}:${seconds}, ${day} ${month} ${year}`;
};

const dropdownMenu = siteConfig.dropdownMenuItems;

function Navbar() {
  const [time, setTime] = useState(new Date());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-slate-800 h-16 px-4 flex flex-row gap-1 border-b-2 border-b-gray-700">
      {/* Search */}
      <form className="px-4 my-auto w-1/4 sm:block hidden">
        <div className="relative">
          <input
            className="block w-full p-3 text-sm text-gray-400 h-10 rounded-lg bg-gray-700"
            placeholder="Search..."
            required
          />
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none px-4">
            <Search className="text-gray-400" />
          </div>
        </div>
      </form>

      {/* Clock */}
      <div className="w-2/4 text-white my-auto text-end">
        {formatTime(time)}
      </div>

      {/* Avatar dropdown button */}
      <div className="w-1/4 mx-auto text-center my-auto">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white flex flex-row mx-auto gap-2 cursor-pointer"
            type="button"
          >
            <img className="rounded-full w-10" src="/avatar.png" />
            <div className="flex flex-row my-auto gap-1">
              <span className="font-bold text-sm">Zul Fahri Baihaqi</span>
              <ChevronDown
                className={`${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                } transition-transform`}
              />
            </div>
          </button>

          {/* Dropdown menu */}
          <div className="absolute w-fit left-1/3 divide-y divide-gray-100 rounded-lg shadow-sm bg-slate-800">
            <ul className={`py-2 text-sm text-gray-200`}>
              {dropdownOpen &&
                dropdownMenu.map((item) => {
                  const isActive = location.pathname === item.href;

                  return (
                    <li>
                      <button
                        onClick={() => navigate(item.href)}
                        className={`${
                          isActive ? "bg-gray-600" : ""
                        } block w-full text-start px-4 py-2 hover:bg-gray-600 hover:text-white`}
                      >
                        <div className="flex flex-row gap-2">
                          <item.icon />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
