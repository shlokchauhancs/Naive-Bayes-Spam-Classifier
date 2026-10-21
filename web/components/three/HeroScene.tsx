"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Shield() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.4;
      mesh.current.rotation.x = Math.cos(clock.elapsedTime * 0.2) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#fb923c"
          wireframe
          emissive="#ea580c"
          emissiveIntensity={0.55}
        />
      </mesh>
    </Float>
  );
}

function Bubble({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={0.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <RoundedBox args={[0.6, 0.35, 0.1]} radius={0.08} position={position}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.72}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </RoundedBox>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={1.1} color="#fb923c" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#78716c" />
    </>
  );
}

export default function HeroScene() {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const count = isMobile ? 8 : 18;

  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const radius = 3 + (i % 5) * 0.4;
      const theta = (i / count) * Math.PI * 2;
      const y = Math.sin(i * 1.7) * 1.5;
      return {
        position: [
          radius * Math.cos(theta),
          y,
          radius * Math.sin(theta),
        ] as [number, number, number],
        color: i % 3 === 0 ? "#ea580c" : "#78716c",
      };
    });
  }, [count]);

  return (
    <div className="h-[500px] w-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <Lights />
        <Shield />
        {bubbles.map((b, i) => (
          <Bubble key={i} position={b.position} color={b.color} />
        ))}
      </Canvas>
    </div>
  );
}