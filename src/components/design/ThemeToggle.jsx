import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";

const ThemeToggle = () => {
  // --- 1. STATE INITIALIZATION ---
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
      return "light";
    }
    return "dark";
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef(null);
  const glimpseRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // --- 2. MOUSE MAGNETIC & GLIMPSE EFFECT ---
  const handleMouseMove = (e) => {
    if (isAnimating) return;
    const btn = buttonRef.current;
    const glimpse = glimpseRef.current;
    if (!btn || !glimpse) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    gsap.to(btn, { x: distanceX * 0.2, y: distanceY * 0.2, duration: 0.5, ease: "power2.out" });
    gsap.to(glimpse, { x: distanceX, y: distanceY, duration: 0.1, ease: "none" });
  };

  const handleMouseEnter = () => {
    if (isAnimating) return;
    gsap.to(glimpseRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" });
  };

  const handleMouseLeave = () => {
    if (isAnimating) return;
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    gsap.to(glimpseRef.current, { scale: 0, opacity: 0, duration: 0.3 });
  };

  // --- 3. THEME SWITCH WITH VIEW TRANSITION ---
  const toggleTheme = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (!document.startViewTransition) {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      setIsAnimating(false);
      return;
    }

    const btn = buttonRef.current;
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 700,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    try {
      await transition.finished;
    } finally {
      setIsAnimating(false);
      gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      gsap.to(glimpseRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    }
  };

  return (
    // FIX: Moved from "top-1/2 right-0" to "bottom-8 right-8"
    <div className="fixed bottom-4 right-4 z-[9999] p-2">
      <div
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={toggleTheme}
        className="relative w-16 h-16 flex items-center justify-center cursor-pointer"
      >
        <div className="relative z-20 w-12 h-12 bg-secondary/20 backdrop-blur-md border border-card-border rounded-full flex items-center justify-center shadow-lg transition-colors hover:border-accent-purple">
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-accent-purple">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          )}
        </div>
        <div
          ref={glimpseRef}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full z-10 pointer-events-none opacity-0 scale-0 overflow-hidden flex items-center justify-center`}
          style={{
            background: theme === 'dark' ? '#e0e5ec' : '#050816',
            boxShadow: `inset 0 0 20px ${theme === 'dark' ? '#00000020' : '#ffffff20'}`
          }}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;