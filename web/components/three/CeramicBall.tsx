"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

function Ball({ hovered }: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.12;
  });
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[1.05, 96, 96]} />
      <meshPhysicalMaterial
        color="#e8dfce"
        roughness={0.78}
        metalness={0.05}
        clearcoat={hovered ? 0.6 : 0.25}
        clearcoatRoughness={0.6}
      />
    </mesh>
  );
}

function EmberDot({ hovered }: { hovered: boolean }) {
  return (
    <mesh position={[0, 1.07, 0]}>
      <sphereGeometry args={[0.03, 24, 24]} />
      <meshStandardMaterial
        color="#b25c3b"
        emissive="#b25c3b"
        emissiveIntensity={hovered ? 1.5 : 0.3}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function CeramicBall({
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
        camera={{ position: [0, 0.2, 4.5], fov: 35 }}
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
        <Ball hovered={hovered} />
        <EmberDot hovered={hovered} />
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