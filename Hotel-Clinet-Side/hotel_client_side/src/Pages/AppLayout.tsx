import Header from "../ui/Header";
import "../index.css";
import Footer from "../ui/Footer";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
