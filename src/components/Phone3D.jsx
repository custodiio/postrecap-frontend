import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, ContactShadows, Environment, Float, Center } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ─── Partículas flutuantes ────────────────────────────── */
function FloatingParticles({ count = 60 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.getElapsedTime() * 0.03;
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8a3ffc"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Anel orbital luminoso ────────────────────────────── */
function OrbitalRing({ radius = 2.5, color = '#00f2fe', speed = 0.3 }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.getElapsedTime() * speed;
      ref.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.15;
    }
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.35}
        toneMapped={false}
      />
    </mesh>
  );
}

/* ─── Modelo do iPhone 16 com textura aplicada DENTRO da tela ──── */
function SmartphoneModel(props) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/iphone16.glb');
  const screenTexture = useTexture('/images/tiktok_screen.png');

  // Configura qualidade da textura
  screenTexture.colorSpace = THREE.SRGBColorSpace;
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;
  screenTexture.generateMipmaps = false;

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    // Rotaciona o modelo 180 graus para a tela ficar de frente
    clone.rotation.y = Math.PI;

    // Percorre todos os meshes para encontrar e substituir a TELA
    clone.traverse((child) => {
      if (child.isMesh) {
        const emissive = child.material?.emissive;
        const isScreen = emissive &&
          emissive.r > 0.9 && emissive.g > 0.9 && emissive.b > 0.9;

        if (isScreen) {
          console.log(`[PostRecap] ✅ TELA ENCONTRADA: "${child.name}"`);

          const geometry = child.geometry;

          // FORÇA regeneração de UVs — as originais são lixo de material sólido
          console.log('[PostRecap] Regenerando UVs por projeção planar...');
          geometry.computeBoundingBox();
          const bb = geometry.boundingBox;
          const positions = geometry.attributes.position;
          const uvs = new Float32Array(positions.count * 2);

          const sizeX = bb.max.x - bb.min.x || 1;
          const sizeY = bb.max.y - bb.min.y || 1;

          for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            uvs[i * 2] = (x - bb.min.x) / sizeX;
            uvs[i * 2 + 1] = (y - bb.min.y) / sizeY;
          }

          geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

          // Debug: log UV range e status da textura
          let uMin = Infinity, uMax = -Infinity, vMin = Infinity, vMax = -Infinity;
          for (let i = 0; i < positions.count; i++) {
            const u = uvs[i * 2];
            const v = uvs[i * 2 + 1];
            if (u < uMin) uMin = u;
            if (u > uMax) uMax = u;
            if (v < vMin) vMin = v;
            if (v > vMax) vMax = v;
          }
          console.log(`[PostRecap] UV Range: U[${uMin.toFixed(3)}-${uMax.toFixed(3)}] V[${vMin.toFixed(3)}-${vMax.toFixed(3)}]`);
          console.log(`[PostRecap] Textura: image=${screenTexture.image ? `${screenTexture.image.width}x${screenTexture.image.height}` : 'NULL'}, flipY=${screenTexture.flipY}`);

          // Aplica a textura diretamente no material do mesh
          child.material = new THREE.MeshBasicMaterial({
            map: screenTexture,
            toneMapped: false,
            side: THREE.DoubleSide,
          });
          child.material.needsUpdate = true;
          console.log('[PostRecap] ✅ Material substituído com sucesso');
        }
      }
    });

    // Calcula bounding box para auto-escalar
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Escala automática para que a maior dimensão seja ~4.1 unidades
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 4.1;
    const scaleFactor = targetSize / maxDim;

    clone.scale.multiplyScalar(scaleFactor);
    clone.position.sub(center.multiplyScalar(scaleFactor));

    return clone;
  }, [scene, screenTexture]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.getElapsedTime() * 0.3) * 0.15 +
        state.pointer.x * 0.3;
      groupRef.current.rotation.x =
        Math.cos(state.clock.getElapsedTime() * 0.2) * 0.08 +
        -state.pointer.y * 0.15;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload
useGLTF.preload('/models/iphone16.glb');

/* ─── Componente principal exportado ───────────────────── */
export default function Phone3D() {
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [modelError, setModelError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebGlSupported(support);
    } catch (e) {
      setWebGlSupported(false);
    }
  }, []);

  if (!webGlSupported) {
    return <FallbackPhone />;
  }

  return (
    <div style={{
      width: '100%',
      height: '600px',
      position: 'relative',
      cursor: 'grab'
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onError={() => setModelError(true)}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        <pointLight position={[3, 1, 2]} intensity={3} color="#ff0050" />
        <pointLight position={[-3, -1, 2]} intensity={3} color="#00f2fe" />
        <pointLight position={[0, -2, -3]} intensity={1.5} color="#8a3ffc" />

        <Float
          speed={2}
          rotationIntensity={0.15}
          floatIntensity={0.4}
          floatingRange={[-0.1, 0.1]}
        >
          <Center>
            <SmartphoneModel position={[0, 0, 0]} rotation={[0.05, -0.2, 0]} />
          </Center>
        </Float>

        <FloatingParticles count={60} />

        <OrbitalRing radius={1.3} color="#00f2fe" speed={0.25} />
        <OrbitalRing radius={1.75} color="#ff0050" speed={-0.15} />

        <ContactShadows
          opacity={0.4}
          scale={10}
          blur={2.5}
          far={6}
          position={[0, -3, 0]}
          frames={1}
        />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.8}
            mipmapBlur
            intensity={0.6}
            radius={0.7}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

/* ─── Fallback CSS quando WebGL não funciona ────────────── */
function FallbackPhone() {
  return (
    <div style={{
      width: '280px',
      height: '560px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #0e0e15 0%, #15092a 100%)',
      border: '3px solid rgba(138, 63, 252, 0.3)',
      borderRadius: '36px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 60px rgba(138, 63, 252, 0.15)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      animation: 'float 6s ease-in-out infinite'
    }}>
      <div style={{
        width: '100px', height: '22px',
        background: '#06060a',
        borderRadius: '0 0 16px 16px',
        position: 'absolute', top: '0',
        zIndex: 10
      }} />
      <div style={{
        fontSize: '1.8rem',
        fontFamily: 'var(--font-title)',
        fontWeight: '800',
        background: 'linear-gradient(45deg, #00f2fe, #ff0050)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '15px'
      }}>
        PostRecap
      </div>
      <div style={{
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        fontFamily: 'var(--font-body)'
      }}>
        Simulador de Feed Vertical
      </div>
    </div>
  );
}
