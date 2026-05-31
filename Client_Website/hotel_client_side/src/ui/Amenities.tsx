import AmenityList from "./AmenityList";

function Amenities() {
  return (
    <section className="py-20 bg-white" id="amenities">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-6">
            Premium Facilities & Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer a comprehensive range of services and facilities to ensure
            a comfortable and memorable stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AmenityList
            services={[
              {
                emoji: "📶",
                service: "Free WiFi",
                description: "High-speed internet throughout the hotel",
              },
              {
                emoji: "🚗",
                service: "Free Parking",
                description: "Secure and free parking with 24-hour service",
              },
              {
                emoji: "☕",
                service: "Heritage Café",
                description:
                  "Authentic Arabic coffee and hot beverages all day",
              },
              {
                emoji: "🍽️",
                service: "Fine Dining",
                description: "Delicious Arabic and international cuisine",
              },
              {
                emoji: "🏊",
                service: "Indoor Pool",
                description: "Heated pool with relaxation area",
              },
              {
                emoji: "💪",
                service: "Fitness Center",
                description: "Latest equipment with personal trainer",
              },
              {
                emoji: "👶",
                service: "Family Services",
                description: "Kids' playground and family-friendly facilities",
              },
              {
                emoji: "✈️",
                service: "Airport Service",
                description: "Free transportation to and from the airport",
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

export default Amenities;
