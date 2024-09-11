import { useState, useEffect } from "react";

const Banner = () => {
  const slides = [
    { id: 1, imgSrc: "https://www.k24klik.com/blog/wp-content/uploads/2019/08/Notif-IG-MO-banner-1.jpg" },
    // { id: 2, imgSrc: "https://img.freepik.com/free-vector/hand-drawn-fast-food-sale-banner_23-2150970571.jpg" },
    {
      id: 3,
      imgSrc: "https://pasardana.id/media/44751/website-restructure_banner-desktop-bahasa.jpg?crop=0.25986842105263142,0.0000000000000002243819165558,0,0&cropmode=percentage&width=675&height=380&rnd=132920037390000000",
    },
    // {
    //   id: 4,
    //   imgSrc: "https://marketplace.canva.com/EAFn1-9WD4w/1/0/1600w/canva-kuning-dan-jingga-retro-angkringan-outdoor-banner-2qXsVrbNT1Y.jpg",
    // },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Slide setiap 5 detik
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  return (
    <div className="relative xl:w-full xl:max-w-[1160px] w-full">
      <div className="carousel xl:w-full xl:h-[300px]  w-full h-[180px]  overflow-hidden relative xl:rounded-lg">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`carousel-item absolute  w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}>
            <img src={slide.imgSrc} className="w-full h-full object-cover" alt={`Slide ${slide.id}`} />
          </div>
        ))}

        <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
          <button onClick={handlePrevSlide} className="btn btn-circle bg-white opacity-70 hover:opacity-100 ml-2">
            ❮
          </button>
        </div>
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
          <button onClick={handleNextSlide} className="btn btn-circle bg-white opacity-70 hover:opacity-100 mr-2">
            ❯
          </button>
        </div>

        {/* Indikator Slide */}
      </div>
    </div>
  );
};

export default Banner;
