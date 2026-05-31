import { NavLink } from "react-router-dom";
import { useGetCountActiveRoom } from "../features/Dashboard/DashboardHooks/useGetCountActiveRoom";
import { useGetCountUser } from "../features/Dashboard/DashboardHooks/useGetCountUser";
import { useGetCurrentGuests } from "../features/Dashboard/DashboardHooks/useGetCurrentGuests";
import { useGetDailyRevenue } from "../features/Dashboard/DashboardHooks/useGetDailyRevenue";
import { useGetTotalBooking } from "../features/Dashboard/DashboardHooks/useGetTotalBooking";
import CardDashbord from "../features/Dashboard/CardDashbord";
import PageHeader from "../ui/PageHeader";
import Spinner from "../ui/Spinner";

export default function Dashboard() {
  const { isLoading: isLoading2, countPerson } = useGetCurrentGuests();
  const { isLoading: isLoading3, countActiveRoom } = useGetCountActiveRoom();
  const { isLoading: isLoading4, countUser } = useGetCountUser();
  const { isLoading: isLoading5, dailyRevenue } = useGetDailyRevenue();
  const { isLoading: isLoading7, totalBooking } = useGetTotalBooking();

  if (
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    isLoading5 ||
    isLoading7 ||
    !countUser
  )
    return <Spinner />;

  return (
    <div
      className="
        content-section
        min-h-screen
        bg-gray-50 dark:bg-gray-900
        transition-colors duration-300
      "
    >
      <div className="mb-6">
        <PageHeader
          nameOfPage="Dashboard"
          description="Welcome back! Here's what's happening at your hotel."
        />
      </div>

      <div
        className="
          mb-8
          grid grid-cols-1
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        <CardDashbord
          nameCard="Current Visitors"
          valueCard={countPerson ? (countPerson - countUser).toString() : "0"}
          iconCard="fas fa-user-check text-2xl"
          className=" rounded-2xl
            bg-gradient-to-br
            from-blue-500 to-blue-600
            p-5 sm:p-6
            text-white
            shadow-lg"
        />

        <CardDashbord
          nameCard="Total Bookings"
          valueCard={totalBooking ? totalBooking.toString() : "0"}
          iconCard="fas fa-calendar-check text-2xl"
          className=" rounded-2xl
            bg-gradient-to-br
            from-green-500 to-green-600
            p-5 sm:p-6
            text-white
            shadow-lg"
        />

        <CardDashbord
          nameCard="Active Rooms"
          valueCard={countActiveRoom ? countActiveRoom.toString() : "0"}
          iconCard="fas fa-door-open text-2xl"
          className=" rounded-2xl
            bg-gradient-to-br
            from-purple-500 to-purple-600
            p-5 sm:p-6
            text-white
            shadow-lg"
        />

        <CardDashbord
          nameCard="Daily Revenue"
          valueCard={dailyRevenue ? `$${dailyRevenue.toLocaleString()}` : "$0"}
          iconCard="fas fa-dollar-sign text-2xl"
          className=" rounded-2xl
            bg-gradient-to-br
            from-orange-500 to-orange-600
            p-5 sm:p-6
            text-white
            shadow-lg"
        />
      </div>

      <div
        className="
    grid grid-cols-1
    gap-6
    lg:grid-cols-2
  "
      >
        <div
          className="
      rounded-2xl
      bg-gradient-to-r
      from-indigo-600
      to-blue-600
      p-8
      text-white
      shadow-lg
    "
        >
          <div className="flex items-center gap-5">
            <div
              className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-white/20
        "
            >
              <i className="fas fa-hotel text-3xl"></i>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Hotel Management Dashboard</h3>

              <p className="mt-2 text-blue-100">
                Manage bookings, rooms and hotel operations easily.
              </p>
            </div>
          </div>
        </div>

        <div
          className="
      rounded-2xl
      bg-white
      dark:bg-gray-800
      p-6
      shadow-sm
    "
        >
          <h3
            className="
        mb-5
        text-lg
        font-semibold
        text-gray-900
        dark:text-white
      "
          >
            Quick Actions
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <NavLink
              to="/bookings"
              className="
          rounded-xl
          bg-blue-100
          p-5
          transition
          hover:scale-105
          dark:bg-blue-900
        "
            >
              <i className="fas fa-calendar-plus mb-2 text-2xl text-blue-600"></i>

              <p className="font-medium">Add Booking</p>
            </NavLink>

            <NavLink
              to="/rooms"
              className="
          rounded-xl
          bg-green-100
          p-5
          transition
          hover:scale-105
          dark:bg-green-900
        "
            >
              <i className="fas fa-door-open mb-2 text-2xl text-green-600"></i>

              <p className="font-medium">Manage Rooms</p>
            </NavLink>

            <NavLink
              to="/visitors"
              className="
          rounded-xl
          bg-purple-100
          p-5
          transition
          hover:scale-105
          dark:bg-purple-900
        "
            >
              <i className="fas fa-users mb-2 text-2xl text-purple-600"></i>

              <p className="font-medium">Visitors</p>
            </NavLink>

            <NavLink
              to="/payments"
              className="
          rounded-xl
          bg-orange-100
          p-5
          transition
          hover:scale-105
          dark:bg-orange-900
        "
            >
              <i className="fas fa-credit-card mb-2 text-2xl text-blue-600"></i>{" "}
              <p className="font-medium">Payments</p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
