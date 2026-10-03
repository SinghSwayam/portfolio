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
    <footer className="relative bg-bh-fg border-t-4 border-bh-border overflow-hidden pt-12 pb-8 w-full z-10">
      <style>{`
        @keyframes footer-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Marquee watermark */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center overflow-hidden select-none">
        <div
          className="whitespace-nowrap font-outfit font-black tracking-[-0.04em] text-[38vw] sm:text-[30vw] lg:text-[22vw] text-transparent opacity-[0.5]"
          style={{
            animation: "footer-marquee 26s linear infinite",
            WebkitTextStroke: "1.5px rgba(255,255,255,0.08)",
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

      {/* Bauhaus geometric accents on footer */}
      <div className="absolute top-6 right-24 w-12 h-12 rounded-full bg-bh-red border-2 border-bh-bg opacity-40 pointer-events-none" />
      <div className="absolute top-10 right-40 w-8 h-8 bg-bh-yellow border-2 border-bh-bg opacity-40 pointer-events-none" />
      <div
        className="absolute bottom-6 right-16 w-10 h-10 bg-bh-blue border-2 border-bh-bg opacity-40 pointer-events-none"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
      />

      <div
        className={`max-w-7xl mx-auto ${styles.paddingX} relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16`}
      >
        {/* Left column */}
        <div className="flex flex-col items-start gap-6">
          <div className="w-full max-w-[460px] bg-bh-bg border-4 border-white p-5 shadow-[8px_8px_0px_0px_#D02020]">
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="flex flex-col gap-2">
                <span className="font-outfit text-[10px] text-[#888] uppercase font-black tracking-widest">
                  [ SYSTEM STATUS ]
                </span>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full bg-[#20C050] opacity-75" />
                    <span className="relative inline-flex h-3 w-3 bg-[#20C050] border border-bh-border" />
                  </span>
                  <span className="font-outfit text-sm text-green-500 font-black uppercase">ONLINE</span>
                </div>
              </div>

              <div className="h-10 w-[4px] bg-white opacity-20 hidden sm:block" />

              <div className="flex flex-col gap-2">
                <span className="font-outfit text-[10px] text-[#888] uppercase font-black tracking-widest">
                  [ LOCAL TIME ]
                </span>
                <span className="font-outfit text-sm text-gray-500 font-black">{time}</span>
              </div>
            </div>
          </div>

          <p className="text-[#888] font-outfit text-[16px] sm:text-[18px] font-medium leading-relaxed max-w-[540px]">
            Crafting immersive digital experiences with code and creativity.
          </p>

          <p className="font-outfit text-[11px] sm:text-[12px] text-[#666] uppercase tracking-wider font-bold">
            &copy; 2026 | All Rights Reserved
          </p>
        </div>

        {/* Right column: Quick links */}
        <div className="flex flex-col items-start lg:items-end justify-start gap-4">
          <p className="font-outfit text-[11px] text-[#666] uppercase font-black tracking-widest">
            [ QUICK LINKS ]
          </p>
          <div className="flex flex-wrap lg:flex-col gap-3 lg:items-end">
            {[
              { href: "#about", label: "[ ABOUT ]" },
              { href: "#tech", label: "[ SKILLS ]" },
              { href: "#work", label: "[ PROJECTS ]" },
              { href: "#contact", label: "[ CONTACT ]" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="w-full font-outfit font-black text-[12px] bg-bh-fg border-4 border-white text-white px-4 py-2 shadow-[4px_4px_0px_0px_#D02020] hover:bg-bh-red hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#D02020] transition-all uppercase tracking-widest"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;