# Technical Specification: "LIDAR-Vision" Portfolio Website

---

**Target Platform:** GitHub Pages (`github.io`)

**Developer:** Aditya Vadali

**Core Theme:** LIDAR / Point Cloud Aesthetic (High-tech, perception-focused)

---

## 1. Project Stack & Architecture

- **Framework:** Astro (Static Site Generation)
- **Styling:** Tailwind CSS
- **Animation/3D:** * `Three.js` (for the background point cloud)
    - `Framer Motion` (for bento-grid entrance and micro-interactions)
- **Icons:** `Lucide React` or `Simple Icons` (for GitHub/LinkedIn)

---

## 2. Visual DNA (The "LIDAR" Vibe)

- **Background:** Deep Obsidian (`#020617`).
- **Accent Colors:** * Primary: "Depth Map Pink" (`#f472b6`)
    - Secondary: "LIDAR Cyan" (`#22d3ee`)
    - Glow: Semi-transparent variants of accents with `blur-3xl`.
- **Typography:** * Headings: A technical sans-serif (e.g., *Inter* or *Space Grotesk*).
    - Monospace: For labels and metadata (e.g., *JetBrains Mono*).

---

## 3. Core Components to Build

### A. The "Point Cloud" Background (Three.js Island)

- **Logic:** Generate 2,000–5,000 small particles (vertices).
- **Interactivity:** The particles should subtly drift. When the mouse moves, the particles should slightly displace or "light up" within a radius of the cursor, mimicking a LIDAR scan hitting a surface.
- **Performance:** Implement as a persistent Astro Island with `client:load` to ensure smooth 60fps.

### B. The "Topological" Bento Grid

A responsive grid (Tailwind `grid-cols-4`) containing:

1. **Hero Tile (2x2):** Name: **Aditya Vadali**, Title: **Perception & Robotic Vision**. Enthusiastic summary.
2. **Active Project (2x1):** "Image-based End-to-End Topological Navigation for Indoor Scenes." Include a "Status: Active" pulsing LED effect.
3. **Social Links (1x1):** GitHub & LinkedIn icons with high-contrast hover glows.
4. **Tech Stack (1x1):** Marquee or static list of icons (Python, C++, ROS2, PyTorch).
5. **Research Interests (1x1):** "Perception," "Robotic Vision," "Multi-Agent Systems."

---

## 4. Content & Copy

### Identity

- **Name:** Aditya Vadali
- **Headline:** "Mapping the world through the lens of Robotics."
- **Bio:** "Focused on the intersection of Perception and Robotic Vision. Currently engineering systems that allow robots to navigate complex indoor environments using topological mapping and end-to-end learning."

### Links

- **GitHub:** [CoderKai9001](https://github.com/CoderKai9001)
- **LinkedIn:** [Aditya Vadali Profile](https://www.linkedin.com/in/aditya-chandramouli-vadali-180131289/)

---

## 5. Implementation Instructions for the Agent

> "Agent: Please initialize an Astro project with the Tailwind CSS integration.
> 
> 1. Create a `LidarBackground.tsx` component using `Three.js` that renders a responsive point cloud.
> 2. Build a `BentoGrid.astro` component using Tailwind's grid utilities.
> 3. Ensure the cards have a 'glassmorphism' effect (`backdrop-blur-md` and `border-white/10`).
> 4. Add entrance animations using Framer Motion so the tiles 'pop' in sequentially.
> 5. Set up a `github-pages` deployment workflow in `.github/workflows/deploy.yml`."

---

## 6. Funky Bonus Features to Include

- **Scanline Overlay:** A subtle, fixed-position overlay with `pointer-events-none` that creates very faint horizontal lines across the screen.
- **Coordinates Tracker:** In the bottom-left corner, display the real-time mouse `X, Y, Z` coordinates (Z can be a randomized noise value) to enhance the "Scanning" feel.

---

### The "LIDAR" Background Component (`src/components/LidarBackground.tsx`)

This React component creates a 3D field of points that react to your mouse.

```jsx
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
    containerRef.current.appendChild(renderer.domElement);

    // --- Point Cloud Geometry ---
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const pink = new THREE.Color('#f472b6');
    const cyan = new THREE.Color('#22d3ee');

    for (let i = 0; i < count * 3; i++) {
      const val = (Math.random() - 0.5) * 10;
      positions[i] = val;
      originalPositions[i] = val;
      
      // Gradient color based on position
      const mixed = pink.clone().lerp(cyan, Math.random());
      colors[i] = mixed.r;
      colors[i+1] = mixed.g;
      colors[i+2] = mixed.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    camera.position.z = 5;

    // --- Mouse Interaction ---
    const mouse = new THREE.Vector2(-999, -999);
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);
      
      const posAttr = geometry.attributes.position;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      // Subtle rotation
      points.rotation.y += 0.001;

      // Mouse displacement logic
      for (let i = 0; i < count; i++) {
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        const z = originalPositions[i * 3 + 2];

        // Basic "push" effect
        const dx = mouse.x * 5 - x;
        const dy = mouse.y * 5 - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 1.5) {
          posAttr.setXYZ(i, x + dx * 0.1, y + dy * 0.1, z + 0.2);
        } else {
          // Snap back to original
          posAttr.setXYZ(i, x, y, z);
        }
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 bg-slate-950" />;
};

export default LidarBackground;
```