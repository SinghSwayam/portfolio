import React, { useEffect, useState, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tech from './components/Tech';
import Works from './components/Works';
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GitHubActivity from "./components/GitHubActivity";
import ThemeToggle from "./components/design/ThemeToggle";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StarsCanvas = React.lazy(() => import("./canvas/Stars"));

const App = () => {
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

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
      <div className="relative z-0 bg-primary overflow-x-hidden duration-0">

        <ThemeToggle />

        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        <About />
        <Tech />
        <Works />

        <div className="hidden lg:block">
          <GitHubActivity />
        </div>

        <div className="relative z-0">
          <Contact />

          {!isMobile && (
            <Suspense fallback={null}>
              <StarsCanvas />
            </Suspense>
          )}
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;