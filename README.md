<div align="center">
  <h1>Swayam Singh | Portfolio</h1>
  <p>
    A modern, immersive 3D developer portfolio built with React and Three.js, designed to showcase projects and skills with interactive visuals.
  </p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  </p>
   <p>
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  </p>
</div>

<br />

## Features

- **3D Graphics**: Interactive 3D elements powered by Three.js and React Three Fiber.
- **Smooth Animations**: Seamless transitions and effects using Framer Motion and GSAP.
- **Responsive Design**: Precise styling and layout with TailwindCSS.
- **GitHub Activity**: Integrated GitHub contribution visualization.
- **Contact Form**: Functional contact form powered by EmailJS.
- **Modern Tech Stack**: Built with the React 19 and Vite for fast performance.

## Tech Stack

- **Core**: React 19, Vite
- **Styling**: TailwindCSS
- **3D & Animation**:
  - @react-three/fiber
  - @react-three/drei
  - Maath
  - Framer Motion
  - GSAP
- **Routing**: React Router DOM v7
- **Utilities**: React Hot Toast, React Parallax Tilt, React Github Calendar

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**
   ```bash
   cd portfolio
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   Create a `.env` file in the root directory and add your EmailJS keys (if applicable):
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=your_service_id
   VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```

## Usage

**Start the development server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## Project Structure

```text
portfolio/
├── public/
├── src/
│   ├── assets/
│   ├── canvas/
│   ├── components/
│   ├── constants/
│   ├── hoc/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.js
├── .env
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
