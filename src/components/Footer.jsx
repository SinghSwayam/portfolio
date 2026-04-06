import React, { useState, useEffect } from "react";
import { styles } from "../styles";

const Footer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-[#0D0D0D] border-t-[4px] border-nb-border overflow-hidden pt-12 pb-8 w-full z-10">
      <style>{`
        @keyframes footer-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none flex items-center overflow-hidden select-none">
        <div
          className="whitespace-nowrap font-space font-black tracking-[-0.04em] text-[38vw] sm:text-[30vw] lg:text-[22vw] text-transparent opacity-[0.5]"
          style={{
            animation: "footer-marquee 26s linear infinite",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.09)",
            transform: "translateY(8%)",
          }}
        >
          <span className="mr-16">SWAYAM SINGH</span>
          <span className="mr-16">SWAYAM SINGH</span>
          <span className="mr-16">SWAYAM SINGH</span>
          <span className="mr-16">SWAYAM SINGH</span>
          <span className="mr-16">SWAYAM SINGH</span>
          <span className="mr-16">SWAYAM SINGH</span>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto ${styles.paddingX} relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16`}>
        <div className="flex flex-col items-start gap-6">
          <div className="w-full max-w-[460px] bg-nb-surface border-[3px] border-nb-border p-5 shadow-[8px_8px_0_#FFF]">
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-nb-muted uppercase font-bold tracking-widest">[ SYSTEM STATUS ]</span>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full  bg-[#37ff6b] opacity-75"></span>
                    <span className="relative inline-flex  h-3 w-3 bg-[#37ff6b] border border-nb-border"></span>
                  </span>
                  <span className="font-mono text-sm text-nb-text font-bold uppercase">ONLINE</span>
                </div>
              </div>

              <div className="h-10 w-[3px] bg-nb-border-muted hidden sm:block"></div>

              <div className="flex flex-col gap-2">
                <span className="font-mono text-[10px] text-nb-muted uppercase font-bold tracking-widest">[ LOCAL TIME ]</span>
                <span className="font-mono text-sm text-nb-text font-bold">{time}</span>
              </div>
            </div>
          </div>

          <p className="text-nb-muted font-space text-[16px] sm:text-[18px] font-medium leading-relaxed max-w-[540px]">
            Crafting immersive digital experiences with code and creativity.
          </p>

          <p className="font-mono text-[11px] sm:text-[12px] text-nb-muted uppercase tracking-wider">
            &copy; 2026 | All Rights Reserved
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end justify-start gap-4">
          <p className="font-mono text-[11px] text-nb-muted uppercase font-bold tracking-widest">[ QUICK LINKS ]</p>
          <div className="flex flex-wrap lg:flex-col gap-3 lg:items-end">
            <a href="#about" className="font-mono font-bold text-[12px] bg-nb-surface border-[3px] border-nb-border px-4 py-2 shadow-[4px_4px_0_#FFF] hover:bg-nb-accent hover:text-[#0D0D0D] hover:-translate-y-1 hover:shadow-[6px_6px_0_#FFF] transition-all">[ ABOUT ]</a>
            <a href="#tech" className="font-mono font-bold text-[12px] bg-nb-surface border-[3px] border-nb-border px-4 py-2 shadow-[4px_4px_0_#FFF] hover:bg-nb-accent hover:text-[#0D0D0D] hover:-translate-y-1 hover:shadow-[6px_6px_0_#FFF] transition-all">[ SKILLS ]</a>
            <a href="#work" className="font-mono font-bold text-[12px] bg-nb-surface border-[3px] border-nb-border px-4 py-2 shadow-[4px_4px_0_#FFF] hover:bg-nb-accent hover:text-[#0D0D0D] hover:-translate-y-1 hover:shadow-[6px_6px_0_#FFF] transition-all">[ PROJECTS ]</a>
            <a href="#contact" className="font-mono font-bold text-[12px] bg-nb-surface border-[3px] border-nb-border px-4 py-2 shadow-[4px_4px_0_#FFF] hover:bg-nb-accent hover:text-[#0D0D0D] hover:-translate-y-1 hover:shadow-[6px_6px_0_#FFF] transition-all">[ CONTACT ]</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;