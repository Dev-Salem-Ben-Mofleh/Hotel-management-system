function Banner() {
  return (
    <div className="relative overflow-hidden" id="home">
      <div className="relative h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 mt-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/02/e2/77/ab/sur-plaza-hotel.jpg?w=1200&h=-1&s=1"
          alt="Royal Suite"
          loading="eager"
          className="absolute w-full h-full object-cover opacity-15"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-center">
          <div className="max-w-4xl mx-auto px-6 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-yellow-700 mb-6 text-shadow">
              Welcome to Heritage
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Experience an unforgettable stay in the heart of the city
            </p>
            <div className="flex items-center justify-center space-x-2 text-yellow-600 mb-8">
              <span>📍</span>
              <span className="text-lg">Riyadh, Saudi Arabia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
