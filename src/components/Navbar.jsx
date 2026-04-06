import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { navLinks } from "../constants";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, nav) => {
    e.preventDefault();
    setActive(nav.title);
    setToggle(false);
    const targetSection = document.querySelector(`#${nav.id}`);
    if (targetSection) {
      gsap.to(window, {
        scrollTo: { y: targetSection, autoKill: false, offsetY: 0 },
        duration: 0.8,
        ease: "power3.inOut" // Stricter, mechanical ease instead of bouncy
      });
    }
  };

  return (
    <nav
      className={`w-full flex items-center py-5 fixed top-0 z-50 transition-colors duration-200 ${
        scrolled ? "bg-nb-bg border-b-[3px] border-nb-border-muted" : "bg-transparent border-b-[3px] border-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6 sm:px-16">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Boxed brand mark */}
          <div className="border-[3px] border-nb-border px-3 py-1 text-nb-text font-black font-space  uppercase text-2xl group-hover:bg-nb-accent group-hover:text-[#0D0D0D] group-hover:border-nb-accent transition-colors duration-0">
            [ SWAYAM ]
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="list-none hidden md:flex flex-row gap-6">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`font-mono text-[14px] font-bold uppercase transition-all duration-0 border-[3px] border-transparent shadow-[4px_4px_0px_transparent] ${
                active === nav.title 
                ? "bg-nb-accent text-[#0D0D0D] border-nb-accent shadow-[4px_4px_0px_#FFFFFF]" 
                : "text-nb-text hover:bg-nb-accent hover:text-[#0D0D0D] hover:border-nb-accent hover:shadow-[4px_4px_0px_#FFFFFF] hover:-translate-x-1 hover:-translate-y-1"
              }`}
            >
              <a href={`#${nav.id}`} className="block px-4 py-2" onClick={(e) => handleNavClick(e, nav)}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Nav */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <div
            className="w-12 h-12 flex justify-center items-center text-nb-text text-xl font-bold border-[3px] border-nb-border cursor-pointer active:bg-nb-accent active:text-[#0D0D0D]"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? 'X' : '///'}
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-full right-0 left-0 min-w-full z-10 bg-nb-bg border-b-[3px] border-nb-border-muted flex-col`}
          >
            <ul className="list-none flex justify-center items-start flex-col gap-4 w-full">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`w-full font-mono text-[16px] font-bold uppercase border-[3px] p-4 transition-colors ${
                    active === nav.title 
                    ? "bg-nb-accent text-[#0D0D0D] border-nb-accent" 
                    : "text-nb-text border-nb-border-muted active:bg-nb-accent active:text-[#0D0D0D]"
                  }`}
                  onClick={(e) => handleNavClick(e, nav)}
                >
                  <a href={`#${nav.id}`} className="block w-full">{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;