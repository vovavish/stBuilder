import { useState, useEffect, FC } from 'react';
import ContentEditable from 'react-contenteditable';
import { useNode } from '@craftjs/core';

import styles from '../../settings-common/settings-common.module.scss';

export interface Header_001Props {
  text_company_name: string;
  text_company_slogan: string;
  text_company_additional: string;
  textColor: string;
  textSize: number;
  topTextMarginBottom: number;
  bottomTextMarginTop: number;
  backgroundColor: string;
  backgroundImage: string;
  backgroundOpacity: number;
  backgroundPosition: string;
  overlayColor: string;
  overlayOpacity: number;
}

export const Header_001: FC<Header_001Props> & {
  craft?: { props: typeof HeaderDefaultProps; related: { settings: typeof HeaderSettings } };
} = ({
  text_company_name,
  text_company_slogan,
  text_company_additional,
  textColor,
  textSize,
  topTextMarginBottom,
  bottomTextMarginTop,
  backgroundColor,
  backgroundImage,
  backgroundOpacity,
  backgroundPosition,
  overlayColor,
  overlayOpacity,
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
    <header
      {...props}
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      onClick={() => selected && setEditable(true)}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition,
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        color: textColor,
        textAlign: 'center',
        padding: '20px',
        position: 'relative',
        opacity: backgroundOpacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ContentEditable
          disabled={!editable}
          html={text_company_name}
          onChange={(e) =>
            setProp((props: Header_001Props) => (props.text_company_name = e.target.value), 500)
          }
          tagName="h1"
          style={{ fontSize: `${textSize}px`, fontWeight: 'bold', marginBottom: `${topTextMarginBottom}px` }}
        />
        <ContentEditable
          disabled={!editable}
          html={text_company_slogan}
          onChange={(e) =>
            setProp((props: Header_001Props) => (props.text_company_slogan = e.target.value), 500)
          }
          tagName="h2"
          style={{ fontSize: `${textSize * 0.75}px`, fontWeight: 'bold' }}
        />
        <ContentEditable
          disabled={!editable}
          html={text_company_additional}
          onChange={(e) =>
            setProp(
              (props: Header_001Props) => (props.text_company_additional = e.target.value),
              500,
            )
          }
          tagName="p"
          style={{ fontSize: `${textSize * 0.5}px`, marginTop: `${bottomTextMarginTop}px` }}
        />
      </div>
    </header>
  );
};

const HeaderSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }));

  return (
    <div className="header-settings">
      <label className={styles.settings_label}>Размер текста</label>
      <input
        type="range"
        min="20"
        max="100"
        step="1"
        value={props.textSize}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.textSize = parseInt(e.target.value, 10)))
        }
      />

      <label className={styles.settings_label}>Нижний отступ верхнего текста</label>
      <input
        type="range"
        min="0"
        max="300"
        step="1"
        value={props.topTextMarginBottom}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.topTextMarginBottom = parseInt(e.target.value, 10)))
        }
      />
      
      <label className={styles.settings_label}>Вехрний отступ нижнего текста</label>
      <input
        type="range"
        min="0"
        max="300"
        step="1"
        value={props.bottomTextMarginTop}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.bottomTextMarginTop = parseInt(e.target.value, 10)))
        }
      />

      <label className={styles.settings_label}>Цвет фона</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.backgroundColor = e.target.value))
        }
      />

      <label className={styles.settings_label}>Цвет текста</label>
      <input
        type="color"
        value={props.textColor}
        onChange={(e) => setProp((props: Header_001Props) => (props.textColor = e.target.value))}
      />

      <label className={styles.settings_label}>Фоновое изображение (URL)</label>
      <input
        type="text"
        value={props.backgroundImage}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.backgroundImage = e.target.value))
        }
        placeholder="Enter image URL"
      />

      <label className={styles.settings_label}>Прозрачность фона</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={props.backgroundOpacity}
        onChange={(e) =>
          setProp(
            (props: Header_001Props) => (props.backgroundOpacity = parseFloat(e.target.value)),
          )
        }
      />

      <label className={styles.settings_label}>Позация фонового изобржаения</label>
      <select
        value={props.backgroundPosition}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.backgroundPosition = e.target.value))
        }
      >
        <option value="center">Центр</option>
        <option value="top">Верх</option>
        <option value="bottom">Низ</option>
        <option value="left">Лево</option>
        <option value="right">Право</option>
      </select>

      <label className={styles.settings_label}>Цвет переднего фона</label>
      <input
        type="color"
        value={props.overlayColor}
        onChange={(e) => setProp((props: Header_001Props) => (props.overlayColor = e.target.value))}
      />

      <label className={styles.settings_label}>Прозрачность переднего плана</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={props.overlayOpacity}
        onChange={(e) =>
          setProp((props: Header_001Props) => (props.overlayOpacity = parseFloat(e.target.value)))
        }
      />
    </div>
  );
};

export const HeaderDefaultProps = {
  text_company_name: 'Company Name',
  text_company_slogan: 'Your Slogan Here',
  text_company_additional: 'Additional information',
  backgroundColor: '#282c34',
  textColor: '#ffffff',
  textSize: 40,
  backgroundImage: '',
  backgroundOpacity: 1,
  backgroundPosition: 'center',
  overlayColor: '#000000',
  overlayOpacity: 0.3,
};

Header_001.craft = {
  props: HeaderDefaultProps,
  related: {
    settings: HeaderSettings,
  },
};
