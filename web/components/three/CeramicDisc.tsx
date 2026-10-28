"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Disc({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref}>
      {/* The disc body — soft-edged cylinder */}
      <mesh castShadow rotation={[Math.PI / 2.3, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.14, 96]} />
        <meshPhysicalMaterial
          color="#e8dfce"
          roughness={0.78}
          metalness={0.05}
          clearcoat={hovered ? 0.6 : 0.25}
          clearcoatRoughness={0.6}
        />
      </mesh>

      {/* Etched ring — the "specimen" detail */}
      <mesh rotation={[Math.PI / 2.3, 0, 0]} position={[0, 0, 0.071]}>
        <ringGeometry args={[0.72, 0.74, 96]} />
        <meshStandardMaterial
          color="#b25c3b"
          roughness={0.5}
          metalness={0.2}
          emissive="#b25c3b"
          emissiveIntensity={hovered ? 0.6 : 0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function CeramicDisc({
  onClick,
  height = "70vh",
  interactive = true,
}: {
  onClick?: () => void;
  height?: string;
  interactive?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative w-full ${interactive ? "cursor-pointer" : ""}`}
      style={{ height }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 35 }}
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        <directionalLight
          position={[-4, 2, -2]}
          intensity={0.35}
          color="#c9a98a"
        />
        <Environment preset="studio" />
        <Disc hovered={hovered} />
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.35}
          scale={10}
          blur={2.8}
          far={4}
          color="#3d3530"
        />
      </Canvas>
    </div>
  );
}