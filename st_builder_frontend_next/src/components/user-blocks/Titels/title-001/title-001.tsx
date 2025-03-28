
import { useState, useEffect, FC } from 'react';
import ContentEditable from 'react-contenteditable';
import { useNode } from '@craftjs/core';

import styles from '../../settings-common/settings-common.module.scss';

export interface Title_001Props {
  titleText: string;
  contentText: string;
  titleColor: string;
  textColor: string;
  titleSize: number;
  textSize: number;
  backgroundColor: string;
  padding: number;
  textAlign: string;
}

export const Title_001: FC<Title_001Props> & {
  craft?: {
    props: typeof TitleBlockDefaultProps;
    related: { settings: typeof TitleBlockSettings };
  };
} = ({
  titleText,
  contentText,
  titleColor,
  textColor,
  titleSize,
  textSize,
  backgroundColor,
  padding,
  textAlign,
  ...props
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!selected) {
      setEditable(false);
    }
  }, [selected]);

  return (
    <section
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      onClick={() => selected && setEditable(true)}
      style={{
        backgroundColor,
        padding: `${padding}px`,
        textAlign: textAlign as any,
      }}
    >
      <ContentEditable
        disabled={!editable}
        html={titleText}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.titleText = e.target.value), 500)
        }
        tagName="h2"
        style={{
          color: titleColor,
          fontSize: `${titleSize}px`,
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      />
      <ContentEditable
        disabled={!editable}
        html={contentText}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.contentText = e.target.value), 500)
        }
        tagName="p"
        style={{
          color: textColor,
          fontSize: `${textSize}px`,
          lineHeight: 1.6,
        }}
      />
    </section>
  );
};

const TitleBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="title-block-settings">
      <label className={styles.settings_label}>Title Size</label>
      <input
        type="range"
        min="20"
        max="80"
        step="1"
        value={props.titleSize}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.titleSize = parseInt(e.target.value, 10)))
        }
      />

      <label className={styles.settings_label}>Text Size</label>
      <input
        type="range"
        min="12"
        max="40"
        step="1"
        value={props.textSize}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.textSize = parseInt(e.target.value, 10)))
        }
      />

      <label className={styles.settings_label}>Title Color</label>
      <input
        type="color"
        value={props.titleColor}
        onChange={(e) => setProp((props: Title_001Props) => (props.titleColor = e.target.value))}
      />

      <label className={styles.settings_label}>Text Color</label>
      <input
        type="color"
        value={props.textColor}
        onChange={(e) => setProp((props: Title_001Props) => (props.textColor = e.target.value))}
      />

      <label className={styles.settings_label}>Background Color</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.backgroundColor = e.target.value))
        }
      />

      <label className={styles.settings_label}>Padding</label>
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={props.padding}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.padding = parseInt(e.target.value, 10)))
        }
      />

      <label className={styles.settings_label}>Text Align</label>
      <select
        value={props.textAlign}
        onChange={(e) => setProp((props: Title_001Props) => (props.textAlign = e.target.value))}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
  );
};

export const TitleBlockDefaultProps = {
  titleText: 'Your Title Here',
  contentText: 'Your content text goes here. Add some description or information.',
  titleColor: '#000000',
  textColor: '#333333',
  titleSize: 36,
  textSize: 16,
  backgroundColor: 'transparent',
  padding: 20,
  textAlign: 'center',
};

Title_001.craft = {
  props: TitleBlockDefaultProps,
  related: {
    settings: TitleBlockSettings,
  },
};
