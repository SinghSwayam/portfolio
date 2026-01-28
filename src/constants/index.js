import opensource from "../assets/github.svg";
import webdev from "../assets/webdev.png";
import circuitComposerImg from "../assets/project_images/circuit-composer-dark.png";
import razorpayCloneImg from "../assets/project_images/razorpay-clone.png";
import studynotionImg from "../assets/project_images/studynotion.png";
import ecomzyImg from "../assets/project_images/ecomzy.png";
import arvrImg from "../assets/project_images/arvrclub.png";
import cplusplus from "../assets/skill_icons/devicon--cplusplus.svg";
import csharp from "../assets/skill_icons/devicon--csharp.svg";
import git from "../assets/skill_icons/devicon--git.svg";
import github from "../assets/skill_icons/devicon--github.svg";
import java from "../assets/skill_icons/devicon--java.svg";
import javascript from "../assets/skill_icons/javascript.png";
import mongodb from "../assets/skill_icons/devicon--mongodb.svg";
import mysql from "../assets/skill_icons/devicon--mysql.svg";
import nextjs from "../assets/skill_icons/devicon--nextjs.svg";
import postman from "../assets/skill_icons/devicon--postman.svg";
import python from "../assets/skill_icons/devicon--python.svg";
import react from "../assets/skill_icons/devicon--react.svg";
import supabase from "../assets/skill_icons/devicon--supabase.svg";
import tailwind from "../assets/skill_icons/devicon--tailwindcss.svg";
import threejs from "../assets/skill_icons/devicon--threejs.svg";
import typescript from "../assets/skill_icons/typescript.svg";
import unity from "../assets/skill_icons/devicon--unity.svg";
import nodejs from "../assets/skill_icons/logos--nodejs-icon.svg";
import gsapIcon from "../assets/skill_icons/simple-icons--gsap.svg";
import oopIcon from "../assets/skill_icons/OOP.png";
import dsaIcon from "../assets/skill_icons/DSA.png";
import osIcon from "../assets/skill_icons/OS.png";

export const navLinks = [
  { id: "about", title: "About" },
  { id: "tech", title: "Tech" },
  { id: "work", title: "Work" },
  { id: "contact", title: "Contact" },
];

export const services = [
  {
    title: "Web Developer",
    icon: webdev,
    color: "#38BDF8",
    desc: "I build fast, responsive, and interactive web applications with modern frameworks and smooth animations"
  },
  {
    title: "Unity Developer",
    icon: unity,
    color: "#FFFFFF",
    desc: "I create immersive 2D/3D experiences, games, and simulations using Unity and C#"
  },
  {
    title: "Open Source Contributor",
    icon: opensource,
    color: "#22C55E",
    desc: "I contribute to open-source projects, fix bugs, improve features, and collaborate with developers worldwide"
  }
];

export const skillsData = [
  {
    category: "Languages",
    skills: [
      { name: "C++", icon: cplusplus },
      { name: "Java", icon: java },
      { name: "JavaScript", icon: javascript },
      { name: "TypeScript", icon: typescript },
      { name: "C#", icon: csharp },
      { name: "Python", icon: python },
    ],
  },
  {
    category: "Frontend Frameworks",
    skills: [
      { name: "React", icon: react },
      { name: "Next.js", icon: nextjs },
      { name: "Three.js", icon: threejs },
      { name: "GSAP", icon: gsapIcon },
      { name: "Tailwind", icon: tailwind },
    ],
  },
  {
    category: "Databases & Data",
    skills: [
      { name: "MySQL", icon: mysql },
      { name: "MongoDB", icon: mongodb },
      { name: "Supabase", icon: supabase },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Node.js", icon: nodejs },
      { name: "Unity", icon: unity },
      { name: "Git", icon: git },
      { name: "Github", icon: github },
      { name: "Postman", icon: postman },
    ],
  },
  {
    category: "Computer Science Concepts",
    skills: [
      { name: "DSA", icon: dsaIcon },
      { name: "OOP", icon: oopIcon },
      { name: "OS", icon: osIcon },
    ],
  },
];

export const projects = [
  {
    name: "AR/VR Club Portal",
    description: "A dynamic web portal for a AR/VR club GHRCEM.",
    tags: [
      { name: "next", color: "text-white" },
      { name: "typescript", color: "text-blue-600" },
      { name: "tailwind", color: "text-cyan-400" },
      { name: "supabase", color: "text-emerald-500" },
    ],
    image: arvrImg,
    source_code_link: "https://github.com/SinghSwayam/AR-VR-Club-Website/",
    live_link: "https://ar-vr-club-website.vercel.app",
  },
  {
    name: "Circuit Composer",
    description: "Quantum Computing circuit composer.",
    tags: [
      { name: "typescript", color: "text-blue-600" },
      { name: "tailwind", color: "text-cyan-400" },
    ],
    image: circuitComposerImg,
    source_code_link: "https://github.com/SinghSwayam/Circuit-Composer/",
    live_link: "https://circuit-composer.vercel.app",
  },
  {
    name: "StudyNotion",
    description: "StudyNotion an ed-tech platform with payment integration.",
    tags: [
      { name: "react", color: "text-sky-400" },
      { name: "javascript", color: "text-yellow-400" },
      { name: "express", color: "text-gray-400" },
      { name: "mongodb", color: "text-green-600" },
      { name: "tailwind", color: "text-cyan-400" },
    ],
    image: studynotionImg,
    source_code_link: "https://github.com/SinghSwayam/StudyNotion",
    live_link: "https://study-notion-drab-phi.vercel.app/",
  },
  {
    name: "ECOMZY",
    description: "E-commerce platform.",
    tags: [
      { name: "react", color: "text-sky-400" },
      { name: "javascript", color: "text-yellow-400" },
      { name: "tailwind", color: "text-cyan-400" },
    ],
    image: ecomzyImg,
    source_code_link: "https://github.com/SinghSwayam/ShoppingCart",
    live_link: "https://ecomzy-ecru.vercel.app/",
  },
  {
    name: "RazorPay Clone",
    description: "Static page of Razorpay cloned.",
    tags: [
      { name: "html", color: "text-orange-400" },
      { name: "tailwind", color: "text-cyan-400" },
    ],
    image: razorpayCloneImg,
    source_code_link: "https://github.com/SinghSwayam/Razorpay_2_0_Tailwind/",
    live_link: "https://razorpay-2-0-tailwind.vercel.app/",
  },
];