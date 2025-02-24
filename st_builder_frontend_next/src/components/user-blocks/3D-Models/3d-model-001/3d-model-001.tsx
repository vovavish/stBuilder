import React, { useState, useRef, useEffect, FC } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNode } from '@craftjs/core';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
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
export const Model_3D_001: FC<Model_3D_001Props> & {
  craft?: {
    props: typeof Product3DBlockDefaultProps;
    related: { settings: typeof Product3DBlockSettings };
  };
} = ({
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
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  console.log('Passing modelUrl to ModelRenderer:', modelUrl);

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
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

// Панель настроек
const Product3DBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log('Generated URL:', url); // Должен быть один blob: URL
      setProp((props: Model_3D_001Props) => {
        props.modelUrl = url;
        props.modelType = file.name.endsWith('.stl') ? 'stl' : 'obj';
      });
    }
  };

  const handleMtlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProp((props: Model_3D_001Props) => (props.mtlUrl = url));
    }
  };

  const handleTextureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProp((props: Model_3D_001Props) => (props.textureUrl = url));
    }
  };

  return (
    <div className="product-3d-settings">
      <label className="block text-sm font-semibold mb-2">Model File (.stl/.obj)</label>
      <input type="file" accept=".stl,.obj" onChange={handleModelChange} />

      <label className="block text-sm font-semibold mt-4 mb-2">MTL File (.mtl)</label>
      <input type="file" accept=".mtl" onChange={handleMtlChange} />

      <label className="block text-sm font-semibold mt-4 mb-2">Texture File (.jpg/.png)</label>
      <input type="file" accept=".jpg,.png" onChange={handleTextureChange} />

      <label className="block text-sm font-semibold mt-4 mb-2">Height</label>
      <input
        type="text"
        value={props.height}
        onChange={(e) => setProp((props: Model_3D_001Props) => (props.height = e.target.value))}
      />

      <label className="block text-sm font-semibold mt-4 mb-2">Background Color</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Model_3D_001Props) => (props.backgroundColor = e.target.value))
        }
      />

      <label className="block text-sm font-semibold mt-4 mb-2">Ambient Light</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={props.ambientLightIntensity}
        onChange={(e) =>
          setProp(
            (props: Model_3D_001Props) =>
              (props.ambientLightIntensity = parseFloat(e.target.value)),
          )
        }
      />

      <label className="block text-sm font-semibold mt-4 mb-2">Directional Light</label>
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={props.directionalLightIntensity}
        onChange={(e) =>
          setProp(
            (props: Model_3D_001Props) =>
              (props.directionalLightIntensity = parseFloat(e.target.value)),
          )
        }
      />
    </div>
  );
};

export const Product3DBlockDefaultProps = {
  modelUrl: '',
  mtlUrl: '',
  textureUrl: '',
  modelType: 'stl',
  height: '500px',
  backgroundColor: '#f0f0f0',
  ambientLightIntensity: 0.5,
  directionalLightIntensity: 1.0,
};

Model_3D_001.craft = {
  props: Product3DBlockDefaultProps,
  related: {
    settings: Product3DBlockSettings,
  },
};
