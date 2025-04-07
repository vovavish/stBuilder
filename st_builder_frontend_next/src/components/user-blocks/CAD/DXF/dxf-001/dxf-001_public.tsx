'use client';
import React, { useEffect, useRef, FC } from 'react';
import { DxfViewer, DxfViewerOptions } from 'dxf-viewer';
import { Color } from 'three';
import { DXFRenderer } from '../dxf-001/dxf-001';

export interface DXF_001Props {
  dxfUrl: string;
  backgroundColor: string;
  width: string;
  height: string;
}

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

