import { NavLink } from "react-router-dom";
import type { sessionData } from "../utils/AllInterfaces";
import { useLogout } from "../features/Auth/useLogout";

function Navbar() {
  const { logout } = useLogout();
  const curruentSessoinjson = localStorage.getItem("session") || "";
  let curruentSessoin: sessionData | undefined;
  if (curruentSessoinjson) {
    curruentSessoin = JSON.parse(curruentSessoinjson);
  }

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <a
        href="#home"
        className="text-gray-700 hover:text-yellow-700 transition-colors font-medium"
      >
        Home
      </a>
      <a
        href="#booking"
        className="text-gray-700 hover:text-yellow-700 transition-colors font-medium"
      >
        Book Now
      </a>
      <a
        href="#rooms"
        className="text-gray-700 hover:text-yellow-700 transition-colors font-medium"
      >
        Rooms
      </a>
      <a
        href="#amenities"
        className="text-gray-700 hover:text-yellow-700 transition-colors font-medium"
      >
        Amenities
      </a>
      <a
        href="#contact"
        className="text-gray-700 hover:text-yellow-700 transition-colors font-medium"
      >
        Contact
      </a>
      {!curruentSessoin ? (
        <NavLink
          to="/login"
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-blue-700 transition"
        >
          Login
        </NavLink>
      ) : (
        <NavLink
          to="/"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          onClick={(e) => {
            const confirmLogout = window.confirm("Do you want to logout?");
            if (!confirmLogout) {
              e.preventDefault();
            } else {
              logout();
            }
          }}
        >
          Logout
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
