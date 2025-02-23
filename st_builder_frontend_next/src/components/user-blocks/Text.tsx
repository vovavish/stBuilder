import { useState, useEffect, FC } from 'react';

import ContentEditable from 'react-contenteditable';

import { useNode } from '@craftjs/core';

export interface TextProps {
  text: string;
  fontSize: number;
  textAlign: string;
  paggingY?: number;
  maxWidth?: number;
}

export const Text: FC<TextProps> & { craft?: { props: typeof TextDefaultProps, related: { settings: typeof TextSettings } } } = ({
  text,
  fontSize,
  textAlign,
  paggingY = 0,
  maxWidth = 400,
  ...props
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
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
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        disabled={!editable}
        html={text}
        onChange={(e) =>
          setProp(
            (props: { text: string }) =>
              (props.text = e.target.value),
            500,
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign, padding: `${paggingY}px 0`, maxWidth: `${maxWidth}px`, margin: '0 auto' }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <div className="text-additional-settings">
        <label htmlFor="font-size-slider" className="block text-sm font-semibold mb-2">
          Font size
        </label>
        <input
          id="font-size-slider"
          type="range"
          min="7"
          max="50"
          step="1"
          defaultValue={fontSize}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setProp((props: { fontSize: number }) => (props.fontSize = value));
          }}
        />
        <div className="flex justify-between text-xs mt-2">
          <span>7</span>
          <span>50</span>
        </div>
      </div>
  );
};

export const TextDefaultProps = {
  text: 'HI',
  fontSize: 20,
  textAlign: 'left',
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  }
};
