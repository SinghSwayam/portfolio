import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tech from './components/Tech';
import Works from './components/Works';
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GitHubActivity from "./components/GitHubActivity";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScroll, motion, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll();

  

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  useEffect(() => {
    // Bauhaus: crisp, mechanical scroll — no floaty easing
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function update(time) {
      lenis.raf(time * 1000);
    }

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-bh-bg overflow-x-hidden duration-0 min-h-screen">
        <div className="relative z-[120]">
          <Navbar />
        </div>

        <Hero />

        <About />
        <Tech />
        <Works />

        <div className="hidden lg:block border-t-[4px] border-bh-border relative z-10 bg-bh-bg bh-dot-pattern-dark">
          <GitHubActivity />
        </div>

        <div className="relative z-20 border-t-[4px] border-bh-border bg-bh-yellow">
          <Contact />
        </div>

        <Footer />
      </div>

      <motion.div
        className={`fixed top-0 left-0 right-0 h-2 bg-black/50 border-white border-2 z-[9999] origin-left`}
        style={{
          scaleX: scrollYProgress,
        }}
      />
    </BrowserRouter>
  );
}

export default App;