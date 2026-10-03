import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { skillsData } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Bauhaus accent color cycling per skill card (on hover)
const hoverAccents = ["#D02020", "#1040C0", "#F0C020"];

const Tech = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 87px",
        endTrigger: containerRef.current,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
      });
    });

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
      className={`${styles.padding} max-w-7xl mx-auto relative z-0 min-h-screen flex flex-col border-b-4 border-bh-border`}
    >
      {/* Pinned Header */}
      <div ref={headerRef} className="relative z-20 mb-10 lg:mb-20">
        <div className="w-full flex flex-col justify-center items-start bg-white  border-4 border-bh-border p-6 shadow-[8px_8px_0px_0px_#121212]">
          <p className={`${styles.sectionSubText} !text-bh-fg opacity-70`}>// 02 SKILLS</p>
          <h2 className={`${styles.sectionHeadText} !text-bh-fg`}>TECH STACK.</h2>
        </div>
      </div>

      {/* Skill categories */}
      <div className="flex flex-col gap-12 lg:gap-20 pb-20 relative z-10 pt-10">
        {skillsData.map((category, catIndex) => (
          <div key={catIndex} className="tech-category w-full">

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <div className="hidden sm:block h-[4px] w-12 bg-bh-border" />
              <h3 className="text-bh-fg text-[24px] lg:text-[32px] font-black font-outfit tracking-tighter uppercase px-4 py-1 border-4 border-bh-border bg-white shadow-[4px_4px_0px_0px_#121212]">
                {category.category}
              </h3>
              <div className="h-[4px] flex-1 bg-bh-border w-full mt-4 sm:mt-0" />
            </div>

            <div className="flex flex-wrap justify-start gap-4 lg:gap-6">
              {category.skills.map((skill, skillIndex) => {
                const accent = hoverAccents[skillIndex % hoverAccents.length];
                return (
                  <div
                    key={skill.name}
                    className="w-24 h-28 sm:w-32 sm:h-36 border-4 border-bh-border bg-white flex flex-col items-center justify-center gap-4 group hover:border-bh-border hover:-translate-y-1 transition-all duration-150 cursor-default shadow-[4px_4px_0px_0px_#121212] hover:shadow-[6px_6px_0px_0px_#121212]"
                    style={{}}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#FFFFFF";
                    }}
                  >
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center transition-transform group-hover:scale-110">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                      />
                    </div>
                    <p className="font-outfit text-bh-fg text-[10px] sm:text-[12px] font-black group-hover:text-white transition-colors text-center px-2 uppercase tracking-wide">
                      {skill.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tech;