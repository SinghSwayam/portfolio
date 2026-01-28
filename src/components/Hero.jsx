import React, { useRef, useState, useEffect, Suspense } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { styles } from "../styles";

// Lazy load 3D component
const ComputersCanvas = React.lazy(() => import("../canvas/Computers"));
import useTheme from "../hooks/useTheme";

const Hero = () => {
  const containerRef = useRef();
  const revealRef = useRef();
  const titleRef = useRef();
  const subtextRef = useRef();
  const scrollRef = useRef();
  const theme = useTheme();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set([".hero-text-line", ".hero-sub-line"], { y: "150%", rotateX: 20, opacity: 0 });
    gsap.set(scrollRef.current, { opacity: 0, y: 50 });

    if (revealRef.current) {
      tl.fromTo(revealRef.current,
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(150% at 50% 50%)", duration: 2, ease: "power4.inOut" }
      );
    }

    tl.to([".hero-text-line", ".hero-sub-line"], {
      y: "0%",
      rotateX: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.2,
      ease: "back.out(1.7)",
    }, "-=1.0");

    tl.to(scrollRef.current, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
    }, "-=0.5");

    if (!isMobile) {
      const xToTitle = gsap.quickTo(titleRef.current, "x", { duration: 1, ease: "power3" });
      const yToTitle = gsap.quickTo(titleRef.current, "y", { duration: 1, ease: "power3" });

      const handleMouseMove = (e) => {
        if (!titleRef.current) return;
        const { clientX, clientY, innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5);
        const y = (clientY / innerHeight - 0.5);
        xToTitle(x * 20);
        yToTitle(y * 20);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }

  }, { scope: containerRef, dependencies: [isMobile] });

  const generateStars = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  };

  const generateMeteors = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 10 + 2}s`,
      animationDuration: `${Math.random() * 2 + 3}s`,
    }));
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen mx-auto overflow-hidden bg-primary">

      <style>{`
          /* Text Animations */
          @keyframes gradient-flow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
          
          .text-gradient { 
            background: linear-gradient(90deg, #915EFF 0%, #00d8ff 50%, #915EFF 100%); 
            background-size: 200% auto; 
            color: transparent; 
            -webkit-background-clip: text; 
            background-clip: text; 
            animation: gradient-flow 3s linear infinite; 
            filter: drop-shadow(0 0 15px rgba(145, 94, 255, 0.4));
          }

          /* Glitch Logic */
          .hero-glitch-wrapper { position: relative; display: inline-block; cursor: pointer; }
          .hero-glitch { position: relative; font-weight: 900; }
          .hero-glitch::before, .hero-glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #050816; display: none; }
          .hero-glitch::before { color: #915EFF; left: 2px; text-shadow: -2px 0 #ffffff; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
          .hero-glitch::after { color: #00ffff; left: -2px; text-shadow: -2px 0 #00ffff; clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); }
          
          .hero-glitch-wrapper:hover .hero-glitch::before { display: block; animation: glitch-anim-1 0.4s infinite linear alternate-reverse; }
          .hero-glitch-wrapper:hover .hero-glitch::after { display: block; animation: glitch-anim-2 0.4s infinite linear alternate-reverse; }

          .mobile-auto-glitch .hero-glitch::before { display: block; animation: glitch-anim-1 3s infinite linear alternate-reverse; }
          .mobile-auto-glitch .hero-glitch::after { display: block; animation: glitch-anim-2 3s infinite linear alternate-reverse; }

          @keyframes glitch-anim-1 { 
            0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 2px); }
            5% { clip-path: inset(80% 0 10% 0); transform: translate(2px, -2px); } 
            10% { clip-path: inset(10% 0 50% 0); transform: translate(-2px, 0); }
            15% { clip-path: inset(0 0 0 0); transform: translate(0, 0); display: none; } 
            100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); display: none; }
          }
          @keyframes glitch-anim-2 { 
            0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -2px); }
            5% { clip-path: inset(30% 0 20% 0); transform: translate(-2px, 2px); }
            10% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 0); }
            15% { clip-path: inset(0 0 0 0); transform: translate(0, 0); display: none; } 
            100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); display: none; }
          }
          
          @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(20px); } }
          .animate-bounce-slow { animation: bounce-slow 1.5s infinite; }

          /* Moving Gradient Glow Grid */
          @keyframes grid-glow-move {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
          }

          .mobile-tech-grid {
            width: 100%; height: 100%;
            position: absolute; inset: 0;
            
            /* Colorful Animated Gradient */
            background: linear-gradient(135deg, rgba(145, 94, 255, 0.4) 0%, rgba(0, 216, 255, 0.4) 50%, rgba(145, 94, 255, 0.4) 100%);
            background-size: 200% 200%;
            animation: grid-glow-move 8s ease infinite; /* Moves the colors */

            /* Mask for Grid Shape */
            mask-image: 
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px);
            mask-size: 40px 40px;
            -webkit-mask-image: 
              linear-gradient(to right, black 1px, transparent 1px),
              linear-gradient(to bottom, black 1px, transparent 1px);
            -webkit-mask-size: 40px 40px;
          }

          /* Fade Overlay to soften edges */
          .mobile-grid-fade {
            position: absolute; inset: 0;
            background: radial-gradient(circle at center, transparent 30%, ${theme === 'light' ? '#f8fafc' : '#050816'} 90%);
            pointer-events: none;
          }

          /* Other Effects */
          .scanline {
            width: 100%; height: 100%;
            background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
            background-size: 100% 4px;
            position: absolute; pointer-events: none; z-index: 10; opacity: 0.6;
          }
          
          
          @keyframes float-blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
          .blob-purple { position: absolute; top: 20%; left: 20%; width: 300px; height: 300px; background: #915EFF; filter: blur(80px); opacity: 0.4; border-radius: 50%; animation: float-blob 10s infinite ease-in-out; }
          .blob-cyan { position: absolute; bottom: 20%; right: 10%; width: 250px; height: 250px; background: #00d8ff; filter: blur(80px); opacity: 0.3; border-radius: 50%; animation: float-blob 12s infinite ease-in-out reverse; }
          

          @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }
          .star { position: absolute; background: white; border-radius: 50%; width: 2px; height: 2px; animation: twinkle 4s infinite ease-in-out; }
          @keyframes meteor { 0% { transform: rotate(215deg) translateX(0); opacity: 1; } 70% { opacity: 1; } 100% { transform: rotate(215deg) translateX(-500px); opacity: 0; } }
          .meteor { position: absolute; top: -50px; width: 150px; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,0)); transform: rotate(215deg); opacity: 0; filter: drop-shadow(0 0 6px rgba(255,255,255,0.8)); }
      `}</style>

      <div ref={revealRef} className="w-full h-full relative">
        <div className={`absolute inset-0 top-[140px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col items-center justify-start pt-20 gap-5 z-20 pointer-events-none text-center`}>
          <div>
            <div ref={titleRef} className="relative pointer-events-auto">
              <h1 className="font-black text-text-primary lg:text-[100px] sm:text-[75px] xs:text-[60px] text-[50px] lg:leading-[110px] mt-2 drop-shadow-2xl">
                <div className="overflow-hidden">
                  <div className="hero-text-line">Hi, I'm <br className="sm:hidden" /></div>
                </div>
                <div className="overflow-hidden">
                  <div className="hero-text-line">
                    <span className={`hero-glitch-wrapper ${isMobile ? 'mobile-auto-glitch' : ''}`}>
                      <span className="hero-glitch tracking-widest text-gradient" data-text="SWAYAM">SWAYAM</span>
                    </span>
                  </div>
                </div>
              </h1>
            </div>

            <div ref={subtextRef} className="relative mt-6">
              <div className="overflow-hidden flex justify-center">
                <p className="text-secondary font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[18px] lg:leading-[40px] hero-sub-line drop-shadow-md">
                  I Design and Develop
                </p>
              </div>
              <div className="overflow-hidden flex justify-center">
                <p className="text-secondary font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[18px] lg:leading-[40px] hero-sub-line drop-shadow-md">
                  Immersive 3D Experiences
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full z-0">
          {isMobile ? (
            <div className={`relative w-full h-full overflow-hidden ${theme === 'light' ? 'bg-[#f8fafc]' : 'bg-[#050816]'}`}>
              <div className="scanline" />
              <div className="blob-purple" />
              <div className="blob-cyan" />
              <div className="blob-purple" />
              <div className="blob-cyan" />

              {generateMeteors(4).map(meteor => (
                <div key={meteor.id} className="meteor" style={{ left: meteor.left, animationDelay: meteor.animationDelay, animationDuration: meteor.animationDuration }} />
              ))}

              <div className="absolute inset-0 mobile-tech-grid" />
              <div className="absolute inset-0 mobile-grid-fade" />
            </div>
          ) : (
            <Suspense fallback={null}>
              <ComputersCanvas />
            </Suspense>
          )}
        </div>

        <div
          ref={scrollRef}
          className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-30 pointer-events-auto cursor-pointer'
          onClick={() => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-12 h-12 text-secondary opacity-50 hover:text-text-primary transition-colors duration-300 animate-bounce-slow"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
    </section >
  );
};

export default Hero;