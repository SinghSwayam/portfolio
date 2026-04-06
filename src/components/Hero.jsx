import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { styles } from "../styles";

const ABOUT_CODE_BLOCK = `const developer = {
  name: "Swayam Singh",
  role: "Full Stack Developer",
  focus: ["React", "Node.js", "Three.js"],
  languages: ["C++", "Java", "Javascript","Python", "Typescript"],
  superpower: "Turning complex ideas into fast, elegant interfaces",
  currently: "Opensource and Leetcode grind",
  status: "Open to impactful work",
  interests: ["Mechanical keyboards", "Creative coding", "Design systems"]
};`;

const KEYWORDS = new Set(["const", "let", "var", "return", "true", "false", "null"]);

const tokenizeCode = (source) => {
  const tokens = [];
  let i = 0;

  while (i < source.length) {
    const ch = source[i];

    if (/\s/.test(ch)) {
      let j = i + 1;
      while (j < source.length && /\s/.test(source[j])) {
        j += 1;
      }
      tokens.push({ type: "ws", value: source.slice(i, j) });
      i = j;
      continue;
    }

    if (ch === '"') {
      let j = i + 1;
      while (j < source.length && source[j] !== '"') {
        j += 1;
      }
      if (j < source.length) {
        j += 1;
      }
      tokens.push({ type: "string", value: source.slice(i, j) });
      i = j;
      continue;
    }

    if (/[A-Za-z_]/.test(ch)) {
      let j = i + 1;
      while (j < source.length && /[A-Za-z0-9_]/.test(source[j])) {
        j += 1;
      }
      tokens.push({ type: "word", value: source.slice(i, j) });
      i = j;
      continue;
    }

    if (/[{}\[\]()]/.test(ch)) {
      tokens.push({ type: "brace", value: ch });
      i += 1;
      continue;
    }

    if (/[=:;,\.]/.test(ch)) {
      tokens.push({ type: "punct", value: ch });
      i += 1;
      continue;
    }

    tokens.push({ type: "plain", value: ch });
    i += 1;
  }

  return tokens;
};

const colorizeTokens = (source) => {
  const raw = tokenizeCode(source);
  const colored = raw.map((token) => ({ ...token, styleType: token.type }));

  for (let i = 0; i < colored.length; i += 1) {
    const token = colored[i];

    if (token.type !== "word") {
      continue;
    }

    if (KEYWORDS.has(token.value)) {
      token.styleType = "keyword";
      continue;
    }

    let next = i + 1;
    while (next < colored.length && colored[next].type === "ws") {
      next += 1;
    }

    if (next < colored.length && colored[next].value === ":") {
      token.styleType = "key";
      continue;
    }

    token.styleType = "identifier";
  }

  return colored;
};

const tokenClass = (styleType, isActive) => {
  if (!isActive) {
    return "text-nb-muted";
  }

  switch (styleType) {
    case "keyword":
      return "text-[#F4A261]";
    case "key":
      return "text-[#7DD3FC]";
    case "string":
      return "text-[#A7F3D0]";
    case "brace":
      return "text-[#C4B5FD]";
    case "punct":
      return "text-[#FCA5A5]";
    case "identifier":
      return "text-[#F9FAFB]";
    default:
      return "text-nb-text";
  }
};

const Hero = () => {
  const containerRef = useRef(null);
  const watermarkTrackRef = useRef(null);
  
  // Terminal states
  const [typedCode, setTypedCode] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isCodeHovered, setIsCodeHovered] = useState(false);

  // 1. Blinking Cursor Timer
  useEffect(() => {
    const cursorTimer = window.setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 450);
    return () => window.clearInterval(cursorTimer);
  }, []);

  // 2. Looping typewriter code block
  useEffect(() => {
    let timer;
    let index = 0;
    let deleting = false;

    const loopTyping = () => {
      if (!deleting) {
        index += 1;
        setTypedCode(ABOUT_CODE_BLOCK.slice(0, index));

        if (index >= ABOUT_CODE_BLOCK.length) {
          deleting = true;
          timer = window.setTimeout(loopTyping, 1700);
          return;
        }

        const char = ABOUT_CODE_BLOCK[index - 1] || "";
        const delay = char === "\n" ? 120 : char === " " ? 14 : 22;
        timer = window.setTimeout(loopTyping, delay);
        return;
      }

      index = Math.max(0, index - 2);
      setTypedCode(ABOUT_CODE_BLOCK.slice(0, index));

      if (index === 0) {
        deleting = false;
        timer = window.setTimeout(loopTyping, 400);
        return;
      }

      timer = window.setTimeout(loopTyping, 12);
    };

    timer = window.setTimeout(loopTyping, 260);
    return () => window.clearTimeout(timer);
  }, []);

  // 3. Watermark marquee + scroll parallax
  useEffect(() => {
    let rafId = 0;
    let marqueeX = 0;
    let parallaxY = 0;

    const onScroll = () => {
      if (!containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      parallaxY = -rect.top * 0.5;
    };

    const animate = () => {
      const track = watermarkTrackRef.current;

      if (track) {
        const singleBlockWidth = track.scrollWidth / 2;
        marqueeX -= 0.9;

        if (Math.abs(marqueeX) >= singleBlockWidth) {
          marqueeX = 0;
        }

        track.style.transform = `translate3d(${marqueeX}px, ${parallaxY}px, 0)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // GSAP Animations
  useGSAP(() => {
    const tl = gsap.timeline();

    gsap.set([".hero-block"], { y: 100, opacity: 0 });
    gsap.set([".ascii-block"], { x: 50, opacity: 0 });
    gsap.set(".badge", { scale: 0, rotation: -20 });

    tl.to(".hero-block", {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    })
    .to(".badge", {
      scale: 1,
      rotation: -10,
      duration: 0.4,
      ease: "back.out(2)",
    }, "-=0.3")
    .to(".ascii-block", {
      x: 0, 
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.5");
  }, { scope: containerRef });

  const typedTokens = colorizeTokens(typedCode);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen pt-[120px] pb-10 overflow-hidden flex flex-col justify-center border-b-[3px] border-nb-border-muted z-0">
      
      {/* Background marquee watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center overflow-hidden opacity-[0.03] mix-blend-overlay selection:bg-transparent">
        <div ref={watermarkTrackRef} className="flex w-max will-change-transform">
          <h1 className="text-[40vw] font-black font-space leading-none whitespace-nowrap pr-16 sm:pr-24">CODE CODE CODE CODE</h1>
          <h1 className="text-[40vw] font-black font-space leading-none whitespace-nowrap pr-16 sm:pr-24" aria-hidden="true">CODE CODE CODE CODE</h1>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto ${styles.paddingX} w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 relative z-10 items-center`}>
         
         {/* Left Col: Main Typography */}
         <div className="lg:col-span-7 flex flex-col items-start relative z-20">
            <div className="badge absolute -top-12 -left-4 sm:-left-8 bg-nb-accent text-[#0D0D0D] font-mono font-bold px-4 py-2 border-[3px] border-nb-border shadow-[4px_4px_0_#FFF] z-30 transform -rotate-12 cursor-default select-none hover:-rotate-6 hover:shadow-[6px_6px_0_#FFF] transition-all">
              [ AVAILABLE FOR WORK ]
            </div>

            <div className="overflow-hidden w-full pt-4">
              <h1 className={`${styles.heroHeadText} hero-block bg-nb-bg text-nb-text inline-block leading-[0.9]`}>
                HI, I'M
              </h1>
            </div>

            <div className="overflow-hidden w-full mt-[-5px] md:mt-[-10px] relative z-10 py-4">
               <h1 className={`text-[#0d0d0d] ${styles.heroHeadText} hero-block bg-nb-accent  inline-block px-4 border-[4px] border-nb-border shadow-[8px_8px_0px_#FFFFFF] transform translate-x-2 md:translate-x-6 leading-[0.9]`}>
                 SWAYAM
               </h1>
            </div>

            <div className="mt-8 flex flex-col gap-2 relative z-20">
               <div className="overflow-hidden pl-2">
                 <p className={`${styles.heroSubText} hero-block bg-nb-surface border-l-[4px] border-nb-accent pl-4 py-1 pr-6 inline-block shadow-[4px_4px_0_#FFF]`}>
                   Full Stack Developer &
                 </p>
               </div>
               <div className="overflow-hidden ml-6">
                 <p className={`${styles.heroSubText} hero-block bg-nb-surface border-l-[4px] border-nb-accent-2 pl-4 py-1 pr-6 inline-block shadow-[4px_4px_0_#FFF]`}>
                   3D Web Enthusiast.
                 </p>
               </div>
            </div>

            <div className="mt-14 flex gap-4 md:gap-6 flex-wrap">
              <button 
                onClick={() => document.querySelector('#work')?.scrollIntoView()}
                className="hero-block nb-button bg-nb-bg border-nb-border-muted !text-nb-text hover:!bg-[#0D0D0D] hover:!text-nb-accent hover:border-nb-accent hover:shadow-[6px_6px_0_var(--nb-accent)] py-4 w-full sm:w-auto"
              >
                View Works
              </button>
              <button 
                onClick={() => document.querySelector('#about')?.scrollIntoView()}
                className="hero-block nb-button bg-nb-bg border-nb-border-muted !text-nb-text hover:!bg-[#0D0D0D] hover:!text-nb-accent hover:border-nb-accent hover:shadow-[6px_6px_0_var(--nb-accent)] py-4 w-full sm:w-auto"
              >
                About Me
              </button>
            </div>
         </div>

         {/* Right Col: ASCII ART / CODE BLOCK */}
         <div className="lg:col-span-5 relative mt-16 lg:mt-0 w-full ascii-block z-10">
           <div className="bg-nb-surface border-[3px] border-nb-border shadow-[8px_8px_0_#FFF] relative group hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0_var(--nb-accent)] hover:border-nb-accent transition-all duration-200">
             
             {/* Terminal Header */}
             <div className="border-b-[3px] border-nb-border flex justify-between items-center px-4 py-3 bg-nb-bg group-hover:border-nb-accent transition-colors">
               <span className="font-mono text-xs font-bold text-nb-muted">swayam@dev: ~/portfolio</span>
               <div className="flex gap-2">
                 <div className="w-3 h-3 border-2 border-nb-border bg-nb-accent-2"></div>
                 <div className="w-3 h-3 border-2 border-nb-border bg-nb-accent"></div>
                 <div className="w-3 h-3 border-2 border-nb-border bg-nb-accent-3"></div>
               </div>
             </div>

             {/* ASCII Content */}
             <div
               className="p-4 sm:p-6 overflow-hidden select-none"
               onMouseEnter={() => setIsCodeHovered(true)}
               onMouseLeave={() => setIsCodeHovered(false)}
             >
                <pre className="font-mono text-[11px] sm:text-[12px] md:text-[13px] leading-[1.35] font-bold transition-colors duration-300 min-h-[300px] m-0 whitespace-pre-wrap">
                  {typedTokens.map((token, idx) => (
                    <span key={`${token.styleType}-${idx}`} className={tokenClass(token.styleType, isCodeHovered)}>
                      {token.value}
                    </span>
                  ))}
                  {cursorVisible && <span className="inline-block w-[7px] h-[1em] ml-1 align-[-2px] bg-nb-accent" />}
                </pre>

                {/* Real-time Status Footer */}
                <div className="mt-4 pt-4 border-t-2 border-dashed border-nb-border-muted flex flex-col gap-1">
                    <p className="font-mono text-[10px] sm:text-xs text-nb-muted">
                    &gt; profile: dynamically typing on loop
                    </p>
                    <p className={`font-mono text-[10px] sm:text-xs ${isCodeHovered ? "text-nb-accent" : "text-nb-muted"}`}>
                      {`> hover: ${isCodeHovered ? "accent color active" : "muted default"}`}
                    </p>
                </div>
             </div>
           </div>
         </div>

      </div>

      {/* Scroll indicator block */}
      <div className="absolute bottom-6 sm:bottom-12 right-6 sm:right-12 cursor-pointer z-30"
        onClick={() => {
            document.querySelector('#about')?.scrollIntoView();
        }}>
        <div className="border-[3px] border-nb-border px-4 py-2 font-mono text-xs font-bold hover:bg-nb-accent hover:text-[#0D0D0D] shadow-[4px_4px_0_#fff] hover:shadow-[6px_6px_0_var(--nb-accent)] hover:-translate-y-1 transition-all uppercase">
          [ Scroll &darr; ]
        </div>
      </div>
    </section>
  );
};

export default Hero;