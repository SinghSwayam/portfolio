import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { Toaster, toast } from 'react-hot-toast';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) tempErrors.name = "NAME IS REQUIRED.";
    if (!form.email.trim()) {
      tempErrors.email = "EMAIL IS REQUIRED.";
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "INVALID EMAIL FORMAT.";
    }
    if (!form.message.trim()) tempErrors.message = "MESSAGE IS REQUIRED.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("PLEASE FIX THE ERRORS BELOW.", {
        position: "bottom-left",
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    
    // NOTE: Keep environment variables working
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Swayam",
          from_email: form.email,
          to_email: "swayam.singh.contact@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success("MESSAGE SENT. I WILL GET BACK TO YOU SOON.", {
            position: "bottom-left",
            theme: "dark",
          });
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error("COMMUNICATION FAILED. PLEASE TRY AGAIN.", {
             position: "bottom-left",
             theme: "dark",
          });
        }
      );
  };

  return (
    <section id="contact" className={`relative w-full overflow-hidden ${styles.paddingV} bg-nb-accent border-b-[4px] border-[#0D0D0D]`}>
      <Toaster 
        toastOptions={{
          className: 'border-[3px] border-[#0D0D0D] bg-nb-bg text-nb-text font-mono font-bold uppercase shadow-[6px_6px_0_#FFF]',
          position: 'bottom-left'
        }}
      />
      
      {/* Huge background watermark for contact */}
      <h1 className="absolute -top-10 left-0 w-full text-[15vw] font-space font-black text-[#0D0D0D] opacity-10 pointer-events-none select-none tracking-tighter whitespace-nowrap overflow-hidden leading-none">
        GET IN TOUCH
      </h1>

      <div className={`max-w-7xl mx-auto ${styles.paddingX} relative z-10 flex flex-col md:flex-row gap-8 lg:gap-14 py-12`}>
        
        {/* Left Side: Copy */}
        <div className="flex-[0.8] flex flex-col justify-center">
            <div className="border-[4px] border-[#0D0D0D] bg-[#0D0D0D] p-6 shadow-[8px_8px_0_#FFF] inline-block mb-10 w-fit transform -rotate-2">
              <p className="font-mono text-[14px] text-nb-accent font-bold uppercase tracking-widest">// 05 CONNECT</p>
              <h2 className="font-space text-nb-text font-black text-[50px] sm:text-[60px] uppercase tracking-tighter leading-[1]">LET'S <br/> TALK.</h2>
            </div>
            
            <p className="font-space font-bold text-[20px] sm:text-[24px] text-[#0D0D0D] max-w-lg mt-6 leading-relaxed">
              I'M CURRENTLY OPEN FOR NEW OPPORTUNITIES AND EXCITING PROJECTS. FEEL FREE TO REACH OUT IF YOU WANT TO BUILD SOMETHING TOGETHER.
            </p>
            
            <div className="mt-10 flex gap-4">
              <a href="https://linkedin.com/in/swayamsingh" target="_blank" rel="noreferrer" className="w-14 h-14 border-[3px] border-[#0D0D0D] bg-[#0D0D0D] flex justify-center items-center hover:bg-white hover:shadow-[6px_6px_0_#0D0D0D] hover:-translate-y-1 transition-all group">
                <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-6 h-6 filter saturate-0 contrast-200 brightness-200 group-hover:brightness-0 group-hover:invert-0" />
              </a>
              <a href="mailto:swayam.singh.contact@gmail.com" className="w-14 h-14 border-[3px] border-[#0D0D0D] bg-[#0D0D0D] flex justify-center items-center hover:bg-white hover:shadow-[6px_6px_0_#0D0D0D] hover:-translate-y-1 transition-all group">
                <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" className="w-6 h-6 filter saturate-0 contrast-200 brightness-200 group-hover:brightness-50 group-hover:invert-0" />
              </a>
            </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:max-w-[560px] md:ml-auto bg-white border-[4px] border-[#0D0D0D] shadow-[10px_10px_0_#0D0D0D] p-6 sm:p-8">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col">
              <span className="font-space text-[#0D0D0D] font-black uppercase text-lg mb-2">YOUR NAME</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="JOHN DOE"
                className={`bg-nb-surface-2 border-[4px] py-3 px-4 text-nb-text font-space font-bold text-base placeholder:text-nb-muted outline-none focus:bg-[#0D0D0D] focus:shadow-[6px_6px_0_var(--nb-accent)] transition-all ${
                  errors.name ? 'border-nb-accent-2' : 'border-[#0D0D0D]'
                }`}
              />
              {errors.name && <span className="font-mono text-nb-accent-2 font-bold mt-2 text-sm">!! {errors.name}</span>}
            </label>

            <label className="flex flex-col">
              <span className="font-space text-[#0D0D0D] font-black uppercase text-lg mb-2">YOUR EMAIL</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="JOHN@EXAMPLE.COM"
                className={`bg-nb-surface-2 border-[4px] py-3 px-4 text-nb-text font-space font-bold text-base placeholder:text-nb-muted outline-none focus:bg-[#0D0D0D] focus:shadow-[6px_6px_0_var(--nb-accent)] transition-all ${
                  errors.email ? 'border-nb-accent-2' : 'border-[#0D0D0D]'
                }`}
              />
              {errors.email && <span className="font-mono text-nb-accent-2 font-bold mt-2 text-sm">!! {errors.email}</span>}
            </label>

            <label className="flex flex-col">
              <span className="font-space text-[#0D0D0D] font-black uppercase text-lg mb-2">YOUR MESSAGE</span>
              <textarea
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="LET'S BUILD SOMETHING."
                className={`bg-nb-surface-2 border-[4px] py-3 px-4 text-nb-text font-space font-bold text-base placeholder:text-nb-muted outline-none focus:bg-[#0D0D0D] focus:shadow-[6px_6px_0_var(--nb-accent)] transition-all resize-none ${
                  errors.message ? 'border-nb-accent-2' : 'border-[#0D0D0D]'
                }`}
              />
              {errors.message && <span className="font-mono text-nb-accent-2 font-bold mt-2 text-sm">!! {errors.message}</span>}
            </label>

            <button
              type="submit"
              className="mt-2 bg-[#0D0D0D] border-[4px] border-[#0D0D0D] text-nb-accent font-black tracking-widest uppercase py-4 px-8 text-lg hover:bg-nb-accent hover:text-[#0D0D0D] hover:shadow-[8px_8px_0_#0D0D0D] hover:-translate-y-1 active:translate-y-1 active:shadow-[0px_0px_0_#0D0D0D] transition-all"
            >
              {loading ? "TRANSMITTING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
        
      </div>
    </section>
  );
};

export default Contact;