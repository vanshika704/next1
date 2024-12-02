"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue background

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Tulips
    const tulipGeometry = new THREE.ConeGeometry(0.5, 1.5, 32);
    const tulipMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
    for (let i = 0; i < 100; i++) {
      const tulip = new THREE.Mesh(tulipGeometry, tulipMaterial);
      tulip.position.set(
        (Math.random() - 0.5) * 30,
        0.75,
        (Math.random() - 0.5) * 30
      );
      scene.add(tulip);
    }

    // Butterflies
    const butterflyGeometry = new THREE.PlaneGeometry(1, 0.5);
    const butterflyMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const sunLight = new THREE.DirectionalLight(0xffffff, 1);
    sunLight.position.set(10, 10, 10);
    scene.add(sunLight);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Butterfly Animation
      butterflies.forEach((butterfly) => {
        butterfly.position.y += Math.sin(Date.now() * 0.005) * 0.05;
        butterfly.rotation.z += 0.05;
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

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default ThreeScene;
