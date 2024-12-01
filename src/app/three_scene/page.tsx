"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const GardenScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Light blue sky

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 20); // Elevated view

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Ground (Grass)
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x32cd32 }); // Green
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to lie flat
    scene.add(ground);

    // Tulips
    const tulipGeometry = new THREE.ConeGeometry(0.5, 2, 32); // Cone for tulip
    const tulipMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 }); // Red
    for (let i = 0; i < 50; i++) {
      const tulip = new THREE.Mesh(tulipGeometry, tulipMaterial);
      tulip.position.set(
        (Math.random() - 0.5) * 30,
        1,
        (Math.random() - 0.5) * 30
      );
      scene.add(tulip);
    }

    // Butterflies
    const butterflyGeometry = new THREE.PlaneGeometry(1, 0.5); // Wings
    const butterflyMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700, // Yellow
      side: THREE.DoubleSide,
    });
    const butterflies: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>[] = [];
    for (let i = 0; i < 10; i++) {
      const butterfly = new THREE.Mesh(butterflyGeometry, butterflyMaterial);
      butterfly.position.set(
        (Math.random() - 0.5) * 30,
        Math.random() * 5 + 2,
        (Math.random() - 0.5) * 30
      );
      scene.add(butterfly);
      butterflies.push(butterfly);
    }

    // Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft light
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(10, 20, 10);
    scene.add(sunLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate butterflies
      butterflies.forEach((butterfly) => {
        butterfly.position.y += Math.sin(Date.now() * 0.001) * 0.05;
        butterfly.rotation.y += 0.05;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
      }}
    />
  );
};

export default GardenScene;
