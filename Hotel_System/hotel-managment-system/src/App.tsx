import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppLayout from "./pages/Applayout";
import PageNotFound from "./pages/PageNotFound";
import Dashboard from "./pages/Dashboard";
import BookingManagement from "./pages/BookingManagement";
import RoomManagement from "./pages/RoomManagement";
import VisitorManagement from "./pages/VisitorManagement";
import PaymentManagement from "./pages/PaymentManagement";
import Login from "./pages/Login";
import { ModuleProvider } from "./context/Provider/ModuleProvider";
import UserManagment from "./pages/UserManagment";
import RoomTypeManagement from "./pages/RoomTypeManagement";
import { ThemeProvider } from "./context/Provider/ThemeProvider";
import ProtectedRoute from "./ui/ProtectedRoute ";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "bookings",
        element: <BookingManagement />,
      },
      {
        path: "rooms",
        element: <RoomManagement />,
      },
      {
        path: "roomTypes",
        element: <RoomTypeManagement />,
      },
      {
        path: "visitors",
        element: <VisitorManagement />,
      },
      {
        path: "users",
        element: <UserManagment />,
      },
      {
        path: "payments",
        element: <PaymentManagement />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ModuleProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ModuleProvider>
      </ThemeProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",

            background: "var(--color-grey-0)",
            color: "var(--color-grey-900)",

            border: "1px solid var(--color-grey-200)",
            borderRadius: "14px",

            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            transition: "all .3s ease",
          },

          success: {
            duration: 3000,

            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },

          error: {
            duration: 5000,

            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
