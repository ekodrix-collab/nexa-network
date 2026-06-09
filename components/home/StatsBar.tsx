"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import Image from "next/image";

export default function StatsBar() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPageRef = useRef(6);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const next =
        window.innerWidth < 640 ? 2 : window.innerWidth < 1024 ? 4 : 6;
      if (next === itemsPerPageRef.current) return;
      const oldPerPage = itemsPerPageRef.current;
      itemsPerPageRef.current = next;
      setCurrentPage((prev) => {
        const firstLogoIndex = prev * oldPerPage;
        return Math.floor(firstLogoIndex / next);
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logos = [
    { id: "aditya-clinic", image: "/images/client-logo/aditya-clinic.webp", alt: "Aditya Clinic" },
    { id: "al-mana", image: "/images/client-logo/al-mana.webp", alt: "Al Mana" },
    { id: "carmel-group", image: "/images/client-logo/carmel-group.webp", alt: "Carmel Group" },
    { id: "e-max", image: "/images/client-logo/e-max.webp", alt: "E Max" },
    { id: "edoxi", image: "/images/client-logo/edoxi.webp", alt: "Edoxi" },
    { id: "embajada-de-guatemala", image: "/images/client-logo/embajada-de-guatemala.webp", alt: "Embajada De Guatemala" },
    { id: "fedex-office", image: "/images/client-logo/fedex-office.webp", alt: "FedEx Office" },
    { id: "hamc", image: "/images/client-logo/hamc.webp", alt: "HAMC" },
    { id: "katara", image: "/images/client-logo/katara.webp", alt: "Katara" },
    { id: "lego", image: "/images/client-logo/lego.webp", alt: "LEGO" },
    { id: "little-sailor", image: "/images/client-logo/little-sailor.webp", alt: "Little Sailor" },
    { id: "marshal-scale", image: "/images/client-logo/marshal-scale.webp", alt: "Marshal Scale" },
    { id: "midmac-colas", image: "/images/client-logo/midmac-colas.webp", alt: "Midmac Colas" },
    { id: "ministry-of-transport", image: "/images/client-logo/ministry-of-transport.webp", alt: "Ministry Of Transport" },
    { id: "nice-touch", image: "/images/client-logo/nice-touch.webp", alt: "Nice Touch" },
    { id: "pantone-advertaising", image: "/images/client-logo/pantone-advertaising.webp", alt: "Pantone Advertising" },
    { id: "qt-fa", image: "/images/client-logo/qt-fa.webp", alt: "QT FA" },
    { id: "seashore-group", image: "/images/client-logo/seashore-group.webp", alt: "Seashore Group" },
  ];

  const logosRef = useRef(logos);
  const totalPages = Math.ceil(logos.length / itemsPerPageRef.current);

  useEffect(() => {
    if (isPaused || totalPages <= 1) return;
    const timer = setInterval(() => {
      const tp = Math.ceil(logosRef.current.length / itemsPerPageRef.current);
      setCurrentPage((prev) => (prev + 1) % tp);
    }, 3500);
    return () => clearInterval(timer);
  }, [totalPages, isPaused]);

  const nextPage = () => {
    const tp = Math.ceil(logosRef.current.length / itemsPerPageRef.current);
    setCurrentPage((prev) => (prev + 1) % tp);
  };

  const prevPage = () => {
    const tp = Math.ceil(logosRef.current.length / itemsPerPageRef.current);
    setCurrentPage((prev) => (prev - 1 + tp) % tp);
  };

  const visibleLogos = logos.slice(
    currentPage * itemsPerPageRef.current,
    (currentPage + 1) * itemsPerPageRef.current,
  );

  return (
    <section className="relative bg-[#070A11] py-20 overflow-hidden min-h-[500px]">
      {/* Glow spots */}
        <div 
        className="absolute inset-0 pointer-events-none opacity-15 bg-center bg-cover mix-blend-lighten"
        style={{ backgroundImage: 'url(/map-bg.png)' }}
      />  
      <div
        className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#E24611]/5 rounded-full blur-[80px] pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />

      <div className="max-w-[1300px] mx-auto px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" className="flex flex-col items-center">
          {/* Shield icon */}
          <div className="mb-5 flex items-center justify-center w-12 h-12 bg-[#FF5A20]/10 rounded-full border border-[#FF5A20]/20 shadow-[0_0_15px_rgba(255,90,32,0.15)]">
            <svg
              className="w-6 h-6 text-[#FF5A20]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
          </div>

          {/* Label */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#FF5A20]/60" />
            <span className="text-[#FF5A20] text-sm font-bold tracking-[0.2em] uppercase">
              Trusted Partners
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#FF5A20]/60" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-6 max-w-3xl tracking-tight leading-tight">
            Trusted by Leading Organizations{" "}
            <span className="text-[#FF5A20]">Across Qatar</span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-400 text-center max-w-2xl text-sm md:text-base mb-12 leading-relaxed">
            We are proud to collaborate with top organizations and deliver
            secure, reliable, and future-ready IT solutions.
          </p>

          {/* Outer wrapper */}
          <div
            className="w-full flex items-center gap-3 "
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Prev button */}
            <button
              type="button"
              onClick={prevPage}
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-[5px] hidden md:flex bg-white/5 flex items-center justify-center text-white/50 hover:text-[#FF5A20] hover:border-[#FF5A20] hover:bg-[#FF5A20]/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF5A20]/50 active:scale-90 cursor-pointer"
              aria-label="Previous page"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Carousel box */}
            <div
              className="flex-1 bg-[#111824]  rounded-[5px] p-4 md:p-6 lg:p-8 shadow-2xl shadow-black/50 overflow-hidden"
              style={{ isolation: "isolate", transform: "translateZ(0)" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
                  className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 w-full place-items-center"
                >
                  {visibleLogos.map((logo) => (
                    <div
                      key={logo.id}
                      className="rounded-[10px] w-full h-[100px] flex items-center justify-center shadow-lg shadow-black/20 hover:shadow-xl hover:border-[#FF5A20]/60 hover:shadow-[#FF5A20]/10 transition-all duration-300"
                    >
                      <Image
                        src={logo.image}
                        alt={logo.alt}
                        width={180}
                        height={80}
                        className="w-full rounded-[10px] h-full object-contain"
                        unoptimized
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next button */}
            <button
              type="button"
              onClick={nextPage}
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 hidden md:flex rounded-[5px] bg-white/5 flex items-center justify-center text-white/50 hover:text-[#FF5A20] hover:border-[#FF5A20] hover:bg-[#FF5A20]/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF5A20]/50 active:scale-90 cursor-pointer"
              aria-label="Next page"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentPage(index)}
                className={`relative transition-all duration-300 rounded-full cursor-pointer ${
                  currentPage === index
                    ? "w-6 h-2 bg-[#FF5A20]"
                    : "w-2 h-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}