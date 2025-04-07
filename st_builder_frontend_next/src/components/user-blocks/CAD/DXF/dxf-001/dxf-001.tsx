'use client';
import React, { useEffect, useRef, FC } from 'react';
import { useNode } from '@craftjs/core';
import { DxfViewer, DxfViewerOptions } from 'dxf-viewer';
import { Color } from 'three';
import { api } from '@/lib/api';

import styles from '../../../settings-common/settings-common.module.scss';

export interface DXF_001Props {
  dxfUrl: string;
  backgroundColor: string;
  width: string;
  height: string;
}

export const DXFRenderer: FC<{ url: string; width: string; height: string }> = ({ url, width, height }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<DxfViewer | null>(null);

  useEffect(() => {
    if (!url || !containerRef.current) return;

    const cleanup = () => {
      if (viewerRef.current) {
        viewerRef.current.Destroy();
        viewerRef.current = null;
      }
    };

    const initViewer = async () => {
      try {
        cleanup();

        const options: DxfViewerOptions = {
          clearColor: new Color(0xffffff),
          clearAlpha: 1.0,
          canvasWidth: parseInt(width) || 800,
          canvasHeight: parseInt(height) || 600,
          autoResize: true,
          pointSize: 1,
        };

        viewerRef.current = new DxfViewer(containerRef.current!, options);
        viewerRef.current.GetCamera().isOrthographicCamera = false;
        viewerRef.current.GetCamera().enableZoom = false;
        console.log('Loading DXF from:', url); // Логируем URL
        await viewerRef.current.Load({
          url,
          fonts: ['http://localhost:3000/uploads/T-FLEX Type A.TTF'],
          progressCbk: () => {},
          workerFactory: () => new Worker(new URL('../DxfViewerWorker', import.meta.url)),
        });
      } catch (err) {
        console.error('Error loading DXF:', err);
      }
    };

    initViewer();

    return cleanup;
  }, [url, width, height]);

  return (
    <div
      ref={containerRef}
      style={{ width, height, margin: '0 auto' }}
    />
  );
};

export const DXF_001: FC<DXF_001Props> & {
  craft?: {
    props: typeof DXFBlockDefaultProps;
    related: { settings: typeof DXFBlockSettings };
  };
} = ({ dxfUrl, backgroundColor, width, height }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      style={{
        backgroundColor,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: height,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <DXFRenderer url={dxfUrl} width={width} height={height} />
    </div>
  );
};

const DXFBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props }));

  const handleDxfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setProp((props: DXF_001Props) => {
          props.dxfUrl = uploadedFileUrl;
        });

        console.log('DXF file uploaded successfully, URL:', uploadedFileUrl);
      } catch (error) {
        console.error('Error uploading DXF file:', error);
      }
    }
  };

  return (
    <div className="dxf-settings">
      <label className={styles.settings_label}>DXF File (.dxf)</label>
      <input type="file" accept=".dxf" onChange={handleDxfChange} />
      <label className={styles.settings_label}>DXF URL</label>
      <input
        type="text"
        value={props.dxfUrl}
        onChange={(e) => setProp((props: DXF_001Props) => (props.dxfUrl = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Width</label>
      <input
        type="text"
        value={props.width}
        onChange={(e) => setProp((props: DXF_001Props) => (props.width = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Height</label>
      <input
        type="text"
        value={props.height}
        onChange={(e) => setProp((props: DXF_001Props) => (props.height = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Background Color</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) => setProp((props: DXF_001Props) => (props.backgroundColor = e.target.value))}
      />
    </div>
  );
};

export const DXFBlockDefaultProps = {
  dxfUrl: '',
  backgroundColor: '#ffffff',
  width: '800px',
  height: '600px',
};

DXF_001.craft = {
  props: DXFBlockDefaultProps,
  related: {
    settings: DXFBlockSettings,
  },
};