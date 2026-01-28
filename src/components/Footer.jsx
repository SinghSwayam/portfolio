import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import useTheme from "../hooks/useTheme";


import logo from "../assets/logo.png";

gsap.registerPlugin(ScrollToPlugin);


const Footer = () => {
  const theme = useTheme();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, autoKill: false },
        duration: 1.5,
        ease: "power3.inOut"
      });
    }
  };

  const links = [
    { name: "About", id: "#about" },
    { name: "Tech", id: "#tech" },
    { name: "Projects", id: "#work" },
    { name: "Contact", id: "#contact" }
  ];

  return (
    <footer className="w-full bg-primary py-10 relative z-10 overflow-hidden border-t border-white/10">

      <style>{`
          .glitch { position: relative; font-weight: 900; text-transform: uppercase; letter-spacing: 0.05em; }
          .glitch::before, .glitch::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: #050816; display: none; }
          .glitch::before { left: 2px; text-shadow: -2px 0 #915EFF; clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%); }
          .glitch::after { left: -2px; text-shadow: -2px 0 #00ffff; clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%); }
          .branding-group:hover .glitch::before { display: block; animation: glitch-anim-1 0.4s infinite linear alternate-reverse; }
          .branding-group:hover .glitch::after { display: block; animation: glitch-anim-2 0.4s infinite linear alternate-reverse; }
          .branding-group:hover .glitch { color: #915EFF; }
          .logo-glitch-container { position: relative; width: 40px; height: 40px; }
          .logo-glitch-layer { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; pointer-events: none; }
          .branding-group:hover .logo-layer-1 { opacity: 0.8; left: 2px; filter: drop-shadow(-2px 0px #915EFF); animation: glitch-anim-1 0.4s infinite linear alternate-reverse; }
          .branding-group:hover .logo-layer-2 { opacity: 0.8; left: -2px; filter: drop-shadow(2px 0px #00ffff); animation: glitch-anim-2 0.4s infinite linear alternate-reverse; }
          @keyframes glitch-anim-1 { 0% { clip-path: inset(20% 0 80% 0); } 100% { clip-path: inset(30% 0 40% 0); } }
          @keyframes glitch-anim-2 { 0% { clip-path: inset(10% 0 60% 0); } 100% { clip-path: inset(15% 0 80% 0); } }
          .watermark-text { position: relative; display: inline-block; animation: watermark-shatter 12s infinite; }
          .watermark-text::before, .watermark-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; pointer-events: none; }
          .watermark-text::before { clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%); animation: watermark-split-top 12s infinite; }
          .watermark-text::after { clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%); animation: watermark-split-bottom 12s infinite; }
          @keyframes watermark-shatter { 0%, 90% { transform: translateY(25%) scale(1); opacity: 0.05; letter-spacing: -0.05em; filter: blur(0px); } 91% { opacity: 0.15; transform: translateY(25%) scale(1.02); } 92% { opacity: 0.1; letter-spacing: 0.1em; transform: translateY(25%) scale(1.1); filter: blur(2px); text-shadow: 10px 0 rgba(255,255,255,0.1), -10px 0 rgba(145, 94, 255, 0.2); } 94% { opacity: 0.2; letter-spacing: -0.1em; transform: translateY(25%) scale(0.95); filter: blur(0px); text-shadow: none; } 95% { opacity: 0.05; letter-spacing: -0.05em; transform: translateY(25%) scale(1); } 100% { transform: translateY(25%); opacity: 0.05; } }
          @keyframes watermark-split-top { 0%, 91% { opacity: 0; transform: translateX(0); } 92% { opacity: 0.1; transform: translateX(-20px) skewX(-20deg); color: rgba(255, 255, 255, 0.1); } 93% { opacity: 0; transform: translateX(0); } }
          @keyframes watermark-split-bottom { 0%, 91% { opacity: 0; transform: translateX(0); } 92% { opacity: 0.1; transform: translateX(20px) skewX(20deg); color: rgba(145, 94, 255, 0.3); } 93% { opacity: 0; transform: translateX(0); } }
        `}</style>

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#915EFF] to-transparent opacity-80 shadow-[0_0_15px_#915EFF]"></div>
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#915EFF] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 relative z-20">


        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="branding-group flex items-center gap-4 mb-2 cursor-pointer group">
            <div className="logo-glitch-container">
              <img src={logo} alt="logo-glitch-1" className="logo-glitch-layer logo-layer-1 object-contain" />
              <img src={logo} alt="logo-glitch-2" className="logo-glitch-layer logo-layer-2 object-contain" />
              <img src={logo} alt="logo" className="w-full h-full object-contain relative z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="glitch-wrapper">
              <h4 className={`glitch text-[24px] font-bold leading-none transition-colors ${theme === 'light' ? 'text-text-primary' : 'text-white'}`} data-text="SWAYAM SINGH">SWAYAM SINGH</h4>
            </div>
          </div>
          <p className="text-secondary text-[14px] font-light max-w-[250px]">Crafting immersive digital experiences with code and creativity.</p>
          <p className="text-text-primary/20 text-[12px] mt-4 font-mono tracking-widest uppercase">
            © {new Date().getFullYear()} | All Rights Reserved
          </p>
        </div>

        {/* System Status */}
        <div className={`hidden md:flex flex-col items-center gap-2 font-mono text-xs text-secondary border px-8 py-4 rounded-xl backdrop-blur-sm ${theme === 'light' ? "border-black/5 bg-black/5" : "border-white/5 bg-white/5"}`}>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 font-bold tracking-widest uppercase">System Online</span>
          </div>
          <div className="flex gap-6 opacity-50 text-[10px] uppercase tracking-wider">
            <span>Loc: Earth</span>
            <span className="hover:text-[#915EFF] hover:opacity-100 transition-all cursor-default">V.24.10.2005</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <h3 className="text-text-primary font-bold tracking-widest uppercase text-sm mb-2 font-mono opacity-80">Explore</h3>
          <div className="flex gap-6">
            {links.map((link) => (
              <a key={link.name} href={link.id} onClick={(e) => handleNavClick(e, link.id)} className="text-secondary hover:text-[#915EFF] text-sm font-medium transition-all duration-300 relative group uppercase tracking-wider">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#915EFF] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>
      </div>


      <div className="absolute bottom-0 left-0 w-full text-center overflow-hidden pointer-events-none leading-none z-0">
        <h1 className={`watermark-text text-[12vw] font-black uppercase tracking-tighter translate-y-1/4 ${theme === 'light' ? 'text-black/20' : 'text-white/10'}`} data-text="Swayam Singh">Swayam Singh</h1>
      </div>
    </footer>
  );
};

export default Footer;