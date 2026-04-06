import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import { styles } from "../styles";
import { services } from "../constants";
import { supabase } from "../config/supabaseClient";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const About = () => {
  const containerRef = useRef();
  const servicesLabelRef = useRef();
  const scrollTriggerRef = useRef(null);
  const staticTitleRef = useRef();

  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      const { data } = supabase
        .storage
        .from('portfolio-assets')
        .getPublicUrl('resume/resume.pdf');

      if (data) setResumeUrl(data.publicUrl);
    };
    fetchResume();
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const indicators = gsap.utils.toArray(".indicator-target");
      const slides = gsap.utils.toArray(".slide-content-desktop");
      const fill = document.querySelector(".fill-bar");

      gsap.set(fill, { scaleY: 0 });
      gsap.set(indicators, { color: "var(--nb-muted)", backgroundColor: "transparent" });
      gsap.set(indicators[0], { color: "#0D0D0D", backgroundColor: "var(--nb-accent)" });

      gsap.set(slides, { autoAlpha: 0 });

      slides.forEach((slide, i) => {
        if (i >= 2) {
          gsap.set(slide, { x: "100%", y: 0 });
        } else {
          gsap.set(slide, { y: "100%", x: 0 });
        }
      });

      gsap.set(slides[0], { autoAlpha: 1, y: 0, x: 0 });
      gsap.set(staticTitleRef.current, { autoAlpha: 0 });

      const stepDuration = 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=" + (indicators.length * 100) + "%",
          pin: true,
          scrub: 0, // Sharp scrubbing no smoothing
          onUpdate: (self) => {
            gsap.set(fill, { scaleY: self.progress });
          }
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;

      indicators.forEach((item, i) => {
        if (i === 0) return;

        const previousItem = indicators[i - 1];
        const previousSlide = slides[i - 1];
        const currentSlide = slides[i];

        const startTime = i * stepDuration - 0.25;

        // Sharp transitions using power4.inOut or SteppedEase like behavior
        tl.to(item, { color: "#0D0D0D", backgroundColor: "var(--nb-accent)", duration: 0.2 }, startTime)
          .to(previousItem, { color: "var(--nb-muted)", backgroundColor: "transparent", duration: 0.2 }, "<");

        if (i === 2) {
          tl.to(previousSlide, { autoAlpha: 0, y: "-100%", duration: 0.3, ease: "power3.inOut" }, startTime);
          tl.to(staticTitleRef.current, { autoAlpha: 1, duration: 0.1 }, startTime);
          tl.to(currentSlide, { autoAlpha: 1, x: "0%", duration: 0.3, ease: "power3.inOut" }, ">-0.1");
        }
        else if (i > 2) {
          tl.to(previousSlide, { autoAlpha: 0, x: "-100%", duration: 0.3, ease: "power3.inOut" }, startTime);
          tl.to(currentSlide, { autoAlpha: 1, x: "0%", duration: 0.3, ease: "power3.inOut" }, ">-0.1");
        }
        else {
          tl.to(previousSlide, { autoAlpha: 0, y: "-100%", duration: 0.3, ease: "power3.inOut" }, startTime);
          tl.to(currentSlide, { autoAlpha: 1, y: "0%", duration: 0.3, ease: "power3.inOut" }, ">-0.1");
        }

        tl.call(() => {
          if (i >= 2) {
            gsap.set(servicesLabelRef.current, { color: "#0D0D0D", backgroundColor: "var(--nb-accent)" });
          } else {
            gsap.set(servicesLabelRef.current, { color: "var(--nb-muted)", backgroundColor: "transparent" });
            if (i < 2) gsap.set(staticTitleRef.current, { autoAlpha: 0 });
          }
          const branch = item.querySelector(".tree-branch");
          if (branch) branch.classList.add("active");
          const prevBranch = previousItem.querySelector(".tree-branch");
          if (prevBranch) prevBranch.classList.remove("active");
        }, null, i * stepDuration);
      });
    });

  }, { scope: containerRef });

  const handleNavClick = (index) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const totalScroll = st.end - st.start;
    const targetScroll = st.start + (totalScroll * (index / (6 - 1))) + 5;
    gsap.to(window, { scrollTo: targetScroll, duration: 0.8, ease: "power3.inOut" });
  };

  return (
    <section ref={containerRef} id="about" className="relative w-full bg-nb-bg bg-dot-pattern overflow-hidden pt-10 pb-20 lg:pt-0 lg:pb-0 lg:h-screen lg:flex lg:items-center border-b-[3px] border-nb-border-muted z-10">

      {/* MOBILE VIEW */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 sm:px-16 flex flex-col gap-10 relative z-10">
        <div className="border-[3px] border-nb-border bg-nb-surface p-6 shadow-[8px_8px_0_#FFF]">
          <p className={styles.sectionSubText}>// 01 ABOUT</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
          
          <div className="w-full h-[3px] bg-nb-border my-6"></div>

          <div className="text-nb-muted text-[16px] leading-[1.8] font-space font-medium mb-6">
            I'm a skilled software developer with experience in TypeScript and
            JavaScript, and expertise in frameworks like React, Node.js, and
            Three.js. I thrive on turning complex problems into elegant,
            high-performance digital solutions that bridge the gap between
            functionality and immersive design.
          </div>

          <div className="text-nb-muted text-[16px] leading-[1.8] font-space font-medium mb-8">
            My journey into tech began with a simple curiosity for how things work
            under the hood. Today, I architect scalable web applications and
            interactive 3D experiences, always staying at the forefront of
            modern web standards and creative technology.
          </div>

          <a
            href={resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="nb-button bg-nb-accent text-[#0D0D0D] block text-center shadow-[6px_6px_0_#fff]"
          >
            DOWNLOAD RESUME
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-8 justify-center">
          {services.map((service, index) => {
            // Intentional minor offset for broken grid style
            const marginLeft = index % 2 === 0 ? "ml-0" : "ml-4";
            
            return (
                <div
                  key={index}
                  className={`nb-card p-6 flex flex-col items-start transition-all duration-150 nb-card-hover ${marginLeft}`}
                >
                  <div className="w-16 h-16 border-[3px] border-nb-border bg-nb-accent flex justify-center items-center shadow-[4px_4px_0_#FFFFFF] mb-6">
                    <img src={service.icon} alt={service.title} className="w-8 h-8 object-contain filter brightness-0" />
                  </div>
                  <h4 className="text-[24px] font-black font-space tracking-tight text-nb-text uppercase mb-2">
                    {service.title}
                  </h4>
                  <p className="text-nb-muted text-[14px] leading-relaxed font-space font-medium">{service.desc}</p>
                </div>
            )
          })}
        </div>
      </div>


      {/* DESKTOP VIEW */}
      <div className="hidden lg:flex max-w-7xl mx-auto w-full px-6 sm:px-16 gap-20 h-full relative z-10">
        
        {/* LEFT NAV PANEL */}
        <div className="w-1/3 flex flex-col justify-center relative z-20 h-full">
          <div className="mb-10 inline-block border-[3px] border-nb-border bg-nb-surface p-6 shadow-[8px_8px_0_#FFF]">
            <p className={styles.sectionSubText}>// 01 ABOUT</p>
            <h2 className={styles.sectionHeadText}>OVERVIEW.</h2>
          </div>
          
          <div className="relative pl-8 flex flex-col gap-4 font-mono font-bold uppercase tracking-widest text-sm">
            {/* Hard track line */}
            <div className="absolute top-0 left-0 w-[4px] h-full bg-nb-border-muted z-0"></div>
            {/* Fill logic line */}
            <div className="fill-bar absolute top-0 left-0 w-[4px] h-full bg-nb-accent origin-top scale-y-0 z-10 transition-none"></div>

            <div onClick={() => handleNavClick(0)} className="indicator-target px-2 py-1 cursor-pointer border-2 border-transparent w-fit transition-all hover:translate-x-2">INTRODUCTION</div>
            <div onClick={() => handleNavClick(1)} className="indicator-target px-2 py-1 cursor-pointer border-2 border-transparent w-fit transition-all hover:translate-x-2">BIOGRAPHY</div>
            
            <div className="flex flex-col gap-2 mt-4">
              <div ref={servicesLabelRef} className="px-2 py-1 w-fit transition-all border-2 border-transparent">SERVICES</div>
              <div className="flex flex-col gap-2 pl-6 relative">
                {services.map((service, index) => (
                  <div key={index} onClick={() => handleNavClick(index + 2)} className="indicator-target px-2 py-1 cursor-pointer w-fit transition-all hover:translate-x-2 relative group flex items-center">
                    <div className="tree-branch absolute -left-8 w-6 h-[4px] bg-nb-border-muted transition-none group-hover:bg-nb-accent"></div>
                    {service.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SLIDE CONTENT */}
        <div className="w-2/3 h-full relative right-content flex items-center justify-center">
          
          <div ref={staticTitleRef} className="absolute top-[15%] left-0 w-full z-20 pointer-events-none">
            <h3 className="font-space font-black text-nb-text text-[40px] uppercase tracking-tighter border-b-[4px] border-nb-border w-fit">WHAT I DO //</h3>
          </div>

          <div className="slide-content-desktop absolute top-0 left-0 w-full h-full flex flex-col justify-center pl-8">
            <div className="nb-card p-10 max-w-xl">
              <h3 className="font-space font-black text-nb-text text-[40px] uppercase tracking-tighter mb-6 bg-nb-accent text-[#080808] w-fit px-4 border-[3px] border-nb-border shadow-[4px_4px_0_#FFF]">HELLO!</h3>
              <p className="font-space text-nb-text text-[18px] leading-[1.8] font-medium">
                I'm a skilled software developer with a passion for building robust website
                infrastructure. With deep expertise in <span className="bg-nb-accent text-[#0D0D0D] px-1 font-bold">TypeScript</span>, <span className="bg-nb-accent text-[#0D0D0D] px-1 font-bold">React</span>,
                and <span className="bg-nb-accent text-[#0D0D0D] px-1 font-bold">Node.js</span>, I focus on creating scalable, efficient, and user-centric
                solutions. I enjoy diving into the intersection of logic and creativity to deliver
                seamless experiences across the web.
              </p>
            </div>
          </div>

          <div className="slide-content-desktop absolute top-0 left-0 w-full h-full flex flex-col justify-center pl-8">
            <div className="nb-card p-10 max-w-xl">
              <h3 className="font-space font-black text-nb-text text-[40px] uppercase tracking-tighter mb-6 bg-nb-accent-2 text-[#0D0D0D] w-fit px-4 border-[3px] border-nb-border shadow-[4px_4px_0_#FFF]">MY JOURNEY</h3>
              <p className="font-space text-nb-text text-[18px] leading-[1.8] font-medium mb-10">
                My evolution as a developer has been defined by continuous learning. From
                mastering core data structures to architecting complex <span className="font-bold underline decoration-[3px] decoration-nb-accent underline-offset-4">3D environments</span> using
                Three.js, I've always aimed to push the boundaries of what is possible on a browser.
              </p>
              <a
                href={resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="nb-button bg-nb-accent text-[#0D0D0D]"
              >
                DOWNLOAD RESUME
              </a>
            </div>
          </div>

          {/* SERVICE CARDS */}
          {services.map((service, index) => {
            // Intentional offsets
            const offsetY = index % 2 === 0 ? "translate-y-[-8px]" : "translate-y-[8px]";
            const offsetX = index % 2 === 0 ? "translate-x-[-6px]" : "translate-x-[6px]";

            return (
              <div key={index} className="slide-content-desktop absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className={`w-full max-w-[400px] nb-card cursor-pointer nb-card-hover p-10 flex flex-col items-start ${offsetX} ${offsetY} mt-16`}>
                  <div className="w-20 h-20 border-[3px] border-nb-border bg-nb-accent flex justify-center items-center shadow-[6px_6px_0_#FFFFFF] mb-8">
                    <img src={service.icon} alt={service.title} className="w-10 h-10 object-contain filter brightness-0" />
                  </div>
                  <h4 className="text-[32px] font-black font-space tracking-tighter uppercase text-nb-text leading-[1] mb-4">
                    {service.title}
                  </h4>
                  <div className="w-full h-[4px] bg-nb-border-muted my-4"></div>
                  <p className="text-nb-muted font-space text-[16px] leading-[1.6] font-medium">
                    {service.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default About;