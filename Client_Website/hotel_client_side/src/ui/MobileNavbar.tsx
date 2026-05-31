import { NavLink } from "react-router-dom";
import { useLogout } from "../features/Auth/useLogout";
import type { sessionData } from "../utils/AllInterfaces";

type MobileNavbarProps = {
  Show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function MobileNavbar({ Show, setShow }: MobileNavbarProps) {
  const { logout } = useLogout();
  const curruentSessoinjson = localStorage.getItem("session") || "";
  let curruentSessoin: sessionData | undefined;
  if (curruentSessoinjson) {
    curruentSessoin = JSON.parse(curruentSessoinjson);
  }

  return (
    <div
      className={`md:hidden ${
        Show ? "absolute right-2 w-96" : "hidden"
      } bg-white shadow-lg z-50`}
      id="mobileMenu"
    >
      <div className="py-6 px-4 border-t border-gray-200 ">
        {!(
          location.pathname === "/login" ||
          location.pathname === "/register" ||
          location.pathname.startsWith("/ConfirmBooking/")
        ) ? (
          <nav className="flex flex-col gap-4">
            <a
              href="#home"
              onClick={() => setShow(!Show)}
              className="text-gray-800 hover:text-yellow-600 font-semibold transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#booking"
              onClick={() => setShow(!Show)}
              className="text-gray-800 hover:text-yellow-600 font-semibold transition-colors duration-200"
            >
              Book Now
            </a>
            <a
              href="#rooms"
              onClick={() => setShow(!Show)}
              className="text-gray-800 hover:text-yellow-600 font-semibold transition-colors duration-200"
            >
              Rooms
            </a>
            <a
              href="#amenities"
              onClick={() => setShow(!Show)}
              className="text-gray-800 hover:text-yellow-600 font-semibold transition-colors duration-200"
            >
              Amenities
            </a>
            <a
              href="#contact"
              onClick={() => setShow(!Show)}
              className="text-gray-800 hover:text-yellow-600 font-semibold transition-colors duration-200"
            >
              Contact
            </a>
            {!curruentSessoin ? (
              <NavLink
                to="/Login"
                className="w-full text-center px-4 py-3 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 transition-colors duration-200"
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                to="/"
                className="w-full text-center px-4 py-3 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 transition-colors duration-200"
                onClick={(e) => {
                  const confirmLogout = window.confirm(
                    "Do you want to logout?"
                  );
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
        ) : null}
      </div>
    </div>
  );
}

export default MobileNavbar;
