import { NavLink } from "react-router";
export default function Navbar() {
  const Link = ({ title, to }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `px-1.5 rounded ${
            isActive ? "text-white font-semibold" : "hover:bg-gray-500/50"
          }`
        }
      >
        {title}
      </NavLink>
    );
  };
  
  const menuItems = [{ title: "Ordenes", to: "/corte_y_mecanizado/ordenes" }];
  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <h1 className="text-xl">Control de Tiempos</h1>
      <ul className="flex gap-4">
        <li>
          <Link title="Home" to="/" />
        </li>
        <li className="relative">
          <Link title="Corte y Mecanizado" to="/corte_y_mecanizado" />
        </li>
      </ul>
    </nav>
  );
}
