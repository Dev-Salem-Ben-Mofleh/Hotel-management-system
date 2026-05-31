import SearchBooking from "../features/Booking/SearchBooking";
import Rooms from "./Rooms";
import Amenities from "../ui/Amenities";
import Contact from "../ui/Contact";
import Banner from "../ui/Banner";
import useScrollToTop from "../hooks/useScrollToTop";
function Home() {
  useScrollToTop();
  return (
    <>
      <Banner />
      <SearchBooking />
      <Rooms />
      <Amenities />
      <Contact />
    </>
  );
}

export default Home;
