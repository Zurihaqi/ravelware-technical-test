import { useLocation } from "react-router";

function Breadcrumbs() {
  const location = useLocation();

  const formatBreadcrumb = (segment: string) => {
    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const path = location.pathname
    .replace(/^\//, "")
    .split("/")
    .map(formatBreadcrumb)
    .join(" / ");

  return (
    <div className="bg-slate-800 text-white">
      <p className="font-semibold text-lg px-4 py-2">
        {path === "" ? "Dashboard" : path}
      </p>
    </div>
  );
}

export default Breadcrumbs;
