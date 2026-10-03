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
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <nav
      className={`w-full flex items-center py-4 fixed top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-bh-bg border-b-4 border-bh-border"
          : "bg-transparent border-b-4 border-transparent"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6 sm:px-16">
        {/* Brand — three geometric shapes + name */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Bauhaus geometric logo: circle / square / triangle */}
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-bh-red border-2 border-bh-border" />
            <div className="w-4 h-4 bg-bh-blue border-2 border-bh-border" />
            <div
              className="w-4 h-4 bg-bh-yellow border-2 border-bh-border"
              style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
            />
          </div>
          <div className="border-4 border-bh-border px-3 py-1 bg-bh-fg text-bh-bg font-black font-outfit uppercase text-lg group-hover:bg-bh-red transition-colors duration-200 shadow-[4px_4px_0px_0px_#121212]">
            SWAYAM
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="list-none hidden md:flex flex-row gap-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`font-outfit text-[13px] font-bold uppercase border-2 border-bh-border transition-all duration-150 ease-out ${
                active === nav.title
                  ? "bg-bh-red text-white shadow-[4px_4px_0px_0px_#121212]"
                  : "bg-white text-bh-fg hover:bg-bh-yellow hover:shadow-[4px_4px_0px_0px_#121212] hover:-translate-x-[2px] hover:-translate-y-[2px]"
              }`}
            >
              <a
                href={`#${nav.id}`}
                className="block px-5 py-2"
                onClick={(e) => handleNavClick(e, nav)}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <div
            className="w-12 h-12 flex justify-center items-center text-bh-fg text-base font-black border-4 border-bh-border bg-white cursor-pointer active:bg-bh-red active:text-white shadow-[4px_4px_0px_0px_#121212]"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? "✕" : "☰"}
          </div>

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-full right-0 left-0 min-w-full z-10 bg-bh-bg border-b-4 border-bh-border flex-col`}
          >
            <ul className="list-none flex justify-center items-start flex-col gap-3 w-full">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`w-full font-outfit text-[15px] font-bold uppercase border-4 p-4 transition-colors ${
                    active === nav.title
                      ? "bg-bh-red text-white border-bh-border shadow-[4px_4px_0px_0px_#121212]"
                      : "text-bh-fg border-bh-border bg-white active:bg-bh-yellow"
                  }`}
                  onClick={(e) => handleNavClick(e, nav)}
                >
                  <a href={`#${nav.id}`} className="block w-full">
                    {nav.title}
                  </a>
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