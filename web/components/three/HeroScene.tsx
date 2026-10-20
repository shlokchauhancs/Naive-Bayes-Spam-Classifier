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
          color="#22d3ee"
          wireframe
          emissive="#22d3ee"
          emissiveIntensity={0.6}
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
          opacity={0.75}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </RoundedBox>
    </Float>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#ef4444" />
    </>
  );
}

export default function HeroScene() {
  const bubbles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => {
      const radius = 3 + (i % 5) * 0.4;
      const theta = (i / 18) * Math.PI * 2;
      const y = (Math.sin(i * 1.7) * 1.5);
      return {
        position: [
          radius * Math.cos(theta),
          y,
          radius * Math.sin(theta),
        ] as [number, number, number],
        color: i % 3 === 0 ? "#ef4444" : "#22d3ee",
      };
    });
  }, []);

  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <Lights />
        <Shield />
        {bubbles.map((b, i) => (
          <Bubble key={i} position={b.position} color={b.color} />
        ))}
      </Canvas>
    </div>
  );
}