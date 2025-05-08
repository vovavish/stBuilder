"use client";
import React, { useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import { api, API_URL } from '@/lib/api';

import styles from '../../settings-common/settings-common.module.scss';
import Image from 'next/image';

export interface Gallery_001Props {
  image: string;
  imageRatio: string;
  borderRadius: number;
  showCaption: boolean;
  caption: string;
  width: string;
  height: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

export const GalleryImage: React.FC<{
  src: string;
  alt?: string;
  ratio: string;
  borderRadius: number;
  caption?: string;
  showCaption: boolean;
  width: string;
  height: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}> = ({ 
  src, 
  alt = '', 
  ratio, 
  borderRadius, 
  caption, 
  showCaption,
  width,
  height,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight
}) => {
  const [aspectRatio, setAspectRatio] = useState('1 / 1');

  useEffect(() => {
    switch (ratio) {
      case '1:1':
        setAspectRatio('1 / 1');
        break;
      case '4:3':
        setAspectRatio('4 / 3');
        break;
      case '16:9':
        setAspectRatio('16 / 9');
        break;
      case '3:2':
        setAspectRatio('3 / 2');
        break;
      default:
        setAspectRatio('1 / 1');
    }
  }, [ratio]);

  return (
    <div className="gallery-item" style={{ 
      position: 'relative', 
      borderRadius: `${borderRadius}px`, 
      overflow: 'hidden',
      width: width || '100%',
      height: height || 'auto',
      maxWidth: '100%',
      margin: '0 auto',
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight
    }}>
      <div style={{ 
        aspectRatio, 
        position: 'relative', 
        width: '100%',
        height: '100%'
      }}>
        <Image
          src={`${API_URL}/${src}`}
          alt={alt}
          fill
          style={{ 
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>
      {showCaption && caption && (
        <div className="image-caption" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          padding: '8px',
          textAlign: 'center'
        }}>
          {caption}
        </div>
      )}
    </div>
  );
};

export const Gallery_001: React.FC<Gallery_001Props> & {
  craft?: {
    props: typeof GalleryBlockDefaultProps;
    related: { settings: typeof GalleryBlockSettings };
  };
} = ({ 
  image, 
  imageRatio, 
  borderRadius, 
  showCaption, 
  caption,
  width,
  height,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{
        width: '100%',
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        {image ? (
          <GalleryImage
            src={image}
            ratio={imageRatio}
            borderRadius={borderRadius}
            caption={caption}
            showCaption={showCaption}
            width={width}
            height={height}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
          />
        ) : (
          <div style={{
            border: '2px dashed #ccc',
            padding: '40px',
            textAlign: 'center',
            borderRadius: '8px'
          }}>
            <p>Загрузите изображение</p>
          </div>
        )}
      </div>
    </div>
  );
};

const GalleryBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as Gallery_001Props,
  }));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setProp((props: Gallery_001Props) => {
        props.image = response.data.filePath;
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const removeImage = () => {
    setProp((props: Gallery_001Props) => {
      props.image = '';
    });
  };

  return (
    <div className="gallery-settings">
      <label className={styles.settings_label}>Upload Image</label>
      {props.image ? (
        <div className="mb-4">
          <div style={{ 
        position: 'relative', 
        width: '100%',
        height: '100px'
      }}>
            <Image
              src={`${API_URL}/${props.image}`}
              alt="Preview"
              fill
              style={{ 
                objectFit: 'contain'
              }}
            />
          </div>
          <button
            onClick={removeImage}
            className="w-full py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          className="w-full"
        />
      )}

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className={styles.settings_label}>Width</label>
          <input
            type="text"
            value={props.width}
            onChange={(e) => setProp((props: Gallery_001Props) => (props.width = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 100% or 300px"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Height</label>
          <input
            type="text"
            value={props.height}
            onChange={(e) => setProp((props: Gallery_001Props) => (props.height = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. auto or 200px"
          />
        </div>
      </div>

      <label className="block text-sm font-semibold mt-4 mb-2">Image Ratio</label>
      <select
        value={props.imageRatio}
        onChange={(e) => setProp((props: Gallery_001Props) => (props.imageRatio = e.target.value))}
        className="w-full p-1 border rounded"
      >
        <option value="1:1">1:1 (Square)</option>
        <option value="4:3">4:3 (Standard)</option>
        <option value="16:9">16:9 (Widescreen)</option>
        <option value="3:2">3:2 (Classic)</option>
      </select>

      <label className="block text-sm font-semibold mt-4 mb-2">Border Radius (px)</label>
      <input
        type="number"
        min="0"
        max="50"
        value={props.borderRadius}
        onChange={(e) => setProp((props: Gallery_001Props) => (props.borderRadius = parseInt(e.target.value)))}
        className="w-full p-1 border rounded"
      />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className={styles.settings_label}>Padding Top</label>
          <input
            type="text"
            value={props.paddingTop}
            onChange={(e) => setProp((props: Gallery_001Props) => (props.paddingTop = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Padding Bottom</label>
          <input
            type="text"
            value={props.paddingBottom}
            onChange={(e) => setProp((props: Gallery_001Props) => (props.paddingBottom = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Padding Left</label>
          <input
            type="text"
            value={props.paddingLeft}
            onChange={(e) => setProp((props: Gallery_001Props) => (props.paddingLeft = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Padding Right</label>
          <input
            type="text"
            value={props.paddingRight}
            onChange={(e) => setProp((props: Gallery_001Props) => (props.paddingRight = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
      </div>

      <label className="block text-sm font-semibold mt-4 mb-2">
        <input
          type="checkbox"
          checked={props.showCaption}
          onChange={(e) => setProp((props: Gallery_001Props) => (props.showCaption = e.target.checked))}
          className="mr-2"
        />
        Show Caption
      </label>

      {props.showCaption && (
        <div className="mt-2">
          <label className={styles.settings_label}>Caption</label>
          <input
            type="text"
            value={props.caption || ''}
            onChange={(e) => setProp((props: Gallery_001Props) => (props.caption = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="Enter caption"
          />
        </div>
      )}
    </div>
  );
};

export const GalleryBlockDefaultProps = {
  image: '',
  imageRatio: '1:1',
  borderRadius: 8,
  showCaption: false,
  caption: '',
  width: '100%',
  height: 'auto',
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  paddingRight: '0',
};

Gallery_001.craft = {
  props: GalleryBlockDefaultProps,
  related: {
    settings: GalleryBlockSettings,
  },
};