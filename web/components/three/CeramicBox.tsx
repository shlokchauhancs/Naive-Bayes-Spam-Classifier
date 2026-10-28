"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, RoundedBox } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Box({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  return (
    <group ref={ref}>
      {/* Ceramic box body */}
      <RoundedBox args={[1.8, 1.2, 1.8]} radius={0.28} smoothness={12} castShadow>
        <meshPhysicalMaterial
          color="#e8dfce"
          roughness={0.78}
          metalness={0.05}
          clearcoat={0.25}
          clearcoatRoughness={0.6}
        />
      </RoundedBox>

      {/* Seam — the "opens here" line, glows on hover */}
      <mesh position={[0, 0, 0.91]}>
        <boxGeometry args={[1.6, 0.015, 0.02]} />
        <meshStandardMaterial
          color="#b25c3b"
          roughness={0.4}
          metalness={0.3}
          emissive="#b25c3b"
          emissiveIntensity={hovered ? 0.9 : 0.15}
        />
      </mesh>

      {/* Small brushed metal tab on top */}
      <mesh position={[0, 0.62, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 24]} />
        <meshStandardMaterial
          color="#8a857a"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export default function CeramicBox({ onClick }: { onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative h-[70vh] w-full ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0.6, 4.5], fov: 35 }}
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

        <Box hovered={hovered} />

        <ContactShadows
          position={[0, -0.85, 0]}
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