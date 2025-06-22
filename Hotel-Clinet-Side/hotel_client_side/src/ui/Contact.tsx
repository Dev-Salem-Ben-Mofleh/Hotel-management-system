import ContactList from "./ContactList";

function Contact() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-yellow-50 to-yellow-100"
      id="contact"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-6">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our team is available 24/7 to serve you and ensure you get the best
            stay experience
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <ContactList
              Contacts={[
                {
                  emoji: "📍",
                  primaryInfo: "Address",
                  secondaryInfo: "King Fahd Road, Riyadh 12345",
                },
                {
                  emoji: "📞",
                  primaryInfo: "Phone",
                  secondaryInfo: "+966 11 123 4567",
                },
                {
                  emoji: "✉️",
                  primaryInfo: "Email",
                  secondaryInfo: "salembenmofleh@gmail.com",
                },
                {
                  emoji: "🕐",
                  primaryInfo: "Working Hours",
                  secondaryInfo: "24 hours - 7 days a week",
                },
              ]}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg h-full">
              <div className="h-full min-h-[400px] bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center relative overflow-hidden rounded-lg">
                <div className="text-center z-10">
                  <h3 className="text-3xl font-bold text-yellow-700 mb-4">
                    Prime Location in Heart of Riyadh
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
                    Heritage Hotel is located in a strategic location providing
                    easy access to all city landmarks
                  </p>
                  <a
                    target="_blank"
                    href="https://www.google.com/maps?q=24.7136,46.6753"
                  >
                    <button className="gradient-gold text-white px-8 py-3 text-lg font-semibold rounded-md hover:shadow-lg transition-all duration-300">
                      View on Map
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
