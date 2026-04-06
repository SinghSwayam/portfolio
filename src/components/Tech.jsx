import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { skillsData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Tech = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    // ✅ Pin header but keep gap from navbar
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: headerRef.current,

        start: "top 87px",   // 🔥 change this value (80–140px based on navbar height)

        endTrigger: containerRef.current,
        end: "bottom bottom",

        pin: true,
        pinSpacing: false,
      });
    });

    // ✅ Category animations (your current one)
    gsap.utils.toArray(".tech-category").forEach((category) => {
      gsap.from(category, {
        scrollTrigger: {
          trigger: category,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="tech"
      className={`${styles.padding} max-w-7xl mx-auto relative z-0 min-h-screen flex flex-col border-b-[3px] border-nb-border-muted`}
    >

      {/* 🔥 HEADER (PIN TARGET) */}
      <div ref={headerRef} className="relative z-20 mb-10 lg:mb-20">
        <div className="w-full flex flex-col justify-center items-start bg-nb-bg border-[3px] border-nb-border p-6 shadow-[8px_8px_0_#FFF]">
          <p className={styles.sectionSubText}>// 02 SKILLS</p>
          <h2 className={styles.sectionHeadText}>TECH STACK.</h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col gap-12 lg:gap-20 pb-20 relative z-10 pt-10">
        {skillsData.map((category, index) => (
          <div key={index} className="tech-category w-full">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="hidden sm:block h-[4px] w-12 bg-nb-border"></div>

              <h3 className="text-nb-text text-[24px] lg:text-[32px] font-black font-space tracking-tight uppercase px-4 py-1 border-[3px] border-nb-border bg-nb-surface shadow-[4px_4px_0_#FFF]">
                {category.category}
              </h3>

              <div className="h-[4px] flex-1 bg-nb-border-muted w-full mt-4 sm:mt-0"></div>
            </div>

            <div className="flex flex-wrap justify-start gap-4 lg:gap-6">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="w-24 h-28 sm:w-32 sm:h-36 border-[3px] border-nb-border-muted bg-nb-surface flex flex-col items-center justify-center gap-4 group hover:border-nb-accent hover:bg-nb-accent hover:shadow-[6px_6px_0_#FFF] hover:-translate-y-1 transition-all duration-150 cursor-default"
                >
                  <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center transition-transform group-hover:scale-110">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                    />
                  </div>

                  <p className="font-mono text-nb-text text-[10px] sm:text-[12px] font-bold group-hover:text-[#0D0D0D] transition-colors text-center px-2 uppercase">
                    {skill.name}
                  </p>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Tech;