'use client';
import React, { useEffect, useRef, FC } from 'react';
import { DxfViewer, DxfViewerOptions } from 'dxf-viewer';
import { Color } from 'three';

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

export const DXF_001_public: FC<DXF_001Props> = ({ dxfUrl, backgroundColor, width, height }) => {
  return (
    <div
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

