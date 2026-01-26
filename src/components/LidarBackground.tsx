import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const LidarBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // --- Point Cloud Geometry ---
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const brightGreen = new THREE.Color('#08CB00');
    const darkerGreen = new THREE.Color('#1a5e00');

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Gradient color based on position
      const t = (y + 6) / 12;
      const mixed = brightGreen.clone().lerp(darkerGreen, t * 0.7 + Math.random() * 0.3);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    // --- Circular Texture Generation ---
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const context = canvas.getContext('2d');
      if (!context) return null;

      context.beginPath();
      context.arc(32, 32, 28, 0, 2 * Math.PI);
      context.fillStyle = '#ffffff';
      context.fill();

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const circleTexture = createCircleTexture();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.045,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      sizeAttenuation: true,
      alphaTest: 0.01,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 6;

    // --- Mouse Interaction ---
    const mouse = new THREE.Vector2(-999, -999);
    const targetMouse = new THREE.Vector2(-999, -999);

    const onMouseMove = (event: MouseEvent) => {
      targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Handle Resize ---
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // --- Animation Loop ---
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Smooth mouse following
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;

      // Subtle rotation
      points.rotation.y += 0.0008;
      points.rotation.x = Math.sin(time * 0.5) * 0.05;

      // Mouse displacement logic
      for (let i = 0; i < count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        // Add gentle floating motion
        const floatY = Math.sin(time + ox * 0.5) * 0.02;
        const floatX = Math.cos(time + oy * 0.5) * 0.02;

        // Mouse interaction - "push" effect
        const dx = mouse.x * 5 - ox;
        const dy = mouse.y * 5 - oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let newX = ox + floatX;
        let newY = oy + floatY;
        let newZ = oz;

        if (dist < 2) {
          const force = (2 - dist) / 2;
          newX += dx * force * 0.15;
          newY += dy * force * 0.15;
          newZ += force * 0.3;

          // Brighten points near cursor
          const scanLineColor = new THREE.Color('#ccffcc');
          colAttr.setXYZ(i, scanLineColor.r, scanLineColor.g, scanLineColor.b);
        } else {
          // Reset color
          const t = (oy + 6) / 12;
          const normal = brightGreen.clone().lerp(darkerGreen, t * 0.7);
          colAttr.setXYZ(i, normal.r, normal.g, normal.b);
        }

        posAttr.setXYZ(i, newX, newY, newZ);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 bg-obsidian pointer-events-none" />;
};

export default LidarBackground;
