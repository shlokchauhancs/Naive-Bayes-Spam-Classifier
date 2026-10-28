"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, RoundedBox } from "@react-three/drei";

function Specimen() {
  return (
    <group>
      {/* Main ceramic body */}
            <RoundedBox args={[1.5, 1.9, 1.5]} radius={0.42} smoothness={12} castShadow>
        <meshPhysicalMaterial
          color="#e8dfce"
          roughness={0.78}
          metalness={0.05}
          clearcoat={0.25}
          clearcoatRoughness={0.6}
        />
      </RoundedBox>
      {/* Recessed ember slit — the design detail */}
      <mesh position={[0, 0.05, 0.76]}>
        <boxGeometry args={[0.55, 0.018, 0.03]} />
        <meshStandardMaterial
          color="#b25c3b"
          roughness={0.4}
          metalness={0.3}
          emissive="#b25c3b"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Small brushed-aluminum dot above the slit */}
      <mesh position={[0, 0.55, 0.75]} castShadow>
        <sphereGeometry args={[0.03, 24, 24]} />
        <meshStandardMaterial
          color="#8a857a"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

export default function CeramicObject() {
  return (
    <div className="relative h-[92vh] w-full">
      <Canvas
        camera={{ position: [0, 0.1, 4.2], fov: 35 }}
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* NO <color attach="background" /> — canvas is transparent so the
            page's studio vignette shows through, blending object into room. */}

        <ambientLight intensity={0.35} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-4, 2, -2]} intensity={0.35} color="#c9a98a" />

        <Environment preset="studio" />

        <Specimen />

        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.35}
          scale={10}
          blur={2.8}
          far={4}
          color="#3d3530"
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.35}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.9}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}