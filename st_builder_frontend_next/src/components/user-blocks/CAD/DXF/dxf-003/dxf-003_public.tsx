import React, { FC } from 'react';
import { DXFRenderer, DXF_001Props } from '../dxf-001/dxf-001';

export interface DXF_003Props extends DXF_001Props {
  text: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  maxWidth: number;
}

export const DXF_003_public: FC<DXF_003Props> = ({
  dxfUrl,
  backgroundColor,
  width,
  height,
  text,
  fontSize,
  textAlign,
  maxWidth,
}) => {
  const parseText = (html: string) => {
    return html
      .replace(/<\/div><div>/g, '\n')
      .replace(/<div>/g, '')
      .replace(/<\/div>/g, '')
      .split('\n');
  };

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
        gap: '20px',
      }}
    >
      <div style={{ flex: '0 1 auto' }}>
        <DXFRenderer url={dxfUrl} width={width} height={height} />
      </div>
      <div style={{ padding: '10px', maxWidth }}>
        {parseText(text || 'Default Text').map((line, index) => (
          <p
            key={`text-line-${index}`}
            style={{
              fontSize: `${fontSize}px`,
              textAlign,
              margin: 0,
              marginBottom: '10px',
              wordWrap: 'break-word',
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};
