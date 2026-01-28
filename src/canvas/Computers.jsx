import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, Stars } from "@react-three/drei";
import { MathUtils, AdditiveBlending } from "three";
import CanvasLoader from "../components/CanvasLoader";

import useTheme from "../hooks/useTheme";

const FloatingDebris = () => {
  const debrisRef = useRef();
  const theme = useTheme();

  const [initialData] = useState(() => {
    const debrisCount = 20;
    return new Array(debrisCount).fill(0).map(() => ({
      x: (Math.random() - 0.5) * 20 + (Math.random() > 0.5 ? 6 : -6),
      y: (Math.random() - 0.5) * 10,
      z: (Math.random() - 0.5) * 10 - 2,
      rx: Math.random() * 0.01,
      ry: Math.random() * 0.01,
      scale: 0.2 + Math.random() * 0.3,
    }));
  });

  useFrame(() => {
    if (debrisRef.current) {
      debrisRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={debrisRef}>
      {initialData.map((data, i) => (
        <mesh key={i} position={[data.x, data.y, data.z]} scale={[data.scale, data.scale, data.scale]}>
          {i % 2 === 0 ? <icosahedronGeometry args={[1, 0]} /> : <tetrahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color={theme === 'dark' ? "#5e4dcd" : "#7c3aed"}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main Particle Ring
const ParticleRing = ({ isMobile }) => {
  const pointsRef = useRef();
  const wireframeRef = useRef();
  const groupRef = useRef();
  const theme = useTheme();

  const particleCount = isMobile ? 200 : 1000;

  const [particleData] = useState(() => {
    const count = 4000;
    const initial = new Float32Array(count * 3);
    const current = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = MathUtils.randFloatSpread(360);
      const phi = MathUtils.randFloatSpread(360);
      const r = 1 + MathUtils.randFloatSpread(0.2);

      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(theta);

      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;

      current[i * 3] = x;
      current[i * 3 + 1] = y;
      current[i * 3 + 2] = z;
    }
    return { initial, current };
  });

  const { viewport } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(scrollY / heroHeight, isMobile ? 0.5 : 1);
      const targetZ = progress * (isMobile ? 1.5 : 2.5);
      groupRef.current.position.z = MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.1;
      wireframeRef.current.rotation.x = -t * 0.05;
    }

    if (pointsRef.current && pointsRef.current.geometry.attributes.position) {
      const mouseX = (state.mouse.x * viewport.width) / 2;
      const mouseY = (state.mouse.y * viewport.height) / 2;

      const positions = pointsRef.current.geometry.attributes.position.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const oldX = particleData.initial[i3];
        const oldY = particleData.initial[i3 + 1];
        const oldZ = particleData.initial[i3 + 2];

        const angle = t * 0.05;
        const homeX = oldX * Math.cos(angle) - oldZ * Math.sin(angle);
        const homeZ = oldX * Math.sin(angle) + oldZ * Math.cos(angle);
        const homeY = oldY;

        let targetX = homeX, targetY = homeY;

        const dx = mouseX - homeX;
        const dy = mouseY - homeY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const forceRadius = isMobile ? 1.0 : 1.5;

        if (dist < forceRadius) {
          const influence = (forceRadius - dist) / forceRadius;
          const attraction = influence * 0.5;
          targetX += dx * attraction;
          targetY += dy * attraction;
        }

        positions[i3] += (targetX - positions[i3]) * 0.1;
        positions[i3 + 1] += (targetY - positions[i3 + 1]) * 0.1;
        positions[i3 + 2] += (homeZ - positions[i3 + 2]) * 0.1;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} scale={isMobile ? 0.9 : 1.9}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particleData.current.slice(0, particleCount * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.02 : 0.04}
          color={theme === 'dark' ? "#915EFF" : "#2563eb"}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.8}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <mesh ref={wireframeRef} scale={[0.9, 0.9, 0.9]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          wireframe
          color={theme === 'dark' ? "#915EFF" : "#2563eb"}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
};


const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia("(max-width: 768px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      frameloop='always'
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ preserveDrawingBuffer: true, antialias: !isMobile }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {!isMobile && (
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
        )}

        {!isMobile && <FloatingDebris />}
        <ParticleRing isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;