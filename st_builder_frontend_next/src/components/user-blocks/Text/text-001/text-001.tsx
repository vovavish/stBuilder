import { useEffect, useMemo, useState, FC } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useNode } from '@craftjs/core';
import { useMediaQuery } from 'react-responsive';
import styles from '../../settings-common/settings-common.module.scss';

export interface Text_001Props {
  text: string;
  fontSize: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  textAlign: 'left' | 'center' | 'right' | 'justify' | 'inherit';
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
  maxWidth: string;
  color: string;
  fontWeight: number;
  lineHeight: number;
  textDecoration: 'none' | 'underline' | 'overline' | 'line-through';
  fontStyle: 'normal' | 'italic';
  backgroundColor: string;
}

export const Text_001: FC<Text_001Props> & {
  craft?: {
    props: typeof Text_001DefaultProps;
    related: { settings: typeof Text_001Settings };
  };
} = ({
  text,
  fontSize,
  textAlign,
  padding,
  margin,
  maxWidth,
  color,
  fontWeight,
  lineHeight,
  textDecoration,
  fontStyle,
  backgroundColor,
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const initialValue: Descendant[] = useMemo(() => {
    try {
      return JSON.parse(text);
    } catch {
      return [{ type: 'paragraph', children: [{ text }] }];
    }
  }, [text]);

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
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

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!selected) setEditable(false);
  }, [selected]);

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      onClick={() => selected && setEditable(true)}
      className={styles.textContainer}
      style={{
        padding: `${currentPadding.top} ${currentPadding.right} ${currentPadding.bottom} ${currentPadding.left}`,
        margin: `${currentMargin.top} ${currentMargin.right} ${currentMargin.bottom} ${currentMargin.left}`,
        backgroundColor,
      }}
    >
      <Slate
        editor={editor}
        initialValue={value}
        onValueChange={(newValue) => {
          setValue(newValue);
          setProp((props: { text: string }) => (props.text = JSON.stringify(newValue)), 500);
        }}
      >
        <Editable
          readOnly={!editable}
          style={{
            fontSize: currentFontSize,
            textAlign,
            maxWidth,
            color,
            fontWeight,
            lineHeight: `${lineHeight}`,
            textDecoration,
            fontStyle,
            margin: '0 auto',
            outline: 'none',
            cursor: editable ? 'text' : 'pointer',
          }}
        />
      </Slate>
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

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="text-settings">
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
        <label className={styles.settings_label}>Размер шрифта</label>
        <input
          type="text"
          value={props.fontSize[device]}
          onChange={(e) =>
            setProp((props: Text_001Props) => (props.fontSize[device] = e.target.value))
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
            setProp((props: Text_001Props) => (props.padding[device].top = e.target.value))
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
            setProp((props: Text_001Props) => (props.padding[device].bottom = e.target.value))
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
            setProp((props: Text_001Props) => (props.padding[device].left = e.target.value))
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
            setProp((props: Text_001Props) => (props.padding[device].right = e.target.value))
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
            setProp((props: Text_001Props) => (props.fontWeight = parseInt(e.target.value)))
          }
        />
      </div>

      <label className={styles.settings_label}>Выравнивание текста</label>
      <select
        value={props.textAlign}
        onChange={(e) =>
          setProp((props: Text_001Props) => (props.textAlign = e.target.value as any))
        }
      >
        <option value="left">По левому краю</option>
        <option value="center">По центру</option>
        <option value="right">По правому краю</option>
        <option value="justify">По ширине</option>
        <option value="inherit">Наследовать</option>
      </select>

      <label className={styles.settings_label}>Цвет текста</label>
      <input
        type="color"
        value={props.color}
        onChange={(e) => setProp((props: Text_001Props) => (props.color = e.target.value))}
      />

      <label className={styles.settings_label}>Цвет фона</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Text_001Props) => (props.backgroundColor = e.target.value))
        }
      />

      <div>
        <label className={styles.settings_label}>Высота строки</label>
        <input
          type="number"
          min="0.8"
          max="3"
          step="0.1"
          value={props.lineHeight}
          onChange={(e) =>
            setProp((props: Text_001Props) => (props.lineHeight = parseFloat(e.target.value)))
          }
        />
      </div>
      <div>
        <label className={styles.settings_label}>Максимальная ширина</label>
        <input
          type="text"
          value={props.maxWidth}
          onChange={(e) => setProp((props: Text_001Props) => (props.maxWidth = e.target.value))}
          placeholder="например, 90% или 500px"
        />
      </div>

      <label className={styles.settings_label}>Оформление текста</label>
      <select
        value={props.textDecoration}
        onChange={(e) =>
          setProp((props: Text_001Props) => (props.textDecoration = e.target.value as any))
        }
        className="w-full p-1 border rounded mb-3"
      >
        <option value="none">Нет</option>
        <option value="underline">Подчеркнутый</option>
        <option value="overline">Надчеркнутый</option>
        <option value="line-through">Зачеркнутый</option>
      </select>

      <label className={styles.settings_label}>
        <input
          type="checkbox"
          checked={props.fontStyle === 'italic'}
          onChange={(e) =>
            setProp(
              (props: Text_001Props) => (props.fontStyle = e.target.checked ? 'italic' : 'normal'),
            )
          }
          className="mr-2"
        />
        Курсив
      </label>

      <div>
        <label className={styles.settings_label}>Отступ сверху (внешний)</label>
        <input
          type="text"
          value={props.margin[device].top}
          onChange={(e) =>
            setProp((props: Text_001Props) => (props.margin[device].top = e.target.value))
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
            setProp((props: Text_001Props) => (props.margin[device].bottom = e.target.value))
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
            setProp((props: Text_001Props) => (props.margin[device].left = e.target.value))
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
            setProp((props: Text_001Props) => (props.margin[device].right = e.target.value))
          }
          placeholder="например, 1rem"
        />
      </div>
    </div>
  );
};

export const Text_001DefaultProps = {
  text: JSON.stringify([{ type: 'paragraph', children: [{ text: 'Добавьте текст в этот блок' }] }]),
  fontSize: {
    desktop: '1.25rem',
    tablet: '1rem',
    mobile: '0.9rem',
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
  maxWidth: '90%',
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
  },
};
