import { useState, useEffect, FC } from 'react';
import ContentEditable from 'react-contenteditable';
import { useNode } from '@craftjs/core';

export interface Header_001Props {
  text_company_name: string;
  text_company_slogan: string;
  text_company_additional: string;
  textColor: string;
  textSize: number;
  backgroundColor: string;
}

export const Header_001: FC<Header_001Props> & { craft?: { props: typeof HeaderDefaultProps, related: { settings: typeof HeaderSettings } } } = ({
  text_company_name,
  text_company_slogan,
  text_company_additional,
  textColor,
  textSize,
  backgroundColor,
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
    <header
      {...props}
      ref={(ref) => ref && connect(drag(ref))}
      onClick={() => selected && setEditable(true)}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        color: textColor,
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <ContentEditable
        disabled={!editable}
        html={text_company_name}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.text_company_name = e.target.value), 500)
        }
        tagName="h1"
        style={{ fontSize: `${textSize}px`, fontWeight: 'bold' }}
      />
      <ContentEditable
        disabled={!editable}
        html={text_company_slogan}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.text_company_slogan = e.target.value), 500)
        }
        tagName="h2"
        style={{ fontSize: `${textSize}px`, fontWeight: 'bold' }}
      />
      <ContentEditable
        disabled={!editable}
        html={text_company_additional}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.text_company_additional = e.target.value), 500)
        }
        tagName="p"
        style={{ fontSize: `${textSize}px`}}
      />
    </header>
  );
};

const HeaderSettings = () => {
  const {
    actions: { setProp },
    textSize,
    backgroundColor,
    textColor,
  } = useNode((node) => ({
    textSize: node.data.props.textSize,
    backgroundColor: node.data.props.backgroundColor,
    textColor: node.data.props.textColor,
  }));

  return (
    <div className="header-settings">
      <label className="block text-sm font-semibold mb-2">Text Size</label>
      <input
        type="range"
        min="20"
        max="100"
        step="1"
        defaultValue={textSize}
        onChange={(e) => setProp((props: { textSize: number }) => (props.textSize = parseInt(e.target.value, 10)))}
      />

      <label className="block text-sm font-semibold mt-4 mb-2">Background Color</label>
      <input
        type="color"
        defaultValue={backgroundColor}
        onChange={(e) => setProp((props: { backgroundColor: string }) => (props.backgroundColor = e.target.value))}
      />

      <label className="block text-sm font-semibold mt-4 mb-2">Text Color</label>
      <input
        type="color"
        defaultValue={textColor}
        onChange={(e) => setProp((props: { textColor: string }) => (props.textColor = e.target.value))}
      />
    </div>
  );
};

export const HeaderDefaultProps = {
  text: 'Welcome!',
  backgroundColor: '#282c34',
  textColor: '#ffffff',
  textSize: 40,
};

Header_001.craft = {
  props: HeaderDefaultProps,
  related: {
    settings: HeaderSettings,
  },
};
