'use client';
import React, { FC } from 'react';
import { DXFRenderer } from '../dxf-001/dxf-001';
import { DXF_001Props } from '../dxf-001/dxf-001';

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

