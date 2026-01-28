import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast, { Toaster } from "react-hot-toast";
import useTheme from "../hooks/useTheme";



import Github from "../assets/skill-icons--github-light.svg";
import Instagram from "../assets/skill-icons--instagram.svg";
import Linkdein from "../assets/skill-icons--linkedin.svg";
import Rocket from "../assets/rocket.svg";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkdein,
    url: "https://www.linkedin.com/in/singhswayam/",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/SinghSwayam",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/__swayam__singh/",
  },
];

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let timer;
    const typeSpeed = 30;
    const deleteSpeed = 15;
    const pauseTime = 2000;

    if (!isDeleting && displayedText.length < text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, typeSpeed);
    } else if (!isDeleting && displayedText.length === text.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length - 1));
      }, deleteSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, started, text]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse text-[#915EFF] font-bold">|</span>
    </span>
  );
};

const RocketToast = ({ t, theme }) => {
  const containerRef = useRef();
  const rocketRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        toast.dismiss(t.id);
      }
    });

    tl.fromTo(containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );
    tl.to({}, { duration: 1.2 });
    tl.to(".toast-content", { opacity: 0, scale: 0.8, duration: 0.3 })
      .to(".toast-bg", {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
        duration: 0.3
      }, "<")
      .set(".toast-content", { display: "none" })
      .fromTo(rocketRef.current,
        { scale: 0, rotation: -45, x: 0, y: 0 },
        { scale: 1.5, rotation: 45, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    tl.to(rocketRef.current, {
      x: "+=2", y: "+=2", rotation: "+=2", repeat: 10, yoyo: true, duration: 0.05
    });
    tl.to(rocketRef.current, {
      x: window.innerWidth, y: -window.innerHeight, rotation: 45, scale: 0.5, opacity: 0, duration: 1.2, ease: "power3.in"
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative z-[9999] flex items-center justify-center pointer-events-none">
      <div className={`toast-bg border shadow-[0_0_15px_rgba(145,94,255,0.5)] rounded-xl overflow-hidden relative flex items-center justify-center px-6 py-4 min-w-[300px] min-h-[80px] ${theme === "light" ? "bg-white border-[#915EFF]" : "bg-[#101420] border-[#915EFF]"}`}>
        <div className="toast-content flex items-center gap-4 w-full">
          <div className="bg-[#915EFF]/20 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#915EFF" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
          </div>
          <div>
            <h4 className="text-text-primary font-bold text-sm">Message Sent!</h4>
            <p className="text-secondary text-xs">Launching...</p>
          </div>
        </div>
      </div>
      <div ref={rocketRef} className="absolute opacity-0 drop-shadow-[0_0_15px_rgba(145,94,255,0.8)]">
        <img src={Rocket} alt="Rocket Launch" className="w-12 h-12 object-contain" />
      </div>
    </div>
  );
};

const Contact = () => {
  const formRef = useRef();
  const containerRef = useRef();
  const theme = useTheme();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useGSAP(() => {
    gsap.from(".contact-content", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.2
    });
  }, { scope: containerRef });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setLoading(false);
      toast.error("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setLoading(false);
      toast.error("Please enter a valid email address.");
      return;
    }

    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    emailjs.send(serviceId, templateId, {
      from_name: form.name,
      to_name: "Swayam Singh",
      from_email: form.email,
      message: form.message,
    }, publicKey)
      .then(() => {
        setLoading(false);
        toast.custom((t) => <RocketToast t={t} theme={theme} />, { duration: 5000 });
        setForm({ name: "", email: "", message: "" });
      }, (error) => {
        setLoading(false);
        console.error("EmailJS Error:", error);
        toast.error("Something went wrong. Please try again.");
      });
  };

  const getInputClass = (fieldName) => {
    const isActive = focusedField === fieldName || form[fieldName]?.length > 0;
    return `bg-transparent border-b py-4 px-2 placeholder:text-secondary text-text-primary outline-none font-medium transition-all duration-300 w-full ${isActive ? "border-[#915EFF] shadow-[0_10px_20px_-10px_rgba(145,94,255,0.3)]" : "border-text-primary/20"} ${focusedField === fieldName ? "bg-text-primary/5" : ""}`;
  };

  return (
    <div ref={containerRef} id="contact" className="contact-section relative z-0 bg-transparent min-h-screen flex items-center justify-center overflow-hidden py-20">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: theme === 'light' ? '#fff' : '#101420',
            color: theme === 'light' ? '#050816' : '#fff',
            border: theme === 'light' ? '1px solid #915EFF' : '1px solid #915EFF',
            padding: '16px',
            fontSize: '14px',
            zIndex: 9999,
          },
          success: { iconTheme: { primary: '#915EFF', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ff4b4b', secondary: '#fff' } },
        }}
      />
      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col lg:flex-row gap-16 lg:gap-24 z-10">
        <div className="contact-content flex-[0.4] flex flex-col justify-between">
          <div>
            <p className="text-secondary tracking-widest uppercase text-md mb-4">Contact</p>
            <h3 className="text-text-primary text-[50px] sm:text-[70px] font-light leading-[1.1]">Let's work <br /><span className="font-bold">together.</span></h3>
            <div className="mt-4 text-secondary text-[16px] leading-[28px] max-w-sm font-light min-h-[120px]">
              <TypewriterText text="I am currently available for freelance work and open to new opportunities. If you have a project that needs some creative touch, I’m all ears." delay={1000} />
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h4 className="text-text-primary font-bold text-lg mb-2">Email</h4>
              <a href="mailto:swayamsingh.dev@gmail.com" className="text-secondary hover:text-[#915EFF] transition-colors text-lg">swayamsingh.dev@gmail.com</a>
            </div>
            <div>
              <h4 className="text-text-primary font-bold text-lg mb-4">Socials</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="group relative w-14 h-14 flex items-center justify-center rounded-full">
                    <div className="absolute inset-0 rounded-full bg-[#915EFF]/30 blur-md opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-0"></div>
                    <img src={social.icon} alt={social.name} className="relative z-10 w-7 h-7 object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ease-in-out" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="contact-content flex-[0.6]">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10 mt-4">
            <div className="relative group">
              <label className={`absolute left-2 transition-all duration-300 pointer-events-none ${focusedField === 'name' || form.name ? "-top-6 text-xs text-[#915EFF] font-bold" : "top-4 text-secondary group-hover:text-text-primary"}`}>Your Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)} className={getInputClass('name')} />
              <div className={`h-[1px] bg-[#915EFF] absolute bottom-0 left-0 transition-all duration-300 ${focusedField === 'name' ? "w-full opacity-100" : "w-0 opacity-0"}`}></div>
            </div>
            <div className="relative group">
              <label className={`absolute left-2 transition-all duration-300 pointer-events-none ${focusedField === 'email' || form.email ? "-top-6 text-xs text-[#915EFF] font-bold" : "top-4 text-secondary group-hover:text-text-primary"}`}>Your Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} className={getInputClass('email')} />
              <div className={`h-[1px] bg-[#915EFF] absolute bottom-0 left-0 transition-all duration-300 ${focusedField === 'email' ? "w-full opacity-100" : "w-0 opacity-0"}`}></div>
            </div>
            <div className="relative group">
              <label className={`absolute left-2 transition-all duration-300 pointer-events-none ${focusedField === 'message' || form.message ? "-top-6 text-xs text-[#915EFF] font-bold" : "top-4 text-secondary group-hover:text-text-primary"}`}>Your Message</label>
              <textarea rows={4} name="message" value={form.message} onChange={handleChange} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} className={`${getInputClass('message')} resize-none`} />
              <div className={`h-[1px] bg-[#915EFF] absolute bottom-0 left-0 transition-all duration-300 ${focusedField === 'message' ? "w-full opacity-100" : "w-0 opacity-0"}`}></div>
            </div>
            <div className="mt-4">
              <button type="submit" className={`group relative overflow-hidden rounded-full bg-white/5 border px-10 py-4 transition-all duration-300 hover:border-[#915EFF] ${theme === 'light' ? 'border-[#915EFF] bg-white/5' : 'border-white/20 bg-white/5'}`}>
                <div className="absolute inset-0 bg-[#915EFF] translate-x-[-105%] group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative z-10 font-bold tracking-widest uppercase text-sm text-secondary group-hover:text-text-primary transition-colors duration-300">{loading ? "Sending..." : "Send Message"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Contact;