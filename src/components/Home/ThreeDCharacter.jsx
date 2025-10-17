import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export function SpaceCanvas() {
  const ref = useRef(null);
  const animRef = useRef(null);
  const starsRef = useRef([]);
  const nebulaLayersRef = useRef([
    { r: 30, g: 8, b: 40, a: 0.06, scale: 1.0 },
    { r: 6, g: 18, b: 60, a: 0.06, scale: 0.8 },
    { r: 12, g: 40, b: 80, a: 0.05, scale: 0.5 }
  ]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    function initStars() {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
      canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
      canvas.style.width = cssWidth + 'px';
      canvas.style.height = cssHeight + 'px';

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const starsCount = Math.floor((cssWidth * cssHeight) / 4000);
      const stars = Array.from({ length: starsCount }).map(() => ({
        x: Math.random() * cssWidth,
        y: Math.random() * cssHeight,
        z: Math.random(),
        size: Math.random() * 1.5 + 0.2,
        twinkle: Math.random() * Math.PI * 2
      }));
      starsRef.current = stars;
    }

    function drawNebula() {
      nebulaLayersRef.current.forEach((layer, i) => {
        const grad = ctx.createRadialGradient(
          cssWidth * (0.2 + 0.6 * ((i + 0.3) % 1)),
          cssHeight * (0.2 + 0.6 * ((i + 0.7) % 1)),
          100 * layer.scale,
          cssWidth * 0.5,
          cssHeight * 0.5,
          Math.max(cssWidth, cssHeight) * (0.9 * layer.scale)
        );
        grad.addColorStop(0, `rgba(${layer.r},${layer.g},${layer.b},${layer.a})`);
        grad.addColorStop(1, `rgba(0,0,0,0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cssWidth, cssHeight);
      });
    }

    function render(time) {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const g = ctx.createLinearGradient(0, 0, 0, cssHeight);
      g.addColorStop(0, '#0C0C0CFF');
      g.addColorStop(1, '#000000FF');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      ctx.globalCompositeOperation = 'lighter';
      drawNebula();

      ctx.globalCompositeOperation = 'source-over';
      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const t = Math.sin((time / 800) + s.twinkle) * 0.5 + 0.5;
        const brightness = 0.6 + 0.6 * t;
        const px = (s.x + Math.sin((time / 3000) + s.z * 10) * 20 * s.z + cssWidth) % cssWidth;
        const py = (s.y + Math.cos((time / 3500) + s.z * 10) * 20 * s.z + cssHeight) % cssHeight;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${Math.min(1, brightness)})`;
        ctx.arc(px, py, s.size * (0.6 + s.z), 0, Math.PI * 2);
        ctx.fill();

        const glowIntensity = Math.max(0, (t - 0.85) / 0.15);
        if (glowIntensity > 0.01) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(180,220,255,${0.06 * glowIntensity})`;
          ctx.arc(px, py, s.size * 4 * glowIntensity, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 0.02;
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 30; i++) {
        const rx = (Math.sin(time * 0.0001 + i) * 10000) % cssWidth;
        const ry = (Math.cos(time * 0.00013 + i) * 10000) % cssHeight;
        ctx.fillRect(Math.abs(rx), Math.abs(ry), 1, 1);
      }
      ctx.globalAlpha = 1;

      animRef.current = requestAnimationFrame(render);
    }

    initStars();
    const handleResize = () => initStars();
    window.addEventListener('resize', handleResize);
    animRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}

function CameraController({ scrollProgress, setCurrentSection }) {
  const cameraRef = useRef();

  // Positions pour chaque vue représentant des perspectives de démonstration
  const views = [
    {
      position: [0, 1.5, 1.5],
      rotation: [0, 0, 0]
    },
    {
      position: [1.5, 0.8, 0],
      rotation: [0, -Math.PI/2, 0]
    },
    {
      position: [0, 1.2, -2],
      rotation: [0, Math.PI, 0]
    },
    {
      position: [-1.5, 0.8, 0],
      rotation: [0, Math.PI/2, 0]
    }
  ];

  useFrame(() => {
    if (cameraRef.current) {
      const section = Math.floor(scrollProgress * 4);
      const target = views[section];
      cameraRef.current.position.x += (target.position[0] - cameraRef.current.position.x) * 0.05;
      cameraRef.current.position.y += (target.position[1] - cameraRef.current.position.y) * 0.05;
      cameraRef.current.position.z += (target.position[2] - cameraRef.current.position.z) * 0.05;
      cameraRef.current.lookAt(0, 0.5, 0);
      setCurrentSection(section);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={views[0].position}
      fov={50}
    />
  );
}

function Character() {
  // Modèle 3D d'exemple présent dans public/ — utilisé comme démonstration d'avatar/objet
  const gltf = useGLTF('./cop.glb');
  const { scene, animations } = gltf;
  const mixer = useRef(null);
  const characterRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    if (!scene || !animations) {
      console.warn('Scène ou animations non disponibles');
      return;
    }

    // Cherche une animation de mouvement pour rendre le prototype vivant
    const walkAnim = animations.find(a => 
      a.name.toLowerCase().includes('walk') || 
      a.name.toLowerCase().includes('marche') ||
      a.name.toLowerCase().includes('marcher')
    );

    scene.traverse((object) => {
      if (object.isMesh) {
        object.material.toneMapped = false;
        object.material.needsUpdate = true;
      }
    });

    if (!mixer.current) {
      mixer.current = new THREE.AnimationMixer(scene);
    }

    try {
      if (walkAnim) {
        const action = mixer.current.clipAction(walkAnim);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.timeScale = 1;
        action.setEffectiveWeight(1);
        action.play();
        animationRef.current = action;
      }
    } catch (error) {
      console.error('Erreur animation:', error);
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current.uncacheRoot(scene);
      }
    };
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return (
    <primitive 
      ref={characterRef} 
      object={scene} 
      scale={0.5} 
      position={[0, 0, 0]} 
      rotation={[0, 0.5, 0]}
    />
  );
}

function ThreeDCharacter({ scrollProgress, setCurrentSection }) {
  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100vh' }}>
      <SpaceCanvas />
      <Canvas
        style={{ height: '100vh', width: '100%', position: 'relative', zIndex: 1 }}
        gl={{ 
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        {/* Ne pas utiliser <color attach="background" args={["transparent"]} /> car THREE.Color n'accepte pas 'transparent' */}
        {/* Laisser le fond du Canvas non défini (transparent) pour laisser apparaître le canvas 2D en dessous */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[1, 2, 3]} 
          intensity={3} 
          color="#ffffff"
        />
        <pointLight
          position={[-2, 2, -2]}
          intensity={0.5}
          color="#ffffff"
        />
        <Character />
        <CameraController scrollProgress={scrollProgress} setCurrentSection={setCurrentSection} />
      </Canvas>
    </div>
  );
}

export default ThreeDCharacter;
