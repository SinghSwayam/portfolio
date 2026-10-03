import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { supabase } from "../config/supabaseClient";
import { FaGithub } from "react-icons/fa";


gsap.registerPlugin(ScrollTrigger);

const ProjectRow = ({ project, index, setActiveMedia, setIsHovering }) => {
  const rowRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Bauhaus accent per row — cycles Red / Blue / Yellow
  const accentColors = ["#D02020", "#1040C0", "#F0C020"];
  const accent = accentColors[index % accentColors.length];
  const accentText = accent === "#F0C020" ? "#121212" : "#FFFFFF";

  return (
    <div
      ref={rowRef}
      className="project-row relative border-b-4 bg-bh-bg border-bh-border py-12 lg:py-16 px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between transition-all duration-150 group overflow-hidden hover:bg-white border-l-[8px] border-l-transparent"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeftColor = accent;
        setActiveMedia({
          url: project.video || project.image,
          type: project.video ? "video" : "image",
        });
        setIsHovering(true);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeftColor = "transparent";
        setIsHovering(false);
      }}
    >
      <div className="relative z-10 flex gap-6 lg:gap-10 items-start w-full lg:w-auto">
        {/* Row index with Bauhaus accent */}
        <span
          className="font-outfit font-black text-xl lg:text-2xl mt-1 border-4 border-bh-border px-3 py-1 bg-white transition-colors"
          style={{}}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = accent;
            e.currentTarget.style.color = accentText;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FFFFFF";
            e.currentTarget.style.color = "#121212";
          }}
        >
          0{index + 1}
        </span>

        <div className="flex flex-col gap-4 cursor-default w-full">
          <h3 className="text-bh-fg font-outfit font-black text-[28px] lg:text-[45px] leading-none uppercase tracking-tighter transition-all duration-300 lg:group-hover:translate-x-4">
            {project.name}
          </h3>

          {/* Mobile media block */}
          <div className="lg:hidden w-full h-56 sm:h-72 border-4 border-bh-border my-6 relative bg-bh-muted shadow-[6px_6px_0px_0px_#121212]">
            {project.video ? (
              isVideoPlaying ? (
                <video
                  src={project.video}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  playsInline
                  loop
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer group/vid"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover opacity-80 grayscale"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="border-4 border-bh-border px-6 py-3 font-outfit font-black text-[#121212] shadow-[4px_4px_0px_0px_#121212] group-hover/vid:-translate-y-1 transition-all"
                      style={{ backgroundColor: accent, color: accentText }}
                    >
                      [ PLAY DEMO ]
                    </div>
                  </div>
                </div>
              )
            ) : (
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover opacity-70"
              />
            )}
          </div>

          <p className="text-[#555] text-[14px] lg:text-[16px] max-w-xl font-outfit font-medium leading-relaxed mb-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, i) => {
              const isObject = typeof tag === "object" && tag !== null;
              const tagName = isObject ? tag.name : tag;
              const bgColorClass = `bg-${tag.color}`;
              const isLight =
                tag.color.includes("100") ||
                tag.color.includes("200") ||
                tag.color.includes("300") ||
                tag.color === "white" ||
                tag.color.includes("400");
              return (
                <span
                  key={i}
                  className={`font-outfit text-[10px] sm:text-[12px] font-black px-3 py-1 uppercase border-2 border-bh-border shadow-[2px_2px_0px_0px_#121212] ${bgColorClass} ${isLight ? "text-black" : "text-white"}`}
                >
                  {tagName}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-20 flex flex-col flex-wrap sm:flex-nowrap items-center gap-4 mt-8 lg:mt-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-8 lg:group-hover:translate-x-0 transition-all duration-300">
        {project.live_link && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.live_link, "_blank");
            }}
            className="bh-btn bh-btn-red py-2 px-4 text-xs whitespace-nowrap"
          >
            [ LIVE VIEW ]
          </button>
        )}
        {project.source_code_link && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(project.source_code_link, "_blank");
            }}
            className="bh-btn bh-btn-outline py-2 px-4 text-xs flex !inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <FaGithub size={20} />
            [ CODE ]
          </button>
        )}
      </div>
    </div>
  );
};

const Works = () => {
  const containerRef = useRef(null);
  const cursorImageRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [activeMedia, setActiveMedia] = useState({ url: "", type: "image" });
  const [isHovering, setIsHovering] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order", { ascending: true });

        if (error) throw error;

        setProjects(data);

        if (data.length > 0) {
          setActiveMedia({
            url: data[0].video || data[0].image,
            type: data[0].video ? "video" : "image",
          });
        }
      } catch (error) {
        console.error("Error fetching projects:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useGSAP(() => {
    if (loading) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const xMove = gsap.quickTo(cursorImageRef.current, "x", { duration: 0.1, ease: "none" });
      const yMove = gsap.quickTo(cursorImageRef.current, "y", { duration: 0.1, ease: "none" });

      let pinTrigger = null;

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth } = window;
        const isRightSide = clientX > innerWidth * 0.55;
        const imageWidth = cursorImageRef.current?.offsetWidth || 550;
        const targetX = isRightSide ? clientX - imageWidth - 20 : clientX + 20;
        xMove(targetX);
        yMove(clientY + 20);
      };

      window.addEventListener("mousemove", handleMouseMove);

      if (leftColumnRef.current && rightColumnRef.current) {
        pinTrigger = ScrollTrigger.create({
          trigger: rightColumnRef.current,
          start: "top top+=100",
          end: () => `bottom bottom-=100`,
          pin: leftColumnRef.current,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (pinTrigger) pinTrigger.kill();
      };
    });
  }, { scope: containerRef, dependencies: [loading, projects] });

  useEffect(() => {
    if (!loading) {
      ScrollTrigger.refresh();
    }
  }, [loading]);

  useEffect(() => {
    if (cursorImageRef.current) {
      gsap.to(cursorImageRef.current, {
        scale: isHovering ? 1 : 0.8,
        opacity: isHovering ? 1 : 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative bg-bh-bg bh-dot-pattern-dark min-h-screen py-16 lg:py-24 overflow-clip z-10 border-b-4 border-bh-border"
    >
      {/* Floating preview (cursor follower) */}
      <div
        ref={cursorImageRef}
        className="fixed top-0 left-0 hidden lg:flex items-center justify-center w-[550px] max-h-[400px] pointer-events-none z-[100] border-4 border-bh-border shadow-[12px_12px_0px_0px_#00000099] bg-white"
        style={{ willChange: "transform, opacity", opacity: 0, transform: "scale(0.8)"}}
      >
        {activeMedia.url && (
          activeMedia.type === "video" ? (
            <div className={`w-full aspect-video relative p-2 `}
              style={{ backgroundColor: `#fff` }}
            >
              <video
                src={activeMedia.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover border-2 border-bh-border"
              />
            </div>
          ) : (
            <div className="w-full relative p-2 bg-bh-muted">
              <img
                src={activeMedia.url}
                alt="preview"
                className="w-full h-full object-cover border-2 border-bh-border transition-all duration-300"
              />
            </div>
          )
        )}
      </div>

      <div className={`${styles.paddingX} max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 relative z-10`}>
        {/* Left: Section header */}
        <div className="w-full lg:w-1/3 lg:self-start relative z-30">
          <div
            ref={leftColumnRef}
            className="border-4 border-bh-border bg-white p-6 shadow-[8px_8px_0px_0px_#121212] block mb-10 w-full max-w-[400px]"
          >
            <p className={styles.sectionSubText}>// 03 MY WORK</p>
            <h2 className={styles.sectionHeadText}>ARCHIVES.</h2>
            <div className="w-full h-[4px] bg-bh-border my-6" />
            <p className="text-[#555] font-outfit font-medium text-[16px] leading-[1.6]">
              A selection of my recent works.
              <br />
              <span className="hidden lg:inline bg-bh-yellow text-bh-fg px-1 ml-1 font-bold border border-bh-border">
                Hover to see live previews.
              </span>
              <span className="lg:hidden"> Tap play to watch project demos.</span>
            </p>
          </div>
        </div>

        {/* Right: Project list */}
        <div
          ref={rightColumnRef}
          className="w-full lg:w-2/3 project-list border-t-4 border-bh-border relative bg-bh-bg z-10"
        >
          {loading ? (
            <div className="py-20 text-center font-outfit font-black text-bh-red animate-pulse text-xl tracking-widest uppercase">
              [ LOADING SYSTEM DATA ]
            </div>
          ) : (
            projects.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                setActiveMedia={setActiveMedia}
                setIsHovering={setIsHovering}
              />
            ))
          )}

          <div className="mt-24 mb-10 text-center lg:text-left">
            <a
              href="https://github.com/SinghSwayam?tab=repositories"
              target="_blank"
              rel="noreferrer"
            >
              <button className="bh-btn bh-btn-outline shadow-[8px_8px_0px_0px_#121212] hover:shadow-[10px_10px_0px_0px_#D02020] hover:bg-bh-red hover:text-white px-8 py-5 text-lg tracking-widest transition-all">
                [ VIEW ALL REPOSITORIES ]
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;