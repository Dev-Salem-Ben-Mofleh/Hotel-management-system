import type { AmenitiesProps } from "../utils/AllInterfaces";
function AmenityList({ services = [] }: AmenitiesProps) {
  return services.map((service) => (
    <div
      key={service.service}
      className="text-center bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 gradient-gold rounded-full mb-4">
        <span className="text-white text-2xl">{service.emoji}</span>
      </div>
      <h3 className="text-lg font-bold text-yellow-700 mb-3">
        {service.service}
      </h3>
      <p className="text-gray-600 leading-relaxed">{service.description} </p>
    </div>
  ));
}

export default AmenityList;
