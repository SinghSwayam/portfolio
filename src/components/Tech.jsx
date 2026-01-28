import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";

import { styles } from "../styles";
import { skillsData } from "../constants";
import { GridBeamBackground } from "./design/SectionBackgrounds";
import useTheme from "../hooks/useTheme";

gsap.registerPlugin(ScrollTrigger);

const Tech = () => {
  const containerRef = useRef();
  const headerRef = useRef();
  const glassRef = useRef();
  const lineRef = useRef();
  const theme = useTheme();

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 70px",
        endTrigger: containerRef.current,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,

        onToggle: (self) => {
          if (self.isActive) {
            glassRef.current.classList.add("tech-header-pinned");

            gsap.fromTo(lineRef.current,
              { scaleX: 0, opacity: 1 },
              { scaleX: 1, opacity: 1, duration: 1.5, ease: "elastic.out(1, 0.5)", overwrite: true }
            );

          } else {
            glassRef.current.classList.remove("tech-header-pinned");

            gsap.to(lineRef.current, {
              scaleX: 0, opacity: 0, duration: 0.2, ease: "power2.in", overwrite: true
            });
          }
        }
      });
    });

    gsap.utils.toArray(".tech-category").forEach((category) => {
      gsap.from(category, {
        scrollTrigger: {
          trigger: category,
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        ease: "power1.out"
      });
    });

    gsap.to(".skill-card", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.1, from: "random" },
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="tech" className={`${styles.padding} max-w-7xl mx-auto relative z-0 min-h-screen flex flex-col`}>

      <GridBeamBackground />

      <div className="relative z-20">
        <div ref={headerRef} className="tech-header mb-10 lg:mb-20 relative mix-blend-normal will-change-transform">

          <div
            ref={glassRef}
            className="py-6 pt-8 rounded-2xl border-b border-transparent w-full flex flex-col items-center justify-center transition-colors"
            style={{ backgroundColor: 'transparent' }}
          >
            <p className={styles.sectionSubText}>What I bring to the table</p>
            <h2 className={styles.sectionHeadText}>Technical Skills.</h2>
          </div>

          <div
            ref={lineRef}
            className="w-full h-[4px] bg-gradient-to-r from-transparent via-[#915EFF] to-transparent opacity-0 transform scale-x-0 origin-center rounded-full"
          ></div>
        </div>
      </div>

      <div className="flex flex-col gap-16 lg:gap-24 pb-20 relative z-10 pt-10 lg:pt-20">
        {skillsData.map((category, index) => (
          <div key={index} className="tech-category">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-10 bg-[#915EFF] shadow-[0_0_10px_#915EFF]"></div>
              <h3 className="text-text-primary text-[20px] lg:text-[24px] font-bold tracking-wider uppercase">
                {category.category}
              </h3>
              <div className="h-[1px] flex-1 bg-text-primary/10"></div>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 lg:gap-6">
              {category.skills.map((skill) => (
                <Tilt
                  key={skill.name}
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  perspective={1000}
                  scale={1.1}
                  transitionSpeed={450}
                  className="skill-card"
                >
                  <div
                    className="w-24 h-28 sm:w-32 sm:h-36 rounded-xl flex flex-col items-center justify-center gap-3 transition-all duration-300 group relative overflow-hidden glass-card-tech  shadow-sm"
                  >
                    <div className="absolute inset-0 bg-[#915EFF] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="w-10 h-10 sm:w-14 sm:h-14 object-contain z-10 p-2 bg-secondary/5 rounded-full border border-secondary/5 group-hover:border-[#915EFF]/50 transition-colors">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className={`w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 ${skill.name.toLowerCase() === "github" && theme === "light" ? "invert" : ""}`}
                      />
                    </div>
                    <p className="text-secondary text-[10px] sm:text-[14px] font-medium group-hover:text-text-primary transition-colors z-10 text-center px-1">
                      {skill.name}
                    </p>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </Tilt>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tech;