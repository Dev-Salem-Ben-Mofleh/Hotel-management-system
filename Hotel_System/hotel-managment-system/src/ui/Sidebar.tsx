import { NavLink } from "react-router-dom";

const menuItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "fas fa-chart-pie",
  },
  {
    to: "/rooms",
    label: "Rooms",
    icon: "fas fa-bed",
  },
  {
    to: "/bookings",
    label: "Bookings",
    icon: "fas fa-calendar-check",
  },
  {
    to: "/visitors",
    label: "Visitors",
    icon: "fas fa-users",
  },
  {
    to: "/payments",
    label: "Payments",
    icon: "fas fa-wallet",
  },
  {
    to: "/roomTypes",
    label: "Room Types",
    icon: "fas fa-door-open",
  },
  {
    to: "/users",
    label: "Users",
    icon: "fas fa-user-shield",
  },
];

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-72
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          shadow-2xl
          transition-transform duration-300
          flex flex-col
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="font-bold text-lg dark:text-white">Menu</h2>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <i className="fas fa-times dark:text-white"></i>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="px-3 mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Main Menu
          </p>

          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `
                    group flex items-center justify-between
                    px-4 py-3 rounded-2xl
                    transition-all duration-300
                    ${
                      isActive
                        ? `
                          bg-gradient-to-r from-blue-500 to-indigo-600
                          text-white shadow-lg shadow-blue-500/20
                        `
                        : `
                          text-gray-700 dark:text-gray-300
                          hover:bg-gray-100 dark:hover:bg-gray-800
                        `
                    }
                  `
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 dark:bg-gray-700/30">
                      <i className={`${item.icon} text-sm`} />
                    </div>

                    <span className="font-medium text-sm">{item.label}</span>
                  </div>

                  <i className="fas fa-chevron-right text-xs opacity-50"></i>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
