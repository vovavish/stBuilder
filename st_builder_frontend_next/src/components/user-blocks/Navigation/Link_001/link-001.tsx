import { useNode } from '@craftjs/core';
import { useMediaQuery } from 'react-responsive';
import { FC, useState } from 'react';
import styles from '../../settings-common/settings-common.module.scss';

export interface Link_001Props {
  text: string;
  url: string;
  fontSize: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  textAlign: 'left' | 'center' | 'right';
  padding: {
    desktop: { top: string; bottom: string; left: string; right: string };
    tablet: { top: string; bottom: string; left: string; right: string };
    mobile: { top: string; bottom: string; left: string; right: string };
  };
  margin: {
    desktop: { top: string; bottom: string; left: string; right: string };
    tablet: { top: string; bottom: string; left: string; right: string };
    mobile: { top: string; bottom: string; left: string; right: string };
  };
  color: string;
  fontWeight: number;
  textDecoration: 'none' | 'underline';
  fontStyle: 'normal' | 'italic';
  backgroundColor: string;
}

export const Link_001: FC<Link_001Props> & {
  craft?: {
    props: typeof Link_001DefaultProps;
    related: { settings: typeof Link_001Settings };
  };
} = ({
  text,
  url,
  fontSize,
  textAlign,
  padding,
  margin,
  color,
  fontWeight,
  textDecoration,
  fontStyle,
  backgroundColor,
}) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const isTablet = useMediaQuery({ maxWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const currentFontSize = isMobile
    ? fontSize.mobile
    : isTablet
    ? fontSize.tablet
    : fontSize.desktop;
  const currentPadding = isMobile ? padding.mobile : isTablet ? padding.tablet : padding.desktop;
  const currentMargin = isMobile ? margin.mobile : isTablet ? margin.tablet : margin.desktop;

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={styles.linkContainer}
      style={{
        padding: `${currentPadding.top} ${currentPadding.right} ${currentPadding.bottom} ${currentPadding.left}`,
        margin: `${currentMargin.top} ${currentMargin.right} ${currentMargin.bottom} ${currentMargin.left}`,
        backgroundColor,
        textAlign,
      }}
    >
      <a
        href={url}
        style={{
          fontSize: currentFontSize,
          color,
          fontWeight,
          textDecoration,
          fontStyle,
          display: 'inline-block',
        }}
      >
        {text}
      </a>
    </div>
  );
};

const Link_001Settings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as Link_001Props,
  }));

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="link-settings">
      <div className={styles.settings_buttons_wrapper}>
        <button
          onClick={() => setDevice('desktop')}
          className={device === 'desktop' ? styles.activeButton : ''}
        >
          Настольный
        </button>
        <button
          onClick={() => setDevice('tablet')}
          className={device === 'tablet' ? styles.activeButton : ''}
        >
          Планшет
        </button>
        <button
          onClick={() => setDevice('mobile')}
          className={device === 'mobile' ? styles.activeButton : ''}
        >
          Мобильный
        </button>
      </div>

      <div>
        <label className={styles.settings_label}>Текст ссылки</label>
        <input
          type="text"
          value={props.text}
          onChange={(e) => setProp((props: Link_001Props) => (props.text = e.target.value))}
        />
      </div>

      <div>
        <label className={styles.settings_label}>URL</label>
        <input
          type="text"
          value={props.url}
          onChange={(e) => setProp((props: Link_001Props) => (props.url = e.target.value))}
        />
      </div>

      <div>
        <label className={styles.settings_label}>Размер шрифта</label>
        <input
          type="text"
          value={props.fontSize[device]}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.fontSize[device] = e.target.value))
          }
          placeholder="например, 1rem или 3vw"
        />
      </div>

      <div>
        <label className={styles.settings_label}>Отступ сверху</label>
        <input
          type="text"
          value={props.padding[device].top}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.padding[device].top = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>
      <div>
        <label className={styles.settings_label}>Отступ снизу</label>
        <input
          type="text"
          value={props.padding[device].bottom}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.padding[device].bottom = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>
      <div>
        <label className={styles.settings_label}>Отступ слева</label>
        <input
          type="text"
          value={props.padding[device].left}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.padding[device].left = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>
      <div>
        <label className={styles.settings_label}>Отступ справа</label>
        <input
          type="text"
          value={props.padding[device].right}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.padding[device].right = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>

      <div>
        <label className={styles.settings_label}>Отступ сверху (внешний)</label>
        <input
          type="text"
          value={props.margin[device].top}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.margin[device].top = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>
      <div>
        <label className={styles.settings_label}>Отступ снизу (внешний)</label>
        <input
          type="text"
          value={props.margin[device].bottom}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.margin[device].bottom = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>
      <div>
        <label className={styles.settings_label}>Отступ слева (внешний)</label>
        <input
          type="text"
          value={props.margin[device].left}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.margin[device].left = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>
      <div>
        <label className={styles.settings_label}>Отступ справа (внешний)</label>
        <input
          type="text"
          value={props.margin[device].right}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.margin[device].right = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>

      <div className={styles.settings_text_delimertor}>Общие элементы</div>

      <div>
        <label className={styles.settings_label}>Толщина шрифта</label>
        <input
          type="number"
          min="100"
          max="900"
          step="100"
          value={props.fontWeight}
          onChange={(e) =>
            setProp((props: Link_001Props) => (props.fontWeight = parseInt(e.target.value)))
          }
        />
      </div>

      <label className={styles.settings_label}>Выравнивание текста</label>
      <select
        value={props.textAlign}
        onChange={(e) =>
          setProp((props: Link_001Props) => (props.textAlign = e.target.value as any))
        }
      >
        <option value="left">По левому краю</option>
        <option value="center">По центру</option>
        <option value="right">По правому краю</option>
      </select>

      <label className={styles.settings_label}>Цвет текста</label>
      <input
        type="color"
        value={props.color}
        onChange={(e) => setProp((props: Link_001Props) => (props.color = e.target.value))}
      />

      <label className={styles.settings_label}>Цвет фона</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Link_001Props) => (props.backgroundColor = e.target.value))
        }
      />

      <label className={styles.settings_label}>Оформление текста</label>
      <select
        value={props.textDecoration}
        onChange={(e) =>
          setProp((props: Link_001Props) => (props.textDecoration = e.target.value as any))
        }
      >
        <option value="none">Нет</option>
        <option value="underline">Подчеркнутый</option>
      </select>

      <label className={styles.settings_label}>
        <input
          type="checkbox"
          checked={props.fontStyle === 'italic'}
          onChange={(e) =>
            setProp(
              (props: Link_001Props) => (props.fontStyle = e.target.checked ? 'italic' : 'normal'),
            )
          }
          className="mr-2"
        />
        Курсив
      </label>
    </div>
  );
};

export const Link_001DefaultProps = {
  text: 'Click here',
  url: '#',
  fontSize: {
    desktop: '1rem',
    tablet: '0.9rem',
    mobile: '0.8rem',
  },
  textAlign: 'center' as const,
  padding: {
    desktop: { top: '1rem', bottom: '1rem', left: '1rem', right: '1rem' },
    tablet: { top: '0.75rem', bottom: '0.75rem', left: '0.75rem', right: '0.75rem' },
    mobile: { top: '0.5rem', bottom: '0.5rem', left: '0.5rem', right: '0.5rem' },
  },
  margin: {
    desktop: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
    tablet: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
    mobile: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
  },
  color: '#0000EE',
  fontWeight: 400,
  textDecoration: 'underline' as const,
  fontStyle: 'normal' as const,
  backgroundColor: 'transparent',
};

Link_001.craft = {
  props: Link_001DefaultProps,
  related: {
    settings: Link_001Settings,
  },
};