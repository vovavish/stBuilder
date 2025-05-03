'use client';
import React, { useState, useRef, useEffect, FC } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import * as THREE from 'three';

import { Model_3D_001Props } from './3d-model-001';

const ModelRenderer: FC<{
  url: string;
  mtlUrl?: string;
  textureUrl?: string;
  type: 'stl' | 'obj';
}> = ({ url, mtlUrl, textureUrl, type }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const [model, setModel] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      console.log('Received URL in ModelRenderer:', url);
      if (type === 'stl') {
        const loader = new STLLoader();
        loader.load(url, (geometry) => {
          const material = new THREE.MeshStandardMaterial({
            color: '#4682b4',
            metalness: 0.5,
            roughness: 0.5,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.rotation.x = -Math.PI / 2;
          setModel(mesh);
        });
      } else if (type === 'obj') {
        const objLoader = new OBJLoader();

        if (mtlUrl) {
          const mtlLoader = new MTLLoader();
          if (textureUrl) {
            mtlLoader.setPath(textureUrl.substring(0, textureUrl.lastIndexOf('/') + 1));
          }
          mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(url, (obj) => {
              obj.rotation.x = -Math.PI / 2;
              setModel(obj);
            });
          });
        } else if (textureUrl) {
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(textureUrl, (texture) => {
            const material = new THREE.MeshStandardMaterial({ map: texture });
            objLoader.load(url, (obj) => {
              obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.material = material;
                }
              });
              obj.rotation.x = -Math.PI / 2;
              setModel(obj);
            });
          });
        } else {
          objLoader.load(url, (obj) => {
            obj.rotation.x = -Math.PI / 2;
            setModel(obj);
          });
        }
      }
    };
    loadModel();
  }, [url, mtlUrl, textureUrl, type]);

  if (!model) return null;

  return (
    <Center>
      <primitive ref={meshRef} object={model} scale={[0.1, 0.1, 0.1]} />
    </Center>
  );
};

// Основной компонент блока
export const Model_3D_001_public: FC<Model_3D_001Props> = ({
  modelUrl,
  mtlUrl,
  textureUrl,
  modelType,
  height,
  backgroundColor,
  ambientLightIntensity,
  directionalLightIntensity,
  cameraX,
  cameraY,
  cameraZ,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsInteractive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log('Passing modelUrl to ModelRenderer:', modelUrl);

  return (
    <div
      style={{
        width: '100%',
        height,
        backgroundColor,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Canvas
          style={{ width: '100%', height: '100%' }}
          camera={{ position: [cameraX, cameraY, cameraZ], fov: 50 }}
        >
          <PerspectiveCamera makeDefault position={[cameraX, cameraY, cameraZ]} />
          <ambientLight intensity={ambientLightIntensity} />
          <directionalLight position={[5, 5, 5]} intensity={directionalLightIntensity} />
          <React.Suspense fallback={null}>
            <ModelRenderer url={modelUrl} mtlUrl={mtlUrl} textureUrl={textureUrl} type={modelType} />
          </React.Suspense>
          <OrbitControls
            enablePan={isInteractive}
            enableZoom={isInteractive}
            enableRotate={isInteractive}
          />
        </Canvas>
        {modelUrl && !isInteractive && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 10,
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
            onClick={() => setIsInteractive(true)}
          />
        )}
        {!modelUrl && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              color: '#333',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              border: '2px dashed #333',
            }}
          >
            Добавьте 3D модель
          </div>
        )}
      </div>
    </div>
  );
};