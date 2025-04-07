'use client';
import React, { useState, useRef, useEffect, FC } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useNode } from '@craftjs/core';
import { STLLoader } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import { MTLLoader } from 'three/examples/jsm/Addons.js';
import { api, API_URL } from '@/lib/api';
import * as THREE from 'three';

import styles from '../../settings-common/settings-common.module.scss'

export interface Model_3D_001Props {
  modelUrl: string;
  mtlUrl: string;
  textureUrl: string;
  modelType: 'stl' | 'obj';
  height: string;
  backgroundColor: string;
  ambientLightIntensity: number;
  directionalLightIntensity: number;
  cameraX: number;
  cameraY: number;
  cameraZ: number;
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
  cameraX,
  cameraY,
  cameraZ,
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
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  );
};

const Product3DBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  const handleModelChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFileUrl = `${API_URL}/${response.data.filePath}`;

        setProp((props: Model_3D_001Props) => {
          props.modelUrl = uploadedFileUrl;
          props.modelType = file.name.endsWith('.stl') ? 'stl' : 'obj';
        });

        console.log('File uploaded successfully, URL:', uploadedFileUrl);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleMtlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFileUrl = response.data.filePath;

        setProp((props: Model_3D_001Props) => (props.mtlUrl = uploadedFileUrl));
      } catch (error) {
        console.error('Error uploading MTL file:', error);
      }
    }
  };

  const handleTextureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFileUrl = response.data.filePath;

        setProp((props: Model_3D_001Props) => (props.textureUrl = uploadedFileUrl));
      } catch (error) {
        console.error('Error uploading texture file:', error);
      }
    }
  };

  return (
    <div className="product-3d-settings">
      <label className={styles.settings_label}>Model File (.stl/.obj)</label>
      <input type="file" accept=".stl,.obj" onChange={handleModelChange} />
      <label className={styles.settings_label}>Model URL</label>
      <input
        type="text"
        value={props.modelUrl}
        onChange={(e) => setProp((props: Model_3D_001Props) => (props.modelUrl = e.target.value))}
        className="w-full p-1 border rounded"
      />

      <label className={styles.settings_label}>MTL File (.mtl)</label>
      <input type="file" accept=".mtl" onChange={handleMtlChange} />
      <label className="block text-sm font-semibold mt-2 mb-1">MTL URL</label>
      <input
        type="text"
        value={props.mtlUrl}
        onChange={(e) => setProp((props: Model_3D_001Props) => (props.mtlUrl = e.target.value))}
        className="w-full p-1 border rounded"
      />

      <label className={styles.settings_label}>Texture File (.jpg/.png)</label>
      <input type="file" accept=".jpg,.png" onChange={handleTextureChange} />
      <label className="block text-sm font-semibold mt-2 mb-1">Texture URL</label>
      <input
        type="text"
        value={props.textureUrl}
        onChange={(e) => setProp((props: Model_3D_001Props) => (props.textureUrl = e.target.value))}
        className="w-full p-1 border rounded"
      />

      <label className={styles.settings_label}>Height</label>
      <input
        type="text"
        value={props.height}
        onChange={(e) => setProp((props: Model_3D_001Props) => (props.height = e.target.value))}
        className="w-full p-1 border rounded"
      />

      <label className={styles.settings_label}>Background Color</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Model_3D_001Props) => (props.backgroundColor = e.target.value))
        }
      />

      <label className={styles.settings_label}>Ambient Light</label>
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

      <label className={styles.settings_label}>Directional Light</label>
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
      <label className={styles.settings_label}>Camera Position</label>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-sm">X</label>
          <input
            type="number"
            step="0.1"
            value={props.cameraX}
            onChange={(e) =>
              setProp((props: Model_3D_001Props) => (props.cameraX = parseFloat(e.target.value)))
            }
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Y</label>
          <input
            type="number"
            step="0.1"
            value={props.cameraY}
            onChange={(e) =>
              setProp((props: Model_3D_001Props) => (props.cameraY = parseFloat(e.target.value)))
            }
            className="w-full p-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Z</label>
          <input
            type="number"
            step="0.1"
            value={props.cameraZ}
            onChange={(e) =>
              setProp((props: Model_3D_001Props) => (props.cameraZ = parseFloat(e.target.value)))
            }
            className="w-full p-1 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export const Product3DBlockDefaultProps = {
  modelUrl: '',
  mtlUrl: '',
  textureUrl: '',
  modelType: 'stl' as const,
  height: '500px',
  backgroundColor: '#f0f0f0',
  ambientLightIntensity: 0.5,
  directionalLightIntensity: 1.0,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 5,
};

Model_3D_001.craft = {
  props: Product3DBlockDefaultProps,
  related: {
    settings: Product3DBlockSettings,
  },
};
