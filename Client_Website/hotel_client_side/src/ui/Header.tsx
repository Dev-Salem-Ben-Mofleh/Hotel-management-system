import Logo from "./Logo";
import MobileButton from "./MobileButton";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import "../index.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Logo />
          {location.pathname === "/login" ||
          location.pathname === "/register" ||
          location.pathname.startsWith("/ConfirmBooking/") ? null : (
            <>
              <Navbar />
              <MobileButton setShow={setShow} Show={show} />
            </>
          )}
        </div>
        <MobileNavbar setShow={setShow} Show={show} />
      </div>
    </header>
  );
}

export default Header;
