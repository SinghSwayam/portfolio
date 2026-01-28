import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { navLinks } from "../constants";
import useTheme from "../hooks/useTheme";
import logo from "../assets/logo.png";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();

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
        scrollTo: { y: targetSection, autoKill: false, offsetY: 80 },
        duration: 1.5,
        ease: "power3.inOut"
      });
    }
  };

  return (
    <nav
      className={`w-full flex items-center py-5 fixed top-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary/80 shadow-lg" : "bg-transparent"
        }`}
      style={{
        backdropFilter: scrolled ? "blur(10px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto px-6 sm:px-16">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt="logo" className="w-11 h-11 object-contain" />
          <p className="text-text-primary text-[18px] font-semibold cursor-pointer flex">
            Swayam Singh&nbsp;
            <span className="sm:block hidden">| Portfolio</span>
          </p>
        </Link>


        <ul className="list-none hidden md:flex flex-row gap-10">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${active === nav.title ? "text-text-primary" : "text-secondary"
                } hover:text-text-primary text-[18px] font-medium cursor-pointer transition-colors`}
              onClick={(e) => handleNavClick(e, nav)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>


        <div className="md:hidden flex flex-1 justify-end items-center">
          <div
            className="w-[28px] h-[28px] object-contain cursor-pointer flex justify-center items-center text-text-primary text-2xl font-bold"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? '✕' : '☰'}
          </div>

          <div
            className={`${!toggle ? "hidden" : "flex"
              } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl shadow-xl border ${theme === 'light' ? 'bg-white/80 backdrop-blur-md border-black/5' : 'bg-[#151030] border-gray-800'}`}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.title ? "text-text-primary" : "text-secondary"
                    }`}
                  onClick={(e) => handleNavClick(e, nav)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
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