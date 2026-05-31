import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  return (
    <footer className="bg-yellow-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Heritage Hotel</h3>
            <p className="text-yellow-200 leading-relaxed">
              We pride ourselves on providing the best hotel services while
              maintaining the authentic character
            </p>
          </div>
          {location.pathname === "/login" ||
          location.pathname === "/register" ||
          location.pathname.startsWith("/ConfirmBooking/") ? null : (
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-yellow-200">
                <li>
                  <a
                    href="#booking"
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Rooms & Suites
                  </a>
                </li>
                <li>
                  <a
                    href="#amenities"
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Facilities & Services
                  </a>
                </li>
                <li>
                  <a
                    href="#booking"
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Special Offers
                  </a>
                </li>
                <li>
                  <a
                    href="#Contact"
                    className="hover:text-yellow-300 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <p className="text-yellow-200 mb-4">
              Stay updated with our latest offers and news
            </p>

            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">
                  <FaTwitter />
                </span>
              </div>
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">
                  <FaFacebook />
                </span>
              </div>
              <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                <span className="text-sm font-bold">
                  <FaInstagram />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-yellow-600 mt-8 pt-8 text-center text-yellow-200">
          <p>&copy; 2025 Heritage Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
