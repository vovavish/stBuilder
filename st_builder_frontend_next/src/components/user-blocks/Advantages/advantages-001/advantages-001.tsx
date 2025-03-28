
import { useState, useEffect, FC } from 'react';
import ContentEditable from 'react-contenteditable';
import { useNode } from '@craftjs/core';

import styles from '../../settings-common/settings-common.module.scss';

export interface Advantages_001Props {
  title: string;
  description: string;
  advantages: string[];
  titleColor: string;
  textColor: string;
  titleSize: number;
  textSize: number;
  backgroundColor: string;
  padding: number;
  listStyle: string;
}

export const Advantages_001: FC<Advantages_001Props> & { craft?: { props: typeof AdvantagesBlockDefaultProps, related: { settings: typeof AdvantagesBlockSettings } } } = ({
  title,
  description,
  advantages,
  titleColor,
  textColor,
  titleSize,
  textSize,
  backgroundColor,
  padding,
  listStyle,
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
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <ContentEditable
          disabled={!editable}
          html={title}
          onChange={(e) =>
            setProp((props: Advantages_001Props) => (props.title = e.target.value), 500)
          }
          tagName="h2"
          style={{
            color: titleColor,
            fontSize: `${titleSize}px`,
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        />
        <ContentEditable
          disabled={!editable}
          html={description}
          onChange={(e) =>
            setProp((props: Advantages_001Props) => (props.description = e.target.value), 500)
          }
          tagName="p"
          style={{
            color: textColor,
            fontSize: `${textSize}px`,
            lineHeight: 1.6,
            marginBottom: '30px',
            textAlign: 'center',
          }}
        />
        <div style={{
    display: 'flex',
    justifyContent: 'center',
  }}>
          <ul
            style={{
              color: textColor,
              fontSize: `${textSize}px`,
              listStyleType: listStyle,
              paddingLeft: listStyle === 'none' ? '0' : '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              gap: '20px',
            }}
          >
            {advantages.map((advantage, index) => (
              <li key={index}>
                <ContentEditable
                  disabled={!editable}
                  html={advantage}
                  onChange={(e) => {
                    const newAdvantages = [...advantages];
                    newAdvantages[index] = e.target.value;
                    setProp((props: Advantages_001Props) => (props.advantages = newAdvantages), 500);
                  }}
                  tagName="span"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const AdvantagesBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="advantages-block-settings">
      <label className={styles.settings_label}>Title Size</label>
      <input
        type="range"
        min="20"
        max="80"
        step="1"
        value={props.titleSize}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.titleSize = parseInt(e.target.value, 10)))}
      />

      <label className={styles.settings_label}>Text Size</label>
      <input
        type="range"
        min="12"
        max="40"
        step="1"
        value={props.textSize}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.textSize = parseInt(e.target.value, 10)))}
      />

      <label className={styles.settings_label}>Title Color</label>
      <input
        type="color"
        value={props.titleColor}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.titleColor = e.target.value))}
      />

      <label className={styles.settings_label}>Text Color</label>
      <input
        type="color"
        value={props.textColor}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.textColor = e.target.value))}
      />

      <label className={styles.settings_label}>Background Color</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.backgroundColor = e.target.value))}
      />

      <label className={styles.settings_label}>Padding</label>
      <input
        type="range"
        min="0"
        max="100"
        step="5"
        value={props.padding}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.padding = parseInt(e.target.value, 10)))}
      />

      <label className={styles.settings_label}>List Style</label>
      <select
        value={props.listStyle}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.listStyle = e.target.value))}
      >
        <option value="disc">Disc</option>
        <option value="circle">Circle</option>
        <option value="square">Square</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};

export const AdvantagesBlockDefaultProps = {
  title: 'Преимущества',
  description: 'Узнайте, почему стоит выбрать именно нас',
  advantages: [
    'Высокое качество услуг',
    'Профессиональная команда',
    'Индивидуальный подход',
  ],
  titleColor: '#000000',
  textColor: '#333333',
  titleSize: 36,
  textSize: 16,
  backgroundColor: '#f8f8f8',
  padding: 40,
  listStyle: 'disc',
};

Advantages_001.craft = {
  props: AdvantagesBlockDefaultProps,
  related: {
    settings: AdvantagesBlockSettings,
  },
};