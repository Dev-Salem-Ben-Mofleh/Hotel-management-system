import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./Pages/AppLayout";
import PageNotFound from "./Pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RoomProvider } from "./context/RoomContext";
import CreateBooking from "./Pages/CreateBooking";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ConfirmBooking/:roomId",
        element: (
          <ProtectedRoute>
            <CreateBooking />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RoomProvider>
        <RouterProvider router={router} />;
        <ReactQueryDevtools initialIsOpen={false} />
      </RoomProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "Box" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
