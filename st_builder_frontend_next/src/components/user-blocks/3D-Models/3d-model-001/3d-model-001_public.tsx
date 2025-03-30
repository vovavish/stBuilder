"use client";
import React, { useState, useRef, useEffect, FC } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/examples/jsm/Addons.js';

import * as THREE from 'three';

export interface Model_3D_001Props {
  modelUrl: string;
  mtlUrl: string;
  textureUrl: string;
  modelType: 'stl' | 'obj';
  height: string;
  backgroundColor: string;
  ambientLightIntensity: number;
  directionalLightIntensity: number;
}

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
          setModel(mesh);
        });
      } else if (type === 'obj') {
        const objLoader = new OBJLoader();

        if (mtlUrl) {
          const mtlLoader = new MTLLoader();
          // Устанавливаем путь для текстур, если он предоставлен
          if (textureUrl) {
            mtlLoader.setPath(textureUrl.substring(0, textureUrl.lastIndexOf('/') + 1));
          }
          mtlLoader.load(mtlUrl, (materials) => {
            materials.preload();
            objLoader.setMaterials(materials);
            objLoader.load(url, (obj) => {
              setModel(obj);
            });
          });
        } else if (textureUrl) {
          // Если MTL нет, но есть текстура
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(textureUrl, (texture) => {
            const material = new THREE.MeshStandardMaterial({ map: texture });
            objLoader.load(url, (obj) => {
              obj.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  child.material = material;
                }
              });
              setModel(obj);
            });
          });
        } else {
          // Без MTL и текстур
          objLoader.load(url, (obj) => {
            setModel(obj);
          });
        }
      }
    };
    loadModel();
  }, [url, mtlUrl, textureUrl, type]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  if (!model) return null;

  return <primitive ref={meshRef} object={model} scale={[0.1, 0.1, 0.1]} />;
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
  ...props
}) => {
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
      <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [0, 0, 5], fov: 50 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight position={[5, 5, 5]} intensity={directionalLightIntensity} />
        <React.Suspense fallback={null}>
          <ModelRenderer url={modelUrl} mtlUrl={mtlUrl} textureUrl={textureUrl} type={modelType} />
        </React.Suspense>
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};
