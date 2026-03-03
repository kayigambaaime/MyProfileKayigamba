"use client";

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { Group, MathUtils, Color } from 'three';
import * as THREE from 'three';
import { useTheme } from '@/app/providers';

// Simple Particles component using Three.js
const ParticleField = () => {
  const { theme } = useTheme();
  const groupRef = useRef<Group>(null);
  const { mouse } = useThree();
  
  // Create a custom particles system
  useEffect(() => {
    if (!groupRef.current) return;

    // Clear previous children if any
    while(groupRef.current.children.length > 0) {
      groupRef.current.remove(groupRef.current.children[0]);
    }
    
    // Create particles
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    const particleColors = theme === 'dark' 
      ? [new Color('#8c61ff'), new Color('#536dfe'), new Color('#2979ff')] 
      : [new Color('#ff9d7a'), new Color('#ff7a7a'), new Color('#ff7ac6')];
    
    // Set random positions
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    // Create geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create material
    const material = new THREE.PointsMaterial({
      size: 0.05,
      transparent: true,
      color: particleColors[0],
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    // Create points
    const particles = new THREE.Points(geometry, material);
    groupRef.current.add(particles);
    
  }, [theme]);
  
  // Mouse movement effect
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.1,
        0.1
      );
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.1,
        0.1
      );
    }
  });

  return <group ref={groupRef} />;
};

// Simple floating object (replacing the Text component)
const FloatingObject = () => {
  const { theme } = useTheme();
  const groupRef = useRef<Group>(null);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
    }
  });
  
  const color = theme === 'dark' ? '#ffffff' : '#000000';
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh>
        <torusKnotGeometry args={[0.7, 0.2, 128, 32]} />
        <meshStandardMaterial color={color} wireframe={true} />
      </mesh>
    </group>
  );
};

// Animated Background Spheres
const BackgroundSpheres = () => {
  const spheresRef = useRef<Group>(null);
  const { theme } = useTheme();
  
  useFrame(({ clock }) => {
    if (spheresRef.current) {
      spheresRef.current.rotation.x = clock.getElapsedTime() * 0.05;
      spheresRef.current.rotation.y = clock.getElapsedTime() * 0.08;
    }
  });
  
  const sphereColor = theme === 'dark' ? '#222' : '#f5f5f5';
  
  return (
    <group ref={spheresRef} position={[0, 0, -5]}>
      <mesh position={[-4, 2, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={sphereColor} wireframe />
      </mesh>
      <mesh position={[4, -2, -2]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color={sphereColor} wireframe />
      </mesh>
      <mesh position={[0, 3, -3]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color={sphereColor} wireframe />
      </mesh>
    </group>
  );
};

// Main Scene Component
const Scene = () => {
  const sceneRef = useRef<Group>(null);
  
  return (
    <group ref={sceneRef}>
      <BackgroundSpheres />
      <ParticleField />
      <FloatingObject />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="city" />
    </group>
  );
};

// Main Component with Canvas
const HeroScene = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="canvas-container h-screen w-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]} // Responsive DPR for performance
      >
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#202020', 5, 20]} />
        <Scene />
        <Preload all />
      </Canvas>
    </div>
  );
};

export default HeroScene;