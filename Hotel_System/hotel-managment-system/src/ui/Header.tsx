import { useState } from "react";
import useCurrentUser from "../features/Auth/useCurrentUser";
import { useModuleContext } from "../context/Hook/useModuleContext";
import UserrDetails from "../features/User/UserrDetails";
import UpdateUser from "../features/User/UpdateUser";
import { useTheme } from "../context/Hook/useThemeContext";
import { useLogout } from "../features/Auth/useLogout";

function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  const { logout, isPending } = useLogout();

  const { currentUser } = useCurrentUser();
  const { setModalType, setOpenId } = useModuleContext();
  const { theme, toggleTheme } = useTheme();

  if (!currentUser) return;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex h-16 items-center justify-between px-3 sm:px-4 md:px-6">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-2 rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <i className="fas fa-bars text-gray-600 dark:text-gray-400"></i>
            </button>

            <div className="flex items-center min-w-0">
              <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex-shrink-0">
                <i className="fas fa-hotel text-sm sm:text-base text-white"></i>
              </div>

              <h1 className="ml-2 truncate text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                Grand Hotel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={toggleTheme}
              disabled={isPending}
              className="
                    rounded-xl
                    p-2.5
                    transition
                    hover:bg-gray-100
                    dark:hover:bg-gray-700
                  "
            >
              {theme === "light" ? (
                <i className="fas fa-moon text-gray-600"></i>
              ) : (
                <i className="fas fa-sun text-yellow-400"></i>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                disabled={isPending}
                className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-400">
                  <i className="fas fa-user text-xs text-white"></i>
                </div>

                <span className="hidden max-w-[120px] truncate text-sm text-gray-700 dark:text-gray-300 sm:block">
                  {currentUser?.personDto.fullName || "Admin"}
                </span>

                <i className="fas fa-chevron-down hidden text-xs text-gray-500 sm:block"></i>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <button
                    className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      setOpenId(currentUser.userId);
                      setModalType("viewUser");
                      setOpen(false);
                    }}
                    disabled={isPending}
                  >
                    <i className="fas fa-user mr-3"></i>
                    Personal Info
                  </button>

                  <button
                    className="flex w-full items-center px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => {
                      setOpenId(currentUser.userId);
                      setModalType("updateUser");
                      setOpen(false);
                    }}
                    disabled={isPending}
                  >
                    <i className="fas fa-edit mr-3"></i>
                    Update Profile
                  </button>

                  <button
                    className="flex w-full items-center px-4 py-3 text-sm text-red-600 transition hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                    onClick={(e) => {
                      const confirmLogout = window.confirm(
                        "Do you want to logout?",
                      );
                      if (!confirmLogout) {
                        e.preventDefault();
                      } else {
                        logout();
                      }
                    }}
                    disabled={isPending}
                  >
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <UserrDetails />
      <UpdateUser />
    </>
  );
}

export default Header;
