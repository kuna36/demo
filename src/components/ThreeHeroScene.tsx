import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Eye, Sparkles, Layers, Maximize2, Compass } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.tsx';

interface ThreeHeroSceneProps {
  fallbackImage: string;
  onExploreServices: () => void;
  onExploreAccessories: () => void;
  onExploreJewellery: () => void;
}

export function ThreeHeroScene({
  fallbackImage,
  onExploreServices,
  onExploreAccessories,
  onExploreJewellery,
}: ThreeHeroSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const { accentConfig } = useTheme();
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [activeZone, setActiveZone] = useState<'all' | 'xerox' | 'accessories' | 'jewellery'>('all');
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);
  const laserBeamRef = useRef<THREE.Mesh | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const accentLightRef = useRef<THREE.DirectionalLight | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Mouse & smooth camera interpolation
  const mouseState = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    camTargetX: 0,
    camTargetY: 0,
    camTargetZ: 5.2,
    lookTargetX: 0,
    lookTargetY: 0,
    isDragging: false,
    dragStartX: 0,
    manualRotY: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container || viewMode !== '3d') return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    // 3. Renderer with high color fidelity
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const warmLight = new THREE.DirectionalLight(accentConfig.hexNumber, 1.8);
    warmLight.position.set(3, 4, 4);
    accentLightRef.current = warmLight;
    scene.add(warmLight);

    const coolRim = new THREE.DirectionalLight(0x38BDF8, 0.9);
    coolRim.position.set(-4, 2, 2);
    scene.add(coolRim);

    // Interactive pointer spotlight
    const mouseSpot = new THREE.PointLight(accentConfig.hexNumber, 2.5, 6);
    mouseSpot.position.set(0, 0, 2);
    pointLightRef.current = mouseSpot;
    scene.add(mouseSpot);

    // 5. Main 3D Spatial Group
    const mainGroup = new THREE.Group();
    meshGroupRef.current = mainGroup;
    scene.add(mainGroup);

    // 6. Texture Loader for the Gemini Artwork
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      fallbackImage,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;

        // Create high-res curved billboard plane for cinematic spatial depth
        const planeGeo = new THREE.PlaneGeometry(6.6, 3.8, 32, 16);
        const planeMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.45,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });

        const backdropMesh = new THREE.Mesh(planeGeo, planeMat);
        backdropMesh.position.set(0, 0, 0);
        mainGroup.add(backdropMesh);

        // Subtle decorative champagne frame border
        const frameGeo = new THREE.RingGeometry(0, 0.02, 4);
        const frameMat = new THREE.MeshBasicMaterial({ color: 0xD9B779 });
      },
      undefined,
      (err) => {
        console.warn('Could not load 3D texture, falling back to 2D view', err);
        setWebglSupported(false);
      }
    );

    // 7. 3D Animated Laser Scanning Light Overlay (Aligned with copier bed on left)
    const laserGeo = new THREE.BoxGeometry(1.8, 0.04, 0.02);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.85,
    });
    const laserBeam = new THREE.Mesh(laserGeo, laserMat);
    laserBeam.position.set(-1.8, 0.5, 0.08);
    laserBeamRef.current = laserBeam;
    mainGroup.add(laserBeam);

    // 8. 3D Golden Jewel Accent Ring floating in 3D near Jewellery section
    const ringGeo = new THREE.TorusGeometry(0.22, 0.035, 24, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xD9B779,
      metalness: 0.95,
      roughness: 0.15,
    });
    const goldRing = new THREE.Mesh(ringGeo, ringMat);
    goldRing.position.set(1.4, -0.4, 0.35);
    goldRing.rotation.x = 1.0;
    ringRef.current = goldRing;
    mainGroup.add(goldRing);

    // 9. Floating 3D Champagne Stardust Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.5;
      particlePositions[i + 2] = Math.random() * 2.5 - 0.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xD9B779,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 10. Mouse / Pointer Tracking
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseState.current.targetX = nx;
      mouseState.current.targetY = ny;

      // Update spot light position
      if (pointLightRef.current) {
        pointLightRef.current.position.x = nx * 2.8;
        pointLightRef.current.position.y = ny * 1.6;
      }

      if (mouseState.current.isDragging) {
        const deltaX = e.clientX - mouseState.current.dragStartX;
        mouseState.current.manualRotY += deltaX * 0.003;
        mouseState.current.dragStartX = e.clientX;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      mouseState.current.isDragging = true;
      mouseState.current.dragStartX = e.clientX;
    };

    const handlePointerUp = () => {
      mouseState.current.isDragging = false;
    };

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const nx = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseState.current.targetX = nx * 0.7;
        mouseState.current.targetY = ny * 0.7;
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize handler
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      cameraRef.current.aspect = nw / nh;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };
    window.addEventListener('resize', handleResize);

    // 11. Animation Loop
    let clock = new THREE.Clock();
    let scanY = 0.5;
    let scanDir = 1;

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Laser Scanner Animation: Sweeps across the copier plate
      if (laserBeamRef.current) {
        scanY += scanDir * delta * 0.45;
        if (scanY > 0.85) {
          scanY = 0.85;
          scanDir = -1;
        } else if (scanY < 0.15) {
          scanY = 0.15;
          scanDir = 1;
        }
        laserBeamRef.current.position.y = scanY;
        laserBeamRef.current.position.z = 0.05 + Math.sin(elapsed * 2) * 0.02;
      }

      // Rotating gold jewellery ring
      if (ringRef.current) {
        ringRef.current.rotation.y += delta * 1.2;
        ringRef.current.rotation.z = Math.sin(elapsed * 1.5) * 0.2;
      }

      // Particles gentle drift
      particles.rotation.y = elapsed * 0.03;

      // Smooth interpolation for mouse parallax
      mouseState.current.currentX +=
        (mouseState.current.targetX - mouseState.current.currentX) * 0.05;
      mouseState.current.currentY +=
        (mouseState.current.targetY - mouseState.current.currentY) * 0.05;

      // Camera focal adjustment depending on active zone
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 5.2;
      let targetLookX = 0;
      let targetLookY = 0;

      if (activeZone === 'xerox') {
        targetCamX = -1.2;
        targetCamY = 0.2;
        targetCamZ = 4.2;
        targetLookX = -1.2;
      } else if (activeZone === 'accessories') {
        targetCamX = 0.8;
        targetCamY = -0.5;
        targetCamZ = 4.2;
        targetLookX = 0.8;
      } else if (activeZone === 'jewellery') {
        targetCamX = 1.3;
        targetCamY = 0.3;
        targetCamZ = 4.1;
        targetLookX = 1.3;
      }

      // Smooth camera interpolation
      mouseState.current.camTargetX += (targetCamX - mouseState.current.camTargetX) * 0.05;
      mouseState.current.camTargetY += (targetCamY - mouseState.current.camTargetY) * 0.05;
      mouseState.current.camTargetZ += (targetCamZ - mouseState.current.camTargetZ) * 0.05;
      mouseState.current.lookTargetX += (targetLookX - mouseState.current.lookTargetX) * 0.05;
      mouseState.current.lookTargetY += (targetLookY - mouseState.current.lookTargetY) * 0.05;

      // Apply Parallax to Main Group
      if (meshGroupRef.current) {
        const targetRotY = mouseState.current.currentX * 0.15 + mouseState.current.manualRotY;
        const targetRotX = -mouseState.current.currentY * 0.12;

        meshGroupRef.current.rotation.y += (targetRotY - meshGroupRef.current.rotation.y) * 0.08;
        meshGroupRef.current.rotation.x += (targetRotX - meshGroupRef.current.rotation.x) * 0.08;
      }

      camera.position.set(
        mouseState.current.camTargetX + mouseState.current.currentX * 0.2,
        mouseState.current.camTargetY + mouseState.current.currentY * 0.15,
        mouseState.current.camTargetZ
      );
      camera.lookAt(mouseState.current.lookTargetX, mouseState.current.lookTargetY, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [viewMode, activeZone, fallbackImage]);

  // Dynamically update Three.js lights when theme color changes
  useEffect(() => {
    if (accentLightRef.current) {
      accentLightRef.current.color.setHex(accentConfig.hexNumber);
    }
    if (pointLightRef.current) {
      pointLightRef.current.color.setHex(accentConfig.hexNumber);
    }
  }, [accentConfig]);

  return (
    <div
      className="relative w-full h-[480px] lg:h-[560px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#101827] via-[#171A21] to-[#0D121D] border border-neutral-800 shadow-2xl flex items-center justify-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D WebGL Canvas Layer */}
      {viewMode === '3d' && webglSupported ? (
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
          title="Move your mouse or drag horizontally to explore 3D spatial perspective"
        />
      ) : (
        /* Pure Ultra-HD Studio Photography Mode */
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={fallbackImage}
            alt="SRIVIGNESH XEROX & ONLINE WORKS premium multi-service workspace"
            className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-transparent to-[#101827]/40 pointer-events-none" />
        </div>
      )}

      {/* Top Floating Control Pill */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-3 pointer-events-auto z-10">
        <div className="flex items-center gap-2 bg-[#101827]/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-neutral-700/70 text-xs text-white shadow-lg">
          <Sparkles className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
          <span className="font-semibold text-xs">
            {viewMode === '3d' ? '3D Spatial Interactive Stage' : 'Ultra-HD Commercial View'}
          </span>
          <span className="text-neutral-500">·</span>
          <span className="text-[11px] text-neutral-400">Gemini Master Visual</span>
        </div>

        <div className="flex items-center gap-2">
          {webglSupported && (
            <button
              type="button"
              onClick={() => setViewMode(viewMode === '3d' ? 'photo' : '3d')}
              className="px-3 py-1.5 rounded-xl border border-neutral-700 bg-[#101827]/85 backdrop-blur-md text-xs font-semibold text-neutral-200 hover:text-white transition-all flex items-center gap-1.5 shadow-lg active:scale-95"
              title="Switch between 3D Spatial Parallax and Direct HD Studio Image"
            >
              <Layers className="w-3.5 h-3.5" style={{ color: accentConfig.primary }} />
              <span>{viewMode === '3d' ? 'Switch to Studio Photo' : 'Enter 3D Stage'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive 3D Camera Inspector Badges */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-auto z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Hotspot 1: Xerox & Printing Hub */}
        <button
          type="button"
          onClick={() => {
            setActiveZone(activeZone === 'xerox' ? 'all' : 'xerox');
            onExploreServices();
          }}
          className={`text-left p-3 rounded-xl border transition-all backdrop-blur-md flex flex-col justify-between ${
            activeZone === 'xerox'
              ? 'bg-[#101827]/95 shadow-md'
              : 'bg-[#101827]/80 border-neutral-700/70 hover:border-neutral-500'
          }`}
          style={{
            borderColor: activeZone === 'xerox' ? accentConfig.primary : undefined,
            boxShadow: activeZone === 'xerox' ? `0 0 16px ${accentConfig.soft}` : undefined,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-bold tracking-wider uppercase"
              style={{ color: accentConfig.light }}
            >
              01. Service Station
            </span>
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          <p className="text-xs font-semibold text-white mt-1">Xerox, Print & Scan</p>
          <span className="text-[11px] text-neutral-400 mt-0.5">High-speed commercial copiers</span>
        </button>

        {/* Hotspot 2: Everyday Accessories */}
        <button
          type="button"
          onClick={() => {
            setActiveZone(activeZone === 'accessories' ? 'all' : 'accessories');
            onExploreAccessories();
          }}
          className={`text-left p-3 rounded-xl border transition-all backdrop-blur-md flex flex-col justify-between ${
            activeZone === 'accessories'
              ? 'bg-[#101827]/95 shadow-md'
              : 'bg-[#101827]/80 border-neutral-700/70 hover:border-neutral-500'
          }`}
          style={{
            borderColor: activeZone === 'accessories' ? accentConfig.primary : undefined,
            boxShadow: activeZone === 'accessories' ? `0 0 16px ${accentConfig.soft}` : undefined,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-bold tracking-wider uppercase"
              style={{ color: accentConfig.light }}
            >
              02. Retail Hub
            </span>
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          <p className="text-xs font-semibold text-white mt-1">Mobile Accessories</p>
          <span className="text-[11px] text-neutral-400 mt-0.5">Cables, adapters & wireless audio</span>
        </button>

        {/* Hotspot 3: Jewellery Showcase */}
        <button
          type="button"
          onClick={() => {
            setActiveZone(activeZone === 'jewellery' ? 'all' : 'jewellery');
            onExploreJewellery();
          }}
          className={`text-left p-3 rounded-xl border transition-all backdrop-blur-md flex flex-col justify-between ${
            activeZone === 'jewellery'
              ? 'bg-[#101827]/95 shadow-md'
              : 'bg-[#101827]/80 border-neutral-700/70 hover:border-neutral-500'
          }`}
          style={{
            borderColor: activeZone === 'jewellery' ? accentConfig.primary : undefined,
            boxShadow: activeZone === 'jewellery' ? `0 0 16px ${accentConfig.soft}` : undefined,
          }}
        >
          <div className="flex items-center justify-between">
            <span
              className="text-[11px] font-bold tracking-wider uppercase"
              style={{ color: accentConfig.light }}
            >
              03. Style Showcase
            </span>
            <Eye className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          <p className="text-xs font-semibold text-white mt-1">Jewellery & Adornments</p>
          <span className="text-[11px] text-neutral-400 mt-0.5">Gold-finish bangles & jhumkas</span>
        </button>
      </div>

      {/* Subtle Guidance Indicator */}
      {viewMode === '3d' && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none text-[11px] text-neutral-400 bg-neutral-900/70 backdrop-blur-sm px-3 py-1 rounded-full border border-neutral-800 hidden sm:block">
          Move pointer to pan perspective · Real-time 3D depth & lighting
        </div>
      )}
    </div>
  );
}
