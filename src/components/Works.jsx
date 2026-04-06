import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { styles } from "../styles";
import { supabase } from "../config/supabaseClient";

gsap.registerPlugin(ScrollTrigger);

const ProjectRow = ({ project, index, setActiveMedia, setIsHovering }) => {
  const rowRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div
      ref={rowRef}
      className="project-row relative border-b-[3px] bg-nb-bg border-nb-border-muted py-12 lg:py-16 px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between transition-all duration-150 group overflow-hidden hover:bg-nb-surface hover:border-nb-accent border-l-[8px] hover:border-l-nb-accent border-l-transparent"
      onMouseEnter={() => {
        setActiveMedia({
          url: project.video || project.image,
          type: project.video ? "video" : "image"
        });
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <div className="relative z-10 flex gap-6 lg:gap-10 items-start w-full lg:w-auto">
        <span className="text-nb-muted font-mono font-bold text-xl lg:text-2xl mt-1 border-[3px] border-nb-border px-3 py-1 bg-nb-bg group-hover:bg-nb-accent group-hover:text-[#0D0D0D] transition-colors">
          0{index + 1}
        </span>

        <div className="flex flex-col gap-4 cursor-default w-full">
          <h3 className="text-nb-text font-space font-black text-[28px] lg:text-[45px] leading-none uppercase tracking-tighter transition-all duration-300 lg:group-hover:translate-x-4">
            {project.name}
          </h3>

          <div className="lg:hidden w-full h-56 sm:h-72 border-[3px] border-nb-border my-6 relative bg-[#0D0D0D] shadow-[6px_6px_0_#FFF]">
            {project.video ? (
              isVideoPlaying ? (
                <video
                  src={project.video}
                  className="w-full h-full object-cover filter"
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
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border-[3px] border-nb-border bg-nb-accent px-6 py-3 font-mono font-bold text-[#0D0D0D] shadow-[4px_4px_0_#FFF] group-hover/vid:-translate-y-1 hover:shadow-[6px_6px_0_#FFF] transition-all">
                      [ PLAY DEMO ]
                    </div>
                  </div>
                </div>
              )
            ) : (
              <img src={project.image} alt={project.name} className="w-full h-full object-cover grayscale opacity-70 border-[3px]" />
            )}
          </div>

          <p className="text-nb-muted text-[14px] lg:text-[16px] max-w-xl font-space font-medium leading-relaxed mb-2 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag, i) => {
              const isObject = typeof tag === 'object' && tag !== null;
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
                  className={`font-mono text-[10px] sm:text-[12px] font-bold px-3 py-1 uppercase border-[2px] border-nb-border shadow-[2px_2px_0_#FFF] ${bgColorClass} ${isLight ? "text-black" : "text-white"}`}
                >
                  {tagName}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative z-20 flex flex-wrap sm:flex-nowrap items-center gap-4 mt-8 lg:mt-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-x-8 lg:group-hover:translate-x-0 transition-all duration-300">

        {project.live_link && (
          <button
            onClick={(e) => { e.stopPropagation(); window.open(project.live_link, "_blank"); }}
            className="nb-button bg-nb-bg text-nb-text py-2 px-4 text-xs whitespace-nowrap !shadow-[4px_4px_0_#FFF] hover:!shadow-[6px_6px_0_var(--nb-accent)]"
          >
            [ LIVE VIEW ]
          </button>
        )}

        {project.source_code_link && (
          <button
            onClick={(e) => { e.stopPropagation(); window.open(project.source_code_link, "_blank"); }}
            className="nb-button bg-nb-surface text-nb-text py-2 px-4 text-xs whitespace-nowrap flex items-center gap-2 !shadow-[4px_4px_0_#FFF] hover:!shadow-[6px_6px_0_var(--nb-accent)]"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github" className="w-4 h-4 filter invert" />
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
          .from('projects')
          .select('*')
          .order('order', { ascending: true });

        if (error) throw error;

        setProjects(data);

        if (data.length > 0) {
          setActiveMedia({
            url: data[0].video || data[0].image,
            type: data[0].video ? "video" : "image"
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
    <section ref={containerRef} id="work" className="relative bg-nb-bg bg-dot-interactive min-h-screen py-16 lg:py-24 overflow-clip z-10 border-b-[3px] border-nb-border-muted">

      <div
        ref={cursorImageRef}
        className="fixed top-0 left-0 hidden lg:flex items-center justify-center w-[550px] max-h-[400px] pointer-events-none z-[100] border-[4px] border-nb-border shadow-[12px_12px_0_var(--nb-accent)] bg-nb-bg"
        style={{ willChange: "transform, opacity", opacity: 0, transform: "scale(0.8)" }}
      >
        {activeMedia.url && (
          activeMedia.type === "video" ? (
            <div className="w-full aspect-video relative p-2 bg-nb-surface">
              <video
                src={activeMedia.url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover grayscale border-[3px] border-nb-border"
              />
            </div>
          ) : (
            <div className="w-full relative p-2 bg-nb-surface">
              <img
                src={activeMedia.url}
                alt="preview"
                className="w-full h-full object-cover border-[3px] border-nb-border grayscale hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-nb-accent/10 border-[3px] border-transparent mix-blend-overlay"></div>
            </div>
          )
        )}
      </div>

      <div className={`${styles.paddingX} max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20 relative z-10`}>
        <div className="w-full lg:w-1/3 lg:self-start relative z-30">
          <div ref={leftColumnRef} className="border-[3px] border-nb-border bg-nb-surface p-6 shadow-[8px_8px_0_#FFF] block mb-10 w-full max-w-[400px]">
            <p className={styles.sectionSubText}>// 03 MY WORK</p>
            <h2 className={styles.sectionHeadText}>ARCHIVES.</h2>
            <div className="w-full h-[4px] bg-nb-border my-6"></div>
            <p className="text-nb-muted font-space font-medium text-[16px] leading-[1.6]">
              A selection of my recent works.
              <br />
              <span className="hidden lg:inline bg-nb-accent text-[#0D0D0D] px-1 ml-1 font-bold"> Hover to see live previews. </span>
              <span className="lg:hidden"> Tap play to watch project demos.</span>
            </p>
          </div>
        </div>

        <div ref={rightColumnRef} className="w-full lg:w-2/3 project-list border-t-[3px] border-nb-border-muted relative bg-nb-bg z-10">

          {loading ? (
            <div className="py-20 text-center font-mono font-bold text-nb-accent animate-pulse text-xl tracking-widest">[ LOADING SYSTEM DATA ]</div>
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
            <a href="https://github.com/SinghSwayam?tab=repositories" target="_blank" rel="noreferrer">
              <button className="nb-button bg-nb-bg text-nb-text shadow-[8px_8px_0_#FFF] hover:shadow-[10px_10px_0_var(--nb-accent)] px-8 py-5 text-xl tracking-widest">
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