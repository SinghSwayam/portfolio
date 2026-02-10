import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Tilt from "react-parallax-tilt";

import { styles } from "../styles";
import { services } from "../constants";

import { GridBeamBackground } from "./design/SectionBackgrounds";
import useTheme from "../hooks/useTheme";
import githubIconLight from "../assets/icon-park--github.svg";

import { supabase } from "../config/supabaseClient";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const About = () => {
  const containerRef = useRef();
  const servicesLabelRef = useRef();
  const scrollTriggerRef = useRef(null);
  const staticTitleRef = useRef();
  const theme = useTheme();

  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const { data } = supabase
      .storage
      .from('portfolio-assets')
      .getPublicUrl('resume/resume.pdf');

    if (data) setResumeUrl(data.publicUrl);
  }, []);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const indicators = gsap.utils.toArray(".indicator-target");
      const slides = gsap.utils.toArray(".slide-content-desktop");
      const fill = document.querySelector(".fill-bar");

      gsap.set(fill, { scaleY: 0 });
      gsap.set(indicators, { color: "var(--color-secondary)", fontWeight: "normal" });
      gsap.set(indicators[0], { color: "#915EFF", fontWeight: "bold" });

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
          scrub: 1,
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

        tl.to(item, { color: "#915EFF", fontWeight: "bold", duration: 0.25 }, startTime)
          .to(previousItem, { color: "var(--color-secondary)", fontWeight: "normal", duration: 0.25 }, "<");

        if (i === 2) {
          tl.to(previousSlide, { autoAlpha: 0, y: "-100%", duration: 0.25, ease: "power2.in" }, startTime);
          tl.to(staticTitleRef.current, { autoAlpha: 1, duration: 0.25 }, startTime);
          tl.to(currentSlide, { autoAlpha: 1, x: "0%", duration: 0.25, ease: "power2.out" }, ">-0.1");
        }
        else if (i > 2) {
          tl.to(previousSlide, { autoAlpha: 0, x: "-100%", duration: 0.25, ease: "power2.in" }, startTime);
          tl.to(currentSlide, { autoAlpha: 1, x: "0%", duration: 0.25, ease: "power2.out" }, ">-0.1");
        }
        else {
          tl.to(previousSlide, { autoAlpha: 0, y: "-100%", duration: 0.25, ease: "power2.in" }, startTime);
          tl.to(currentSlide, { autoAlpha: 1, y: "0%", duration: 0.25, ease: "power2.out" }, ">-0.1");
        }

        tl.call(() => {
          if (i >= 2) {
            gsap.to(servicesLabelRef.current, { color: "#915EFF", fontWeight: "bold", duration: 0.2 });
          } else {
            gsap.to(servicesLabelRef.current, { color: "var(--color-secondary)", fontWeight: "normal", duration: 0.2 });
            if (i < 2) gsap.to(staticTitleRef.current, { autoAlpha: 0, duration: 0.2 });
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
    gsap.to(window, { scrollTo: targetScroll, duration: 1.5, ease: "power2.out" });
  };

  return (
    <section ref={containerRef} id="about" className="relative w-full bg-primary overflow-hidden pt-10 pb-20 lg:pt-0 lg:pb-0 lg:h-screen lg:flex lg:items-center">

      <GridBeamBackground />

      {/* MOBILE VIEW */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 sm:px-16 flex flex-col gap-10 relative z-10">
        <div>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </div>

        <div className="text-secondary text-[17px] leading-[30px]">
          I'm a skilled software developer with experience in TypeScript and
          JavaScript, and expertise in frameworks like React, Node.js, and
          Three.js. I thrive on turning complex problems into elegant,
          high-performance digital solutions that bridge the gap between
          functionality and immersive design.
        </div>

        <div className="text-secondary text-[17px] leading-[30px]">
          My journey into tech began with a simple curiosity for how things work
          under the hood. Today, I architect scalable web applications and
          interactive 3D experiences, always staying at the forefront of
          modern web standards and creative technology.
          <br /><br />

          <a
            href={resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#915EFF] py-3 px-8 rounded-xl text-white font-bold shadow-md hover:bg-[#804dee] transition-all"
          >
            Download Resume
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-10 justify-center">
          {services.map((service, index) => {
            const cardColor = (service.title === "Unity Developer" && theme === "light") ? "#5f6368" : service.color;
            const cardIcon = (service.title === "Open Source Contributor" && theme === "light") ? githubIconLight : service.icon;
            return (
              <Tilt
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={450}
                className="w-full sm:w-[400px]"
              >
                <div
                  className="bg-tertiary backdrop-blur-md bg-opacity-80 rounded-[20px] py-10 px-8 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden"
                  style={{
                    border: `1px solid ${cardColor}`,
                    boxShadow: `0 0 25px ${cardColor}40`,
                  }}
                >
                  <div
                    className="w-24 h-24 mb-6 rounded-full flex justify-center items-center backdrop-blur-sm"
                    style={{
                      border: `1px solid ${cardColor}60`,
                      background: `${cardColor}10`,
                      boxShadow: `0 0 20px ${cardColor}50`,
                    }}
                  >
                    <img src={cardIcon} alt={service.title} className="w-12 h-12 object-contain" />
                  </div>
                  <h4 className="text-[28px] font-bold text-text-primary mb-2 text-center">{service.title}</h4>
                  <div className="w-full h-1 mb-4 opacity-75" style={{ background: `linear-gradient(90deg, transparent, ${cardColor}, transparent)` }}></div>
                  <p className="text-secondary text-center leading-7 px-2">{service.desc}.</p>
                </div>
              </Tilt>
            )
          })}
        </div>
      </div>


      {/* DESKTOP VIEW */}
      <div className="hidden lg:flex max-w-7xl mx-auto w-full px-6 sm:px-16 gap-20 h-full relative z-10">
        <div className="w-2/3 flex flex-col justify-center relative z-20 h-full">
          <div className="mb-10">
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Overview.</h2>
          </div>
          <div className="relative pl-8 flex flex-col gap-5">
            <div className="track-line"></div>
            <div className="fill-bar"></div>
            <div onClick={() => handleNavClick(0)} className="indicator-target text-[24px] font-bold text-secondary cursor-pointer transition-colors">Introduction</div>
            <div onClick={() => handleNavClick(1)} className="indicator-target text-[24px] font-bold text-secondary cursor-pointer transition-colors">Biography</div>
            <div className="flex flex-col gap-4">
              <div ref={servicesLabelRef} className="text-[24px] font-bold text-secondary transition-colors">Services</div>
              <div className="flex flex-col gap-4 pl-8 border-l border-white/5 relative">
                {services.map((service, index) => (
                  <div key={index} onClick={() => handleNavClick(index + 2)} className="indicator-target relative text-[16px] text-secondary cursor-pointer flex items-center transition-all">
                    <div className="tree-branch"></div>
                    {service.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/3 h-full relative right-content flex items-center justify-center">
          <div ref={staticTitleRef} className="absolute top-[20%] left-0 w-full text-center z-10 pointer-events-none">
            <h3 className="slide-title">What I Do</h3>
          </div>

          <div className="slide-content-desktop absolute top-0 left-0 w-full h-full flex flex-col justify-center pl-8">
            <h3 className="slide-title">Hello!</h3>
            <p className="slide-text max-w-lg leading-loose text-secondary text-[18px]">
              I'm a skilled software developer with a passion for building robust website
              infrastructure. With deep expertise in <strong>TypeScript</strong>, <strong>React</strong>,
              and <strong>Node.js</strong>, I focus on creating scalable, efficient, and user-centric
              solutions. I enjoy diving into the intersection of logic and creativity to deliver
              seamless experiences across the web.
            </p>
          </div>

          <div className="slide-content-desktop absolute top-0 left-0 w-full h-full flex flex-col justify-center pl-8">
            <h3 className="slide-title">My Journey</h3>
            <p className="slide-text max-w-lg leading-loose text-secondary text-[18px] mb-8">
              My evolution as a developer has been defined by continuous learning. From
              mastering core data structures to architecting complex <strong>3D environments</strong> using
              Three.js, I've always aimed to push the boundaries of what is possible on a browser.
            </p>
            <a
              href={resumeUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#915EFF] py-3 px-8 rounded-xl w-fit text-white font-bold shadow-md hover:bg-[#804dee] transition-all"
            >
              Download Resume
            </a>
          </div>

          {services.map((service, index) => {
            const cardColor = (service.title === "Unity Developer" && theme === "light") ? "#5f6368" : service.color;
            const cardIcon = (service.title === "Open Source Contributor" && theme === "light") ? githubIconLight : service.icon;
            return (
              <div key={index} className="slide-content-desktop absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="pt-32 w-full flex justify-center">
                  <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000} scale={1.02} transitionSpeed={450} className="w-full max-w-[500px]">
                    <div className=" backdrop-blur-md bg-opacity-80 rounded-[20px] py-10 px-8 flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden" style={{ border: `1px solid ${cardColor}`, boxShadow: `0 0 25px ${cardColor}40` }}>
                      <div className="w-24 h-24 mb-6 rounded-full flex justify-center items-center backdrop-blur-sm" style={{ border: `1px solid ${cardColor}60`, background: `${cardColor}10`, boxShadow: `0 0 20px ${cardColor}50` }}>
                        <img src={cardIcon} alt={service.title} className="w-12 h-12 object-contain" />
                      </div>
                      <h4 className="text-[32px] font-bold text-text-primary mb-2 text-center">{service.title}</h4>
                      <div className="w-full h-1 mb-4 opacity-75" style={{ background: `linear-gradient(90deg, transparent, ${cardColor}, transparent)` }}></div>
                      <p className="text-secondary text-center leading-7 px-4">{service.desc}.</p>
                    </div>
                  </Tilt>
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