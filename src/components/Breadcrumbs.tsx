import { useLocation } from "react-router";

function Breadcrumbs() {
  const location = useLocation();

  const path = location.pathname.replace(/^\//, "").split("/").join(" / ");

  return (
    <div className="bg-slate-800 text-white">
      <p className="font-semibold text-lg px-4 py-2 capitalize">
        {path === "" ? "Dashboard" : path}
      </p>
    </div>
  );
}

export default Breadcrumbs;
