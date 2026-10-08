'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function NeuralSphere({ isMobile }: { isMobile: boolean }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  const particleCount = isMobile ? 600 : 1600;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#06b6d4'); // Cyan
    const color2 = new THREE.Color('#6366f1'); // Indigo
    const color3 = new THREE.Color('#10b981'); // Emerald

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      const radius = 2.4 + (Math.random() - 0.5) * 0.4;

      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      // Color interpolation
      const mixedColor = color1.clone().lerp(i % 2 === 0 ? color2 : color3, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12;
      pointsRef.current.rotation.x += delta * 0.04;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group>
      {/* Outer Particle Constellation */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.04 : 0.045}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle Inner Holographic Wireframe Core */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          wireframe
          color="#38bdf8"
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-48 h-48 rounded-full border border-cyan-500/20 animate-pulse bg-gradient-to-tr from-cyan-500/10 to-indigo-500/10 blur-xl" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <NeuralSphere isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
