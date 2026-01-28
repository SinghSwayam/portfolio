import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { projects } from "../constants";
import { SpotlightBackground } from "./design/SectionBackgrounds";
import useTheme from "../hooks/useTheme";

gsap.registerPlugin(ScrollTrigger);

const ProjectRow = ({ project, index, setActiveImage, setIsHovering }) => {
  const rowRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const theme = useTheme();

  const handleMouseMove = (e) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={rowRef}
      className="project-row group relative border-b border-white/10 py-12 lg:py-16 px-4 flex flex-col lg:flex-row items-start lg:items-center justify-between transition-colors overflow-hidden"
      onMouseEnter={() => {
        setActiveImage(project.image);
        setIsHovering(true);
        setIsInside(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsInside(false);
      }}
      onMouseMove={handleMouseMove}
    >

      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 hidden lg:block"
        style={{
          opacity: isInside ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(145, 94, 255, 0.1), transparent 40%)`,
        }}
      />

      <div className="relative z-10 flex gap-4 lg:gap-8 items-start w-full lg:w-auto">
        <span className="text-secondary cursor-default font-mono text-lg lg:text-xl group-hover:text-[#915EFF] transition-colors mt-1 lg:mt-2">
          0{index + 1}
        </span>

        <div className="flex flex-col gap-2 cursor-default w-full">
          <h3 className="text-text-primary text-[24px] lg:text-[45px] font-bold leading-tight transition-transform duration-300 lg:group-hover:translate-x-2">
            {project.name}
          </h3>

          <div className="lg:hidden w-full h-52 sm:h-64 rounded-lg overflow-hidden my-4 border border-white/10 relative">
            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#915EFF]/10"></div>
          </div>

          <p className="text-secondary text-[14px] lg:text-[16px] max-w-lg leading-relaxed mb-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag.name} className={`text-[10px] lg:text-xs px-2 py-1 rounded border border-white/10 ${tag.color} ${theme === "light" ? "invert" : ""}`}>
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-20 flex items-center gap-4 mt-6 lg:mt-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-4 lg:group-hover:translate-x-0 transition-all duration-300">
        {project.live_link && (
          <button
            onClick={(e) => { e.stopPropagation(); window.open(project.live_link, "_blank"); }}
            className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-secondary/20 bg-tertiary backdrop-blur-md flex items-center justify-center hover:bg-[#915EFF] hover:border-[#915EFF] transition-all group/btn shadow-lg ${theme === "light" ? "border-[#915EFF]" : ""}`}
          >
            <svg className="w-5 h-5 lg:w-6 lg:h-6 text-text-primary group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); window.open(project.source_code_link, "_blank"); }}
          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-secondary/20 bg-tertiary backdrop-blur-md flex items-center justify-center hover:bg-[#915EFF] hover:border-[#915EFF] transition-all group/btn shadow-lg ${theme === "light" ? "border-[#915EFF]" : ""}`}
        >
          <img
            src={theme === "light" ? "https://cdn-icons-png.flaticon.com/512/25/25231.png" : "https://cdn-icons-png.flaticon.com/512/25/25231.png"}
            alt="github"
            className={`w-5 h-5 lg:w-6 lg:h-6 ${theme === "light" ? "" : "invert"} group-hover/btn:invert-0 group-hover/btn:brightness-0 transition-all`}
          />
        </button>
      </div>
    </div>
  );
};


const Works = () => {
  const containerRef = useRef(null);
  const cursorImageRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const theme = useTheme();

  const [activeImage, setActiveImage] = useState(projects[0].image);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const xMove = gsap.quickTo(cursorImageRef.current, "x", { duration: 0.4, ease: "power3" });
      const yMove = gsap.quickTo(cursorImageRef.current, "y", { duration: 0.4, ease: "power3" });
      const rotateMove = gsap.quickTo(cursorImageRef.current, "rotation", { duration: 0.4, ease: "power3" });

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth } = window;

        const isRightSide = clientX > innerWidth * 0.55;
        const imageWidth = cursorImageRef.current?.offsetWidth || 550;

        const targetX = isRightSide ? clientX - imageWidth - 15 : clientX + 15;
        const targetRotation = isRightSide ? -1.5 : 1.5;

        xMove(targetX);
        yMove(clientY + 15);
        rotateMove(targetRotation);
      };

      window.addEventListener("mousemove", handleMouseMove);

      ScrollTrigger.create({
        trigger: rightColumnRef.current,
        start: "top top+=100",
        end: () => `bottom bottom-=100`,
        pin: leftColumnRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    });

  }, { scope: containerRef });

  useEffect(() => {
    gsap.to(cursorImageRef.current, {
      scale: isHovering ? 1 : 0,
      opacity: isHovering ? 1 : 0,
      duration: 0.35,
      ease: "back.out(1.2)",
    });
  }, [isHovering]);

  return (
    <section ref={containerRef} id="work" className="relative bg-primary min-h-screen py-16 lg:py-24 overflow-x-hidden">

      <SpotlightBackground />

      <div
        ref={cursorImageRef}
        className="fixed top-0 left-0 hidden lg:flex items-center justify-center w-[550px] max-h-[400px] rounded-xl overflow-hidden pointer-events-none z-[100] border border-white/10 shadow-2xl"
        style={{ willChange: "transform, opacity" }}
      >
        <img
          src={activeImage}
          alt="preview"
          className="w-full h-full object-contain bg-black/40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className={`${styles.paddingX} max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 relative z-10`}>
        {/* Left Column */}
        <div className="w-full lg:w-1/3">
          <div ref={leftColumnRef}>
            <p className={styles.sectionSubText}>My work</p>
            <h2 className={styles.sectionHeadText}>Projects.</h2>
            <p className="text-secondary text-[16px] lg:text-[17px] leading-[30px] mt-4">
              A selection of my recent works.
              <span className="hidden lg:inline"> Hover to see snapshots and dive into the tech details.</span>
              <span className="lg:hidden"> Scroll to explore projects.</span>
            </p>
            <div className="w-20 h-1 bg-[#915EFF] mt-6 shadow-[0_0_20px_#915EFF]" />
          </div>
        </div>

        {/* Right Column */}
        <div ref={rightColumnRef} className="w-full lg:w-2/3 project-list border-t border-white/10">
          {projects.map((project, index) => (
            <ProjectRow
              key={index}
              project={project}
              index={index}
              setActiveImage={setActiveImage}
              setIsHovering={setIsHovering}
            />
          ))}

          <div className="mt-20">
            <a href="https://github.com/SinghSwayam?tab=repositories" target="_blank" rel="noreferrer">
              <button className={`group relative overflow-hidden rounded-full bg-tertiary border px-10 py-4 transition-all duration-300 hover:border-[#915EFF] ${theme === "light" ? "border-[#915EFF] shadow-lg" : "border-white/10"}`}>
                <div className={`absolute inset-0 bg-[#915EFF] translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out `}></div>
                <span className={`relative z-10 font-bold text-lg tracking-widest uppercase text-secondary group-hover:text-white transition-colors duration-300`}>
                  View All Archives
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;