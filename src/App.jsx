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

gsap.registerPlugin(ScrollTrigger);

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
    // Adjusted Lenis settings for a more snappy scroll (neubrutalism feel)
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quicker out ease, less floaty
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
      <div className="relative z-0 bg-nb-bg bg-dot-pattern overflow-x-hidden duration-0 min-h-screen">
        <div className="relative z-[120]">
          <Navbar />
        </div>

        <Hero />

        <About />
        <Tech />
        <Works />

        <div className="hidden lg:block border-t-[3px] border-nb-border-muted relative z-10 bg-nb-bg bg-dot-interactive">
          <GitHubActivity />
        </div>

        <div className="relative z-20 border-t-[3px] border-nb-border-muted bg-nb-accent">
          <Contact />
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;