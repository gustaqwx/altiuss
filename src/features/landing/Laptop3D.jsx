'use client';

import { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  Float,
  Html,
  useGLTF,
  PerspectiveCamera,
  OrbitControls,
} from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Modelo procedural do Notebook (sem depender de arquivo .glb externo)
 * Cria um laptop realista com geometria Three.js
 */
function LaptopModel({
  rotationRef,
  positionRef,
  screenTexture,
  isMobile,
  prefersReducedMotion,
}) {
  const laptopRef = useRef();
  const lidRef = useRef();
  const screenRef = useRef();
  const deckRef = useRef();
  const hingeRef = useRef();

  // Animação de abertura da tampa baseada no scroll
  const [lidAngle, setLidAngle] = useState(Math.PI / 2.2); // ~82 graus (quase aberto)
  const [floatOffset, setFloatOffset] = useState(0);

  // Configurar animação de float (flutuação idle)
  useFrame((state, delta) => {
    if (!prefersReducedMotion) {
      // Float suave usando seno
      const time = state.clock.getElapsedTime();
      setFloatOffset(Math.sin(time * 0.7) * 0.02); // Flutuação sutil

      // Rotação baseada no mouse (aplicada via ref externa)
      if (laptopRef.current && rotationRef.current) {
        const targetRotation = rotationRef.current;
        const currentRotation = laptopRef.current.rotation;

        // Lerp suave para rotação alvo (fator ~0.08 para sensação premium)
        const lerpFactor = 0.08;
        currentRotation.x += (targetRotation.x - currentRotation.x) * lerpFactor;
        currentRotation.y += (targetRotation.y - currentRotation.y) * lerpFactor;
      }

      // Posição vertical (float)
      if (laptopRef.current && positionRef.current) {
        const targetY = positionRef.current.y + floatOffset;
        laptopRef.current.position.y += (targetY - laptopRef.current.position.y) * 0.05;
      }
    }
  });

  // Configurar abertura da tampa baseada no scroll (controlada externamente)
  useFrame(() => {
    if (lidRef.current) {
      lidRef.current.rotation.x = -lidAngle;
    }
  });

  // Dimensões do laptop (proporções 16:10 realistas)
  const dims = useMemo(() => ({
    width: 1.6,      // 16 unidades
    height: 0.12,    // espessura da tampa
    depth: 1.0,      // 10 unidades
    screenInset: 0.08,
    screenBorderRadius: 0.04,
    keyHeight: 0.04,
    trackpadWidth: 0.5,
    trackpadHeight: 0.3,
  }), []);

  return (
    <group ref={laptopRef} position={[0, 0, 0]}>
      {/* Sombra de contato */}
      <ContactShadows
        opacity={0.4}
        scale={1.5}
        blur={2}
        far={5}
        position={[0, -0.6, 0]}
      />

      {/* TAMPA (LID) */}
      <group ref={lidRef} position={[0, dims.depth / 2, 0]} rotation={[-Math.PI / 2.2, 0, 0]}>
        {/* Parte externa da tampa (alumínio) */}
        <mesh
          castShadow
          receiveShadow
          position={[0, dims.height / 2, -dims.depth / 2]}
        >
          <boxGeometry args={[dims.width, dims.height, dims.depth]} />
          <meshStandardMaterial
            color="#1a1f2e"
            metalness={0.8}
            roughness={0.2}
            envMapIntensity={1.2}
          />
        </mesh>

        {/* Chanfro superior da tampa */}
        <mesh
          castShadow
          receiveShadow
          position={[0, dims.height, -dims.depth / 2]}
          rotation={[-Math.PI / 4, 0, 0]}
        >
          <cylinderGeometry
            args={[dims.width / 2 + 0.02, dims.width / 2 + 0.02, dims.height / 2, 4, 1, true]}
          />
          <meshStandardMaterial
            color="#2d3444"
            metalness={0.9}
            roughness={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Logo na tampa traseira */}
        <mesh
          position={[0, dims.height / 2 + 0.001, dims.depth / 2 - 0.001]}
          rotation={[Math.PI, 0, 0]}
        >
          <planeGeometry args={[0.4, 0.3]} />
          <meshBasicMaterial
            color="#6F5FE8"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* TELA (dentro da tampa) */}
        <group position={[0, dims.height / 2 + 0.005, -dims.depth / 2 + dims.screenInset]}>
          {/* Moldura da tela (bezel) */}
          <mesh
            castShadow
            receiveShadow
            position={[0, 0, 0.001]}
          >
            <boxGeometry
              args={[
                dims.width - dims.screenInset * 2,
                dims.depth - dims.screenInset * 2 - 0.1,
                0.01
              ]}
            />
            <meshStandardMaterial
              color="#080a0f"
              metalness={0.1}
              roughness={0.9}
            />
          </mesh>

          {/* Área da tela com conteúdo */}
          <mesh
            ref={screenRef}
            position={[0, 0, 0.006]}
          >
            <planeGeometry
              args={[
                dims.width - dims.screenInset * 2 - 0.04,
                dims.depth - dims.screenInset * 2 - 0.14
              ]}
            />
            <meshPhysicalMaterial
              color="#0a0e14"
              metalness={0.0}
              roughness={0.1}
              transmission={0.1}
              thickness={0.01}
              ior={1.5}
              envMapIntensity={0.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>

          {/* Conteúdo HTML na tela (via drei Html) */}
          <Html
            position={[0, 0, 0.012]}
            transform
            sprite
            distanceFactor={10}
            zIndexRange={[100, 110]}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '24px 20px 16px',
                fontFamily: "'Space Grotesk', 'Segoe UI', sans-serif",
                color: '#E8EEF2',
                background: 'transparent',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '11px',
                  color: '#c8c2ff',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Altius Directio
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: '24px',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#fff',
                  marginBottom: '8px',
                }}
              >
                Seu passo decisivo na carreira de tecnologia começa aqui.
              </div>
              <div
                style={{
                  fontSize: '12px',
                  lineHeight: 1.4,
                  color: '#9ab0c2',
                  marginBottom: '20px',
                }}
              >
                Hard e soft skills baseadas no Future of Jobs Report do WEF.
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '10px', color: '#7a8a9a' }}>Duração</span>
                  <span style={{ fontWeight: 700, fontSize: '20px', color: '#fff' }}>12<small style={{fontSize:'10px'}}>meses</small></span>
                </div>
                <ol style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: 0, padding: 0, listStyle: 'none', fontSize: '9.5px', color: '#9db0c2' }}>
                  {['Explorar', 'Desenvolver', 'Aplicar', 'Decolar'].map((phase, i) => (
                    <li key={phase} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: i === 0 ? '#6F5FE8' : 'transparent',
                          border: i === 0 ? 'none' : '1.5px solid #5a5f6e',
                          boxShadow: i === 0 ? '0 0 6px rgba(111, 95, 232, 0.5)' : 'none',
                        }}
                      />
                      <span>{phase}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Html>

          {/* Reflexo de vidro na tela */}
          <mesh
            position={[0, 0, 0.015]}
          >
            <planeGeometry
              args={[
                dims.width - dims.screenInset * 2 - 0.04,
                dims.depth - dims.screenInset * 2 - 0.14
              ]}
            />
            <meshBasicMaterial
              transparent
              opacity={0.06}
              side={THREE.DoubleSide}
              depthWrite={false}
              color="#ffffff"
            />
          </mesh>

          {/* Notch da câmera */}
          <mesh
            position={[0, (dims.depth - dims.screenInset * 2 - 0.14) / 2 - 0.02, 0.02]}
          >
            <cylinderGeometry args={[0.035, 0.035, 0.01, 16]} />
            <meshStandardMaterial color="#05080c" metalness={0.5} roughness={0.5} />
          </mesh>
        </group>
      </group>

      {/* DOBRADIÇA VISÍVEL */}
      <mesh
        ref={hingeRef}
        castShadow
        receiveShadow
        position={[0, 0, 0]}
      >
        <cylinderGeometry args={[dims.width - 0.1, dims.width - 0.1, 0.05, 8]} />
        <meshStandardMaterial
          color="#181c22"
          metalness={0.7}
          roughness={0.3}
          envMapIntensity={1}
        />
      </mesh>

      {/* BASE (DECK) */}
      <group ref={deckRef} position={[0, -dims.height / 2, 0]}>
        {/* Corpo da base */}
        <mesh
          castShadow
          receiveShadow
          position={[0, dims.keyHeight / 2, 0]}
        >
          <boxGeometry args={[dims.width, dims.keyHeight, dims.depth + 0.1]} />
          <meshStandardMaterial
            color="#b8bcc3"
            metalness={0.6}
            roughness={0.3}
            envMapIntensity={1}
          />
        </mesh>

        {/* Chanfro frontal da base */}
        <mesh
          castShadow
          receiveShadow
          position={[0, 0, (dims.depth + 0.1) / 2]}
          rotation={[-Math.PI / 4, 0, 0]}
        >
          <cylinderGeometry
            args={[dims.width / 2, dims.width / 2, dims.keyHeight / 2, 4, 1, true]}
          />
          <meshStandardMaterial
            color="#d8dbdf"
            metalness={0.7}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* TECLADO */}
        <group position={[0, dims.keyHeight + 0.005, -0.15]}>
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <group key={rowIdx} position={[0, 0, rowIdx * 0.13 - 0.3]}>
              {Array.from({ length: 14 }).map((_, colIdx) => (
                <mesh
                  key={colIdx}
                  castShadow
                  receiveShadow
                  position={[(colIdx - 6.5) * 0.11, 0.01, 0]}
                >
                  <boxGeometry args={[0.095, 0.012, 0.095]} />
                  <meshStandardMaterial
                    color="#14171d"
                    metalness={0.1}
                    roughness={0.8}
                    envMapIntensity={0.3}
                  />
                </mesh>
              ))}
            </group>
          ))}

          {/* Barra de espaço */}
          <mesh
            castShadow
            receiveShadow
            position={[0, 0.01, 0.45]}
          >
            <boxGeometry args={[0.6, 0.012, 0.095]} />
            <meshStandardMaterial color="#14171d" metalness={0.1} roughness={0.8} />
          </mesh>
        </group>

        {/* TRACKPAD */}
        <mesh
          castShadow
          receiveShadow
          position={[0, dims.keyHeight + 0.005, 0.25]}
        >
          <boxGeometry args={[dims.trackpadWidth, 0.008, dims.trackpadHeight]} />
          <meshStandardMaterial
            color="#a8adb5"
            metalness={0.5}
            roughness={0.3}
            envMapIntensity={0.8}
          />
        </mesh>

        {/* Alto-falantes (grills) */}
        {[-1, 1].map((side) => (
          <mesh
            key={side}
            position={[side * 0.65, dims.keyHeight / 2 + 0.002, -0.35]}
          >
            <planeGeometry args={[0.2, 0.04]} />
            <meshBasicMaterial
              color="#2a2f39"
              transparent
              opacity={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}

        {/* Pés de borracha (base inferior) */}
        {[-1, 1].map((side) => (
          <mesh
            key={`foot-${side}`}
            position={[side * 0.6, -dims.keyHeight / 2 - 0.005, side * 0.3]}
          >
            <cylinderGeometry args={[0.025, 0.025, 0.01, 8]} />
            <meshStandardMaterial color="#0a0d10" metalness={0} roughness={1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * Componente principal do Laptop3D com Canvas R3F
 * Gerencia: mouse tracking, scroll animation, device orientation, reduced motion
 */
export default function Laptop3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Estado para controle de movimento
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasGyroscope, setHasGyroscope] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs para animação suave (lerp)
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });

  // Refs para scroll animation
  const scrollProgress = useRef(0);
  const scrollTriggerRef = useRef(null);

  // Detectar preferências de movimento reduzido
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // DeviceOrientation para mobile
  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;

    const handleOrientation = (event) => {
      if (!event.beta || !event.gamma) return;

      // Beta: inclinação frontal/traseira (-180 a 180)
      // Gamma: inclinação lateral (-90 a 90)
      const maxAngle = 25 * (Math.PI / 180); // 25 graus em radianos

      targetRotation.current.x = THREE.MathUtils.clamp(
        (event.beta / 90) * maxAngle,
        -maxAngle,
        maxAngle
      );
      targetRotation.current.y = THREE.MathUtils.clamp(
        (event.gamma / 90) * maxAngle,
        -maxAngle,
        maxAngle
      );

      setHasGyroscope(true);
    };

    if (window.DeviceOrientationEvent) {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ requer permissão
        DeviceOrientationEvent.requestPermission()
          .then((permission) => {
            if (permission === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      } else {
        // Android e outros
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile, prefersReducedMotion]);

  // Mouse tracking para desktop
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handlePointerMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Normalizar para -1 a 1
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = -(clientY / innerHeight) * 2 + 1;

      // Aplicar limite máximo (±25 graus = ~0.436 radianos)
      const maxAngle = 25 * (Math.PI / 180);

      targetRotation.current.y = THREE.MathUtils.clamp(normalizedX * maxAngle, -maxAngle, maxAngle);
      targetRotation.current.x = THREE.MathUtils.clamp(normalizedY * maxAngle * 0.6, -maxAngle * 0.6, maxAngle * 0.6);

      // Parallax sutil de posição
      targetPosition.current.x = normalizedX * 0.15;
      targetPosition.current.y = normalizedY * 0.1;
    };

    // Usar window para capturar movimento em toda a viewport
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [isMobile, prefersReducedMotion]);

  // Scroll-triggered animation (GSAP ScrollTrigger)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const trigger = document.getElementById('programa');
    if (!trigger) return;

    scrollTriggerRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: '#programa',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;

          // Rotação baseada no scroll (de -26° para +14° em Y, -15° para -7° em X)
          const rotY = THREE.MathUtils.lerp(-26 * (Math.PI / 180), 14 * (Math.PI / 180), self.progress);
          const rotX = THREE.MathUtils.lerp(-15 * (Math.PI / 180), -7 * (Math.PI / 180), self.progress);

          // Combinar com rotação do mouse (scroll tem prioridade base, mouse adiciona offset)
          targetRotation.current.y = rotY;
          targetRotation.current.x = rotX;

          // Zoom/approach no scroll
          targetPosition.current.z = THREE.MathUtils.lerp(0, -0.3, self.progress);

          // Abrir tampa progressivamente no scroll
          // Isso seria controlado via ref no modelo
        },
      },
    });

    return () => {
      scrollTriggerRef.current?.kill();
    };
  }, [prefersReducedMotion]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      scrollTriggerRef.current?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Fallback de carregamento
  const Fallback = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #090d16 0%, #12121F 100%)',
        color: '#A99BFF',
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(169, 155, 255, 0.2)',
            borderTopColor: '#A99BFF',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <style jsx>{`
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
        <p style={{ fontSize: '14px', fontWeight: 500 }}>Carregando 3D...</p>
      </div>
    </div>
  );

  // Cena R3F
  const Scene = () => (
    <>
      {/* Câmera posicionada para enquadrar o laptop */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0.3, 2.8]}
        fov={40}
        near={0.1}
        far={100}
      />

      {/* Controles de órbita desabilitados (não queremos que o usuário controle) */}
      <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} enableDamping={false} />

      {/* Iluminação ambiente (HDRI preset) */}
      <Environment
        preset="city"
        background={false}
        ground={false}
      />

      {/* Luz principal (key light) */}
      <directionalLight
        position={[2, 4, 3]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={10}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0005}
      />

      {/* Luz de preenchimento (fill) - quente */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={1.2}
        color="#fff8e7"
      />

      {/* Rim light colorida (azul/roxo da marca) */}
      <directionalLight
        position={[0, -3, -4]}
        intensity={1.8}
        color="#6F5FE8"
      />

      {/* Rim light oposta (magenta/rosa) */}
      <directionalLight
        position={[4, -2, 2]}
        intensity={1}
        color="#A99BFF"
      />

      {/* Luz ambiente suave */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Modelo do Laptop com Float (flutuação idle) */}
      <Float
        speed={0.7}
        rotationIntensity={0.15}
        floatIntensity={0.08}
        enabled={!prefersReducedMotion}
      >
        <LaptopModel
          rotationRef={targetRotation}
          positionRef={targetPosition}
          isMobile={isMobile}
          prefersReducedMotion={prefersReducedMotion}
        />
      </Float>
    </>
  );

  return (
    <div
      ref={containerRef}
      id="laptop-3d-container"
      className="relative w-full h-full min-h-[400px] lg:min-h-[500px] xl:min-h-[600px]"
      style={{ touchAction: 'none' }}
      role="img"
      aria-label="Notebook 3D exibindo a interface do programa Altius Directio, interativo com mouse e scroll"
    >
      {/* Canvas R3F */}
      <Canvas
        ref={canvasRef}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0.3, 2.8], fov: 40 }}
        dpr={[1, 2]}
        shadows={true}
        shadowMapType={THREE.PCFSoftShadowMap}
        onCreated={({ gl }) => {
          // Otimizações de performance
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.physicallyCorrectLights = true;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          outline: 'none',
        }}
      >
        <Suspense fallback={<Fallback />}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* Overlay de indicador mobile (apenas visual) */}
      {isMobile && !hasGyroscope && !prefersReducedMotion && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-mute/60 font-medium px-3 py-1.5 rounded-full bg-ink/50 backdrop-blur-sm border border-white/10 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          Incline o dispositivo para interagir
        </div>
      )}

      {/* Indicador de motion reduzido */}
      {prefersReducedMotion && (
        <div
          className="absolute top-4 left-4 text-xs text-mute/50 font-medium px-3 py-1.5 rounded-full bg-ink/50 backdrop-blur-sm border border-white/10 pointer-events-none"
          style={{ zIndex: 10 }}
        >
          Movimento reduzido ativo
        </div>
      )}
    </div>
  );
}