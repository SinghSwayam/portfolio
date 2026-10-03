import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { Toaster, toast } from "react-hot-toast";

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
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("PLEASE FIX THE ERRORS BELOW.", {
        position: "bottom-left",
      });
      return;
    }

    setLoading(true);

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
          });
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          toast.error("COMMUNICATION FAILED. PLEASE TRY AGAIN.", {
            position: "bottom-left",
          });
        }
      );
  };

  return (
    <section
      id="contact"
      className={`relative w-full overflow-hidden ${styles.paddingY} bg-bh-yellow border-b-4 border-bh-border`}
    >
      {/* Toast — Bauhaus styling */}
      <Toaster
        toastOptions={{
          className:
            "border-4 border-bh-border bg-bh-fg text-white font-outfit font-black uppercase shadow-[6px_6px_0px_0px_#121212]",
          position: "bottom-left",
        }}
      />

      {/* Huge background watermark */}
      <h1 className="absolute -top-10 left-0 w-full text-[15vw] font-outfit font-black text-bh-fg opacity-[0.06] pointer-events-none select-none tracking-tighter whitespace-nowrap overflow-hidden leading-none">
        GET IN TOUCH
      </h1>

      {/* Geometric decorations */}
      <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-bh-red border-4 border-bh-border opacity-50 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 bg-bh-blue border-4 border-bh-border opacity-50 pointer-events-none" />

      <div
        className={`max-w-7xl mx-auto ${styles.paddingX} relative z-10 flex flex-col md:flex-row gap-8 lg:gap-14 py-12`}
      >
        {/* Left: Copy */}
        <div className="flex-[0.8] flex flex-col justify-center">
          <div className="border-4 border-bh-border bg-bh-fg p-6 shadow-[8px_8px_0px_0px_#121212] inline-block mb-10 w-fit transform -rotate-2">
            <p className="font-outfit text-[14px] text-bh-yellow font-black uppercase tracking-widest">
              // 05 CONNECT
            </p>
            <h2 className="font-outfit text-white font-black text-[50px] sm:text-[60px] uppercase tracking-tighter leading-[1]">
              LET'S <br /> TALK.
            </h2>
          </div>

          <p className="font-outfit font-bold text-[20px] sm:text-[24px] text-bh-fg max-w-lg mt-6 leading-relaxed">
            I'M CURRENTLY OPEN FOR NEW OPPORTUNITIES AND EXCITING PROJECTS.
            FEEL FREE TO REACH OUT IF YOU WANT TO BUILD SOMETHING TOGETHER.
          </p>

          <div className="mt-10 flex gap-4">
            <a
              href="https://www.linkedin.com/in/singhswayam/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-bh-border bg-white flex justify-center items-center shadow-[6px_6px_0px_0px_#121212] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#121212] transition-all"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </a>
            <a
              href="mailto:swayamsingh.dev@gmail.com"
              aria-label="Email"
              title="Email"
              className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-bh-border bg-white flex justify-center items-center shadow-[6px_6px_0px_0px_#121212] hover:-translate-y-1  hover:shadow-[8px_8px_0px_0px_#121212] transition-all"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/5968/5968534.png"
                alt="Email"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </a>
            <a
              href="https://github.com/singhswayam"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-bh-border bg-white flex justify-center items-center shadow-[6px_6px_0px_0px_#121212] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#121212] transition-all"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                alt="Github"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:max-w-[560px] md:ml-auto bg-white border-4 border-bh-border shadow-[10px_10px_0px_0px_#121212] p-6 sm:p-8">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col">
              <span className="font-outfit text-bh-fg font-black uppercase text-lg mb-2">
                YOUR NAME
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="JOHN DOE"
                className={`bh-input ${
                  errors.name ? "!border-bh-red focus:shadow-[4px_4px_0px_0px_#D02020]" : ""
                }`}
              />
              {errors.name && (
                <span className="font-outfit text-bh-red font-black mt-2 text-sm uppercase">
                  !! {errors.name}
                </span>
              )}
            </label>

            <label className="flex flex-col">
              <span className="font-outfit text-bh-fg font-black uppercase text-lg mb-2">
                YOUR EMAIL
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="JOHN@EXAMPLE.COM"
                className={`bh-input ${
                  errors.email ? "!border-bh-red focus:shadow-[4px_4px_0px_0px_#D02020]" : ""
                }`}
              />
              {errors.email && (
                <span className="font-outfit text-bh-red font-black mt-2 text-sm uppercase">
                  !! {errors.email}
                </span>
              )}
            </label>

            <label className="flex flex-col">
              <span className="font-outfit text-bh-fg font-black uppercase text-lg mb-2">
                YOUR MESSAGE
              </span>
              <textarea
                rows={4}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="LET'S BUILD SOMETHING."
                className={`bh-input resize-none ${
                  errors.message ? "!border-bh-red focus:shadow-[4px_4px_0px_0px_#D02020]" : ""
                }`}
              />
              {errors.message && (
                <span className="font-outfit text-bh-red font-black mt-2 text-sm uppercase">
                  !! {errors.message}
                </span>
              )}
            </label>

            <button
              type="submit"
              className="mt-2 bh-btn bh-btn-red py-4 px-8 text-lg tracking-widest hover:opacity-90 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;