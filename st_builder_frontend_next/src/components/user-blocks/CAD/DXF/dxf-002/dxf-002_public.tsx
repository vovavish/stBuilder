import React, { FC } from 'react';
import { DXFRenderer, DXF_001Props } from '../dxf-001/dxf-001';


export interface DXF_002Props extends DXF_001Props {
  text: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  maxWidth: number;
}

export const DXF_002_public: FC<DXF_002Props> = ({ dxfUrl, backgroundColor, width, height, text, fontSize, textAlign, maxWidth }) => {

  return (
    <div
      style={{
        backgroundColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: height,
        overflow: 'hidden',
        gap: '20px', // Уменьшенное расстояние между элементами
      }}
    >
      <div
        style={{
          padding: '10px', // Уменьшенный padding
        }}
      >
        <p
          style={{ fontSize: `${fontSize}px`, textAlign, margin: '0 auto' }}
        >
          {text || 'Default Text'}
        </p>
      </div>
      <div style={{ flex: '0 1 auto' }}> {/* Центрирование по горизонтали */}
        <DXFRenderer url={dxfUrl} width={width} height={height} />
      </div>
    </div>
  );
};
