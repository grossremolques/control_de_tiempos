import { Outlet, NavLink } from "react-router";
export default function CorteYMecanizado() {
  const Link = ({ title, to }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `font-semibold ${
            isActive
              ? "text-blue-600 bg-blue-100 px-2 py-1.5 rounded-sm"
              : "text-gray-500"
          }`
        }
      >
        {title}
      </NavLink>
    );
  };
  return (
    <>
      <nav className="bg-white shadow-md p-4">
        <ul className="flex space-x-4">
          <li>
            <Link title={"Mecanizado"} to="/corte_y_mecanizado/mecanizado" />
          </li>
          <li>
            <Link title={"Corte"} to="/corte_y_mecanizado/corte" />
          </li>
          <li>
            <Link title={"Nesting"} to="/corte_y_mecanizado/nesting" />
          </li>
        </ul>
      </nav>
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}
//
