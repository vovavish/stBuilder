import { useEffect, useMemo, useState, FC } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useNode } from '@craftjs/core';
import { useMediaQuery } from 'react-responsive';
import styles from '../../settings-common/settings-common.module.scss';

export interface Title_001Props {
  titleText: string;
  contentText: string;
  titleFontSize: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  textFontSize: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  titleColor: string;
  textColor: string;
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
  titleFontWeight: number;
  textFontWeight: number;
  titleLineHeight: number;
  textLineHeight: number;
  titleTextDecoration: 'none' | 'underline' | 'overline' | 'line-through';
  textTextDecoration: 'none' | 'underline' | 'overline' | 'line-through';
  titleFontStyle: 'normal' | 'italic';
  textFontStyle: 'normal' | 'italic';
  backgroundColor: string;
  gap: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

export const Title_001: FC<Title_001Props> & {
  craft?: {
    props: typeof Title_001DefaultProps;
    related: { settings: typeof TitleBlockSettings };
  };
} = ({
  titleText,
  contentText,
  titleFontSize,
  textFontSize,
  titleColor,
  textColor,
  textAlign,
  padding,
  margin,
  maxWidth,
  titleFontWeight,
  textFontWeight,
  titleLineHeight,
  textLineHeight,
  titleTextDecoration,
  textTextDecoration,
  titleFontStyle,
  textFontStyle,
  backgroundColor,
  gap,
}) => {
  const titleEditor = useMemo(() => withReact(createEditor()), []);
  const contentEditor = useMemo(() => withReact(createEditor()), []);

  const initialTitleValue: Descendant[] = useMemo(() => {
    try {
      return JSON.parse(titleText);
    } catch {
      return [{ type: 'heading', children: [{ text: titleText }] }];
    }
  }, [titleText]);

  const initialContentValue: Descendant[] = useMemo(() => {
    try {
      return JSON.parse(contentText);
    } catch {
      return [{ type: 'paragraph', children: [{ text: contentText }] }];
    }
  }, [contentText]);

  const [titleValue, setTitleValue] = useState<Descendant[]>(initialTitleValue);
  const [contentValue, setContentValue] = useState<Descendant[]>(initialContentValue);

  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const isTablet = useMediaQuery({ maxWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const currentTitleFontSize = isMobile ? titleFontSize.mobile : isTablet ? titleFontSize.tablet : titleFontSize.desktop;
  const currentTextFontSize = isMobile ? textFontSize.mobile : isTablet ? textFontSize.tablet : textFontSize.desktop;
  const currentPadding = isMobile ? padding.mobile : isTablet ? padding.tablet : padding.desktop;
  const currentMargin = isMobile ? margin.mobile : isTablet ? margin.tablet : margin.desktop;
  const currentGap = isMobile ? gap.mobile : isTablet ? gap.tablet : gap.desktop;

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!selected) {
      setEditable(false);
    }
  }, [selected]);

  return (
    <section
      ref={(ref) => {
        if (ref) {
          connect(drag(ref));
        }
      }}
      onClick={() => selected && setEditable(true)}
      className={styles.textContainer}
      style={{
        backgroundColor,
        padding: `${currentPadding.top} ${currentPadding.right} ${currentPadding.bottom} ${currentPadding.left}`,
        margin: `${currentMargin.top} ${currentMargin.right} ${currentMargin.bottom} ${currentMargin.left}`,
        maxWidth,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Slate
        editor={titleEditor}
        initialValue={titleValue}
        onValueChange={(newValue) => {
          setTitleValue(newValue);
          setProp((props: Title_001Props) => (props.titleText = JSON.stringify(newValue)), 500);
        }}
      >
        <Editable
          readOnly={!editable}
          style={{
            color: titleColor,
            fontSize: currentTitleFontSize,
            fontWeight: titleFontWeight,
            lineHeight: `${titleLineHeight}`,
            textDecoration: titleTextDecoration,
            fontStyle: titleFontStyle,
            textAlign,
            marginBottom: currentGap,
            outline: 'none',
            cursor: editable ? 'text' : 'pointer',
          }}
        />
      </Slate>
      <Slate
        editor={contentEditor}
        initialValue={contentValue}
        onValueChange={(newValue) => {
          setContentValue(newValue);
          setProp((props: Title_001Props) => (props.contentText = JSON.stringify(newValue)), 500);
        }}
      >
        <Editable
          readOnly={!editable}
          style={{
            color: textColor,
            fontSize: currentTextFontSize,
            fontWeight: textFontWeight,
            lineHeight: `${textLineHeight}`,
            textDecoration: textTextDecoration,
            fontStyle: textFontStyle,
            textAlign,
            outline: 'none',
            cursor: editable ? 'text' : 'pointer',
          }}
        />
      </Slate>
    </section>
  );
};

const TitleBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as Title_001Props,
  }));

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="title-block-settings">
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

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={styles.settings_label}>Размер шрифта заголовка</label>
          <input
            type="text"
            value={props.titleFontSize[device]}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.titleFontSize[device] = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 2rem или 5vw"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Размер шрифта текста</label>
          <input
            type="text"
            value={props.textFontSize[device]}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.textFontSize[device] = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem или 3vw"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ сверху</label>
          <input
            type="text"
            value={props.padding[device].top}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.padding[device].top = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ снизу</label>
          <input
            type="text"
            value={props.padding[device].bottom}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.padding[device].bottom = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ слева</label>
          <input
            type="text"
            value={props.padding[device].left}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.padding[device].left = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ справа</label>
          <input
            type="text"
            value={props.padding[device].right}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.padding[device].right = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ сверху (внешний)</label>
          <input
            type="text"
            value={props.margin[device].top}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.margin[device].top = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ снизу (внешний)</label>
          <input
            type="text"
            value={props.margin[device].bottom}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.margin[device].bottom = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ слева (внешний)</label>
          <input
            type="text"
            value={props.margin[device].left}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.margin[device].left = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ справа (внешний)</label>
          <input
            type="text"
            value={props.margin[device].right}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.margin[device].right = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Расстояние между заголовком и текстом</label>
          <input
            type="text"
            value={props.gap[device]}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.gap[device] = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 1rem"
          />
        </div>
      </div>

      <div className={styles.settings_text_delimertor}>Общие элементы</div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={styles.settings_label}>Толщина шрифта заголовка</label>
          <input
            type="number"
            min="100"
            max="900"
            step="100"
            value={props.titleFontWeight}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.titleFontWeight = parseInt(e.target.value)))
            }
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Толщина шрифта текста</label>
          <input
            type="number"
            min="100"
            max="900"
            step="100"
            value={props.textFontWeight}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.textFontWeight = parseInt(e.target.value)))
            }
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Высота строки заголовка</label>
          <input
            type="number"
            min="0.8"
            max="3"
            step="0.1"
            value={props.titleLineHeight}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.titleLineHeight = parseFloat(e.target.value)))
            }
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Высота строки текста</label>
          <input
            type="number"
            min="0.8"
            max="3"
            step="0.1"
            value={props.textLineHeight}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.textLineHeight = parseFloat(e.target.value)))
            }
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Максимальная ширина</label>
          <input
            type="text"
            value={props.maxWidth}
            onChange={(e) =>
              setProp((props: Title_001Props) => (props.maxWidth = e.target.value))
            }
            className="w-full p-1 border rounded"
            placeholder="например, 90% или 500px"
          />
        </div>
      </div>

      <label className={styles.settings_label}>Выравнивание текста</label>
      <select
        value={props.textAlign}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.textAlign = e.target.value as any))
        }
        className="w-full p-1 border rounded mb-3"
      >
        <option value="left">По левому краю</option>
        <option value="center">По центру</option>
        <option value="right">По правому краю</option>
        <option value="justify">По ширине</option>
        <option value="inherit">Наследовать</option>
      </select>

      <label className={styles.settings_label}>Цвет заголовка</label>
      <input
        type="color"
        value={props.titleColor}
        onChange={(e) => setProp((props: Title_001Props) => (props.titleColor = e.target.value))}
        className="w-full p-1 border rounded mb-3"
      />

      <label className={styles.settings_label}>Цвет текста</label>
      <input
        type="color"
        value={props.textColor}
        onChange={(e) => setProp((props: Title_001Props) => (props.textColor = e.target.value))}
        className="w-full p-1 border rounded mb-3"
      />

      <label className={styles.settings_label}>Цвет фона</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.backgroundColor = e.target.value))
        }
        className="w-full p-1 border rounded mb-3"
      />

      <label className={styles.settings_label}>Оформление заголовка</label>
      <select
        value={props.titleTextDecoration}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.titleTextDecoration = e.target.value as any))
        }
        className="w-full p-1 border rounded mb-3"
      >
        <option value="none">Нет</option>
        <option value="underline">Подчеркнутый</option>
        <option value="overline">Надчеркнутый</option>
        <option value="line-through">Зачеркнутый</option>
      </select>

      <label className={styles.settings_label}>Оформление текста</label>
      <select
        value={props.textTextDecoration}
        onChange={(e) =>
          setProp((props: Title_001Props) => (props.textTextDecoration = e.target.value as any))
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
          checked={props.titleFontStyle === 'italic'}
          onChange={(e) =>
            setProp((props: Title_001Props) =>
              (props.titleFontStyle = e.target.checked ? 'italic' : 'normal')
            )
          }
          className="mr-2"
        />
        Курсив заголовка
      </label>

      <label className={styles.settings_label}>
        <input
          type="checkbox"
          checked={props.textFontStyle === 'italic'}
          onChange={(e) =>
            setProp((props: Title_001Props) =>
              (props.textFontStyle = e.target.checked ? 'italic' : 'normal')
            )
          }
          className="mr-2"
        />
        Курсив текста
      </label>
    </div>
  );
};

export const Title_001DefaultProps: Title_001Props = {
  titleText: JSON.stringify([{ type: 'heading', children: [{ text: 'Название заголовка' }] }]),
  contentText: JSON.stringify([{ type: 'paragraph', children: [{ text: 'Добавьте текст в этот блок' }] }]),
  titleFontSize: {
    desktop: '2rem',
    tablet: '1.5rem',
    mobile: '1.25rem',
  },
  textFontSize: {
    desktop: '1.25rem',
    tablet: '1rem',
    mobile: '0.9rem',
  },
  titleColor: '#000000',
  textColor: '#333333',
  textAlign: 'center',
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
  maxWidth: '100%',
  titleFontWeight: 700,
  textFontWeight: 400,
  titleLineHeight: 1.2,
  textLineHeight: 1.6,
  titleTextDecoration: 'none',
  textTextDecoration: 'none',
  titleFontStyle: 'normal',
  textFontStyle: 'normal',
  backgroundColor: 'transparent',
  gap: {
    desktop: '1rem',
    tablet: '0.75rem',
    mobile: '0.5rem',
  },
};

Title_001.craft = {
  props: Title_001DefaultProps,
  related: {
    settings: TitleBlockSettings,
  },
};