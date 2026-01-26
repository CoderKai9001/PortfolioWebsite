import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// --- Barrel Distortion Shader Implementation ---
const DistortionShader = {
  uniforms: {
    tDiffuse: { value: null },
    distortion: { value: 0.18 }, // Adjusted strength
    center: { value: new THREE.Vector2(0.5, 0.5) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float distortion;
    uniform vec2 center;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 offCenter = uv - center;
      float d = length(offCenter);
      
      // Barrel distortion formula
      vec2 distortedUv = center + offCenter * (1.0 + distortion * d * d);
      
      if (distortedUv.x < 0.0 || distortedUv.x > 1.0 || distortedUv.y < 0.0 || distortedUv.y > 1.0) {
        discard;
      }

      // Chromatic Aberration
      float caAmount = 0.015 * distortion;
      float r = texture2D(tDiffuse, distortedUv + vec2(caAmount, 0.0)).r;
      float g = texture2D(tDiffuse, distortedUv).g;
      float b = texture2D(tDiffuse, distortedUv - vec2(caAmount, 0.0)).b;

      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
};

const LidarBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let composer: any;
    let renderer: THREE.WebGLRenderer | undefined;
    let geometry: THREE.BufferGeometry | undefined;
    let material: THREE.PointsMaterial | undefined;
    let animationId: number;

    const init = async () => {
      // Dynamic imports to prevent SSG failures
      const { EffectComposer } = await import('three/examples/jsm/postprocessing/EffectComposer.js');
      const { RenderPass } = await import('three/examples/jsm/postprocessing/RenderPass.js');
      const { ShaderPass } = await import('three/examples/jsm/postprocessing/ShaderPass.js');

      // --- Scene Setup ---
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // --- Post-Processing Setup ---
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const distortionPass = new ShaderPass(DistortionShader);
      composer.addPass(distortionPass);

      // --- Point Cloud Geometry ---
      const count = 3000;
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

        const t = (y + 6) / 12;
        const mixed = brightGreen.clone().lerp(darkerGreen, t * 0.7 + Math.random() * 0.3);
        colors[i * 3] = mixed.r;
        colors[i * 3 + 1] = mixed.g;
        colors[i * 3 + 2] = mixed.b;
      }

      const createCircleTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const context = canvas.getContext('2d');
        if (!context) return null;
        context.beginPath();
        context.arc(32, 32, 28, 0, 2 * Math.PI);
        context.fillStyle = '#ffffff';
        context.fill();
        return new THREE.CanvasTexture(canvas);
      };

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      material = new THREE.PointsMaterial({
        size: 0.045,
        map: createCircleTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        sizeAttenuation: true,
        alphaTest: 0.01,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      camera.position.z = 6;

      const mouse = new THREE.Vector2(-999, -999);
      const targetMouse = new THREE.Vector2(-999, -999);
      const onMouseMove = (e: MouseEvent) => {
        targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      window.addEventListener('mousemove', onMouseMove);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer?.setSize(window.innerWidth, window.innerHeight);
        composer?.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      const animateLoop = () => {
        animationId = requestAnimationFrame(animateLoop);
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;

        const posAttr = geometry!.attributes.position;
        const colAttr = geometry!.attributes.color;
        points.rotation.y += 0.0008;

        for (let i = 0; i < count; i++) {
          const ox = originalPositions[i * 3];
          const oy = originalPositions[i * 3 + 1];
          const oz = originalPositions[i * 3 + 2];
          const dx = mouse.x * 5 - ox;
          const dy = mouse.y * 5 - oy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let newX = ox; let newY = oy; let newZ = oz;
          if (dist < 2) {
            const force = (2 - dist) / 2;
            newX += dx * force * 0.15;
            newY += dy * force * 0.15;
            newZ += force * 0.3;
            colAttr.setXYZ(i, 0.8, 1.0, 0.8);
          } else {
            const t = (oy + 6) / 12;
            const normal = brightGreen.clone().lerp(darkerGreen, t * 0.7);
            colAttr.setXYZ(i, normal.r, normal.g, normal.b);
          }
          posAttr.setXYZ(i, newX, newY, newZ);
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
        composer.render();
      };

      animateLoop();

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animationId);
      };
    };

    const initPromise = init();

    return () => {
      initPromise.then(cleanup => cleanup && cleanup());
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry?.dispose();
      material?.dispose();
      renderer?.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 bg-obsidian pointer-events-none" />;
};

export default LidarBackground;
