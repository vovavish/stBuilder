import { useNode } from '@craftjs/core';
import { FC } from 'react';
import ReactColorPicker from 'react-input-color';

interface ContainerProps {
  background?: string;
  paddingX?: number;
  paddingY?: number;
  children?: React.ReactNode;
}

export const Container: FC<ContainerProps> & {
  craft: { props: typeof ContainerDefaultProps, related: { settings: typeof ContainerSettings } };
} = ({ background, paddingX = 0, paddingY = 0, children }) => {
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
      style={{ margin: '0', background, padding: `${paddingY}px ${paddingX}px` }}
    >
      {children}
    </div>
  );
};

export const ContainerSettings = () => {
  const { background, paddingX, paddingY, actions: { setProp } } = useNode((node) => ({
    background: node.data.props.background,
    paddingX: node.data.props.paddingX,
    paddingY: node.data.props.paddingY,
  }));

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Background</label>
        <ReactColorPicker
          initialValue={background || '#000'}
          onChange={(color) => setProp((props: ContainerProps) => (props.background = color.hex))}
        />
      </div>
       {/* Padding Settings */}
       <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Padding X</label>
        <input
          type="range"
          min="0"
          max="100"
          value={paddingX}
          onChange={(e) => setProp((props: ContainerProps) => props.paddingX = parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-2">
          <span>0</span>
          <span>100</span>
        </div>
        <label className="block text-sm font-semibold mb-2">Padding Y</label>
        <input
          type="range"
          min="0"
          max="100"
          value={paddingY}
          onChange={(e) => setProp((props: ContainerProps) => props.paddingY = parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
        />
        <div className="flex justify-between text-xs mt-2">
          <span>0</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
};

export const ContainerDefaultProps = {
  background: '#ffffff',
  paddingX: 0,
  paddingY: 3,
};

Container.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
