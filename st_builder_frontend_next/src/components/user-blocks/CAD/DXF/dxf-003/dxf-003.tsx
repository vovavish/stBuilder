'use client';
import React, { FC, useState, useEffect } from 'react';
import { useNode } from '@craftjs/core';
import { DXFRenderer, DXF_001Props } from '../dxf-001/dxf-001';
import ContentEditable from 'react-contenteditable';
import { api } from '@/lib/api';

export interface DXF_003Props extends DXF_001Props {
  text: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  maxWidth: number;
}

export const DXF_003: FC<DXF_003Props> & {
  craft?: {
    props: typeof DXF_003DefaultProps;
    related: { settings: typeof DXF_003Settings };
  };
} = ({ dxfUrl, backgroundColor, width, height, text, fontSize, textAlign, maxWidth }) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: height,
        overflow: 'hidden',
        gap: '20px', // Уменьшенное расстояние между элементами
      }}
    >
      <div style={{ flex: '0 1 auto' }}> {/* Центрирование по горизонтали */}
        <DXFRenderer url={dxfUrl} width={width} height={height} />
      </div>
      <div
        style={{
          padding: '10px', // Уменьшенный padding
        }}
        onClick={() => selected && setEditable(true)}
      >
        <ContentEditable
          disabled={!editable}
          html={text}
          onChange={(e) => setProp((props: { text: string }) => (props.text = e.target.value), 500)}
          tagName="p"
          style={{ fontSize: `${fontSize}px`, textAlign, margin: '0 auto' }}
        />
      </div>
    </div>
  );
};

const DXF_003Settings = () => {
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
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const uploadedFileUrl = response.data.filePath;
        setProp((props: DXF_003Props) => (props.dxfUrl = uploadedFileUrl));
        console.log('DXF file uploaded successfully, URL:', uploadedFileUrl);
      } catch (error) {
        console.error('Error uploading DXF file:', error);
      }
    }
  };

  return (
    <div className="dxf-002-settings">
      <label className="block text-sm font-semibold mb-2">Font Size</label>
      <input
        type="range"
        min="7"
        max="50"
        value={props.fontSize}
        onChange={(e) =>
          setProp((props: DXF_003Props) => (props.fontSize = parseInt(e.target.value)))
        }
        className="w-full"
      />
      <label className="block text-sm font-semibold mb-2">Text Align</label>
      <select
        value={props.textAlign}
        onChange={(e) =>
          setProp((props: DXF_003Props) => (props.textAlign = e.target.value as any))
        }
        className="w-full p-1 border rounded"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
      <label className="block text-sm font-semibold mb-2">Max Width (px)</label>
      <input
        type="number"
        value={props.maxWidth}
        onChange={(e) =>
          setProp((props: DXF_003Props) => (props.maxWidth = parseInt(e.target.value)))
        }
        className="w-full p-1 border rounded"
      />
      <label className="block text-sm font-semibold mb-2">DXF File (.dxf)</label>
      <input type="file" accept=".dxf" onChange={handleDxfChange} />
      <label className="block text-sm font-semibold mb-2">DXF URL</label>
      <input
        type="text"
        value={props.dxfUrl}
        onChange={(e) => setProp((props: DXF_003Props) => (props.dxfUrl = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className="block text-sm font-semibold mb-2">Width</label>
      <input
        type="text"
        value={props.width}
        onChange={(e) => setProp((props: DXF_003Props) => (props.width = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className="block text-sm font-semibold mb-2">Height</label>
      <input
        type="text"
        value={props.width}
        onChange={(e) => setProp((props: DXF_003Props) => (props.height = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className="block text-sm font-semibold mb-2">Background Color</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) => setProp((props: DXF_003Props) => (props.backgroundColor = e.target.value))}
      />
    </div>
  );
};

export const DXF_003DefaultProps = {
  dxfUrl: '',
  backgroundColor: '#ffffff',
  width: '400px',
  height: '600px',
  text: 'Description here',
  fontSize: 20,
  textAlign: 'left',
  maxWidth: 400,
};

DXF_003.craft = {
  props: DXF_003DefaultProps,
  related: { settings: DXF_003Settings },
};
