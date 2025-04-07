import { useState, useEffect, FC } from 'react';
import ContentEditable from 'react-contenteditable';
import { useNode } from '@craftjs/core';
import styles from '../../settings-common/settings-common.module.scss';

export interface Text_001Props {
  text: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  maxWidth: string;
  color: string;
  fontWeight: number;
  lineHeight: number;
  textDecoration: 'none' | 'underline' | 'overline' | 'line-through';
  fontStyle: 'normal' | 'italic';
  backgroundColor: string;
  borderRadius: number;
  borderWidth: number;
  borderColor: string;
  borderStyle: 'none' | 'solid' | 'dashed' | 'dotted' | 'double';
}

export const Text_001: FC<Text_001Props> & { 
  craft?: { 
    props: typeof Text_001DefaultProps, 
    related: { settings: typeof Text_001Settings } 
  } 
} = ({
  text,
  fontSize,
  textAlign,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  maxWidth,
  color,
  fontWeight,
  lineHeight,
  textDecoration,
  fontStyle,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  borderStyle,
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
      ref={(ref) => {if (ref) { connect(drag(ref)) }}}
      onClick={() => selected && setEditable(true)}
      style={{
        padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
        margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
        maxWidth: '100%'
      }}
    >
      <ContentEditable
        disabled={!editable}
        html={text}
        onChange={(e) => {
          setProp(
            (props: { text: string }) =>
              (props.text = e.target.value),
            500,
          )
        }}
        tagName="p"
        style={{ 
          fontSize: `${fontSize}px`, 
          textAlign, 
          maxWidth, 
          color,
          fontWeight,
          lineHeight: `${lineHeight}`,
          textDecoration,
          fontStyle,
          margin: '0 auto'
        }}
      />
    </div>
  );
};

const Text_001Settings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as Text_001Props,
  }));


  return (
    <div className="text-settings">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={styles.settings_label}>Font Size (px)</label>
          <input
            type="number"
            min="7"
            max="72"
            value={props.fontSize}
            onChange={(e) => setProp((props: Text_001Props) => (props.fontSize = parseInt(e.target.value)))}
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Font Weight</label>
          <input
            type="number"
            min="100"
            max="900"
            step="100"
            value={props.fontWeight}
            onChange={(e) => setProp((props: Text_001Props) => (props.fontWeight = parseInt(e.target.value)))}
            className="w-full p-1 border rounded"
          />
        </div>
      </div>

      <label className={styles.settings_label}>Text Align</label>
      <select
        value={props.textAlign}
        onChange={(e) => setProp((props: Text_001Props) => (props.textAlign = e.target.value as any))}
        className="w-full p-1 border rounded mb-3"
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
        <option value="justify">Justify</option>
        <option value="inherit">Inherit</option>
      </select>

      <label className={styles.settings_label}>Text Color</label>
      <input
        type="color"
        value={props.color}
        onChange={(e) => setProp((props: Text_001Props) => (props.color = e.target.value))}
        className="w-full p-1 border rounded mb-3"
      />

      <label className={styles.settings_label}>Background Color</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) => setProp((props: Text_001Props) => (props.backgroundColor = e.target.value))}
        className="w-full p-1 border rounded mb-3"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={styles.settings_label}>Line Height</label>
          <input
            type="number"
            min="0.8"
            max="3"
            step="0.1"
            value={props.lineHeight}
            onChange={(e) => setProp((props: Text_001Props) => (props.lineHeight = parseFloat(e.target.value)))}
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Max Width</label>
          <input
            type="text"
            value={props.maxWidth}
            onChange={(e) => setProp((props: Text_001Props) => (props.maxWidth = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 100% or 500px"
          />
        </div>
      </div>

      <label className={styles.settings_label}>Text Decoration</label>
      <select
        value={props.textDecoration}
        onChange={(e) => setProp((props: Text_001Props) => (props.textDecoration = e.target.value as any))}
        className="w-full p-1 border rounded mb-3"
      >
        <option value="none">None</option>
        <option value="underline">Underline</option>
        <option value="overline">Overline</option>
        <option value="line-through">Line Through</option>
      </select>

      <label className="block text-sm font-semibold mb-2">
        <input
          type="checkbox"
          checked={props.fontStyle === 'italic'}
          onChange={(e) => setProp((props: Text_001Props) => (props.fontStyle = e.target.checked ? 'italic' : 'normal'))}
          className="mr-2"
        />
        Italic
      </label>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className={styles.settings_label}>Padding Top</label>
          <input
            type="text"
            value={props.paddingTop}
            onChange={(e) => setProp((props: Text_001Props) => (props.paddingTop = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Padding Bottom</label>
          <input
            type="text"
            value={props.paddingBottom}
            onChange={(e) => setProp((props: Text_001Props) => (props.paddingBottom = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Padding Left</label>
          <input
            type="text"
            value={props.paddingLeft}
            onChange={(e) => setProp((props: Text_001Props) => (props.paddingLeft = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Padding Right</label>
          <input
            type="text"
            value={props.paddingRight}
            onChange={(e) => setProp((props: Text_001Props) => (props.paddingRight = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className={styles.settings_label}>Margin Top</label>
          <input
            type="text"
            value={props.marginTop}
            onChange={(e) => setProp((props: Text_001Props) => (props.marginTop = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Margin Bottom</label>
          <input
            type="text"
            value={props.marginBottom}
            onChange={(e) => setProp((props: Text_001Props) => (props.marginBottom = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Margin Left</label>
          <input
            type="text"
            value={props.marginLeft}
            onChange={(e) => setProp((props: Text_001Props) => (props.marginLeft = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Margin Right</label>
          <input
            type="text"
            value={props.marginRight}
            onChange={(e) => setProp((props: Text_001Props) => (props.marginRight = e.target.value))}
            className="w-full p-1 border rounded"
            placeholder="e.g. 10px or 1rem"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className={styles.settings_label}>Border Radius (px)</label>
          <input
            type="number"
            min="0"
            max="50"
            value={props.borderRadius}
            onChange={(e) => setProp((props: Text_001Props) => (props.borderRadius = parseInt(e.target.value)))}
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Border Width (px)</label>
          <input
            type="number"
            min="0"
            max="20"
            value={props.borderWidth}
            onChange={(e) => setProp((props: Text_001Props) => (props.borderWidth = parseInt(e.target.value)))}
            className="w-full p-1 border rounded"
          />
        </div>
      </div>

      <label className={styles.settings_label}>Border Color</label>
      <input
        type="color"
        value={props.borderColor}
        onChange={(e) => setProp((props: Text_001Props) => (props.borderColor = e.target.value))}
        className="w-full p-1 border rounded mb-3"
      />

      <label className={styles.settings_label}>Border Style</label>
      <select
        value={props.borderStyle}
        onChange={(e) => setProp((props: Text_001Props) => (props.borderStyle = e.target.value as any))}
        className="w-full p-1 border rounded mb-3"
      >
        <option value="none">None</option>
        <option value="solid">Solid</option>
        <option value="dashed">Dashed</option>
        <option value="dotted">Dotted</option>
        <option value="double">Double</option>
      </select>
    </div>
  );
};

export const Text_001DefaultProps = {
  text: 'Edit this text',
  fontSize: 16,
  textAlign: 'center' as const,
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  paddingRight: '0',
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
  maxWidth: '100%',
  color: '#000000',
  fontWeight: 400,
  lineHeight: 1.5,
  textDecoration: 'none' as const,
  fontStyle: 'normal' as const,
  backgroundColor: 'transparent',
  borderRadius: 0,
  borderWidth: 0,
  borderColor: '#000000',
  borderStyle: 'none' as const,
};

Text_001.craft = {
  props: Text_001DefaultProps,
  related: {
    settings: Text_001Settings,
  }
};