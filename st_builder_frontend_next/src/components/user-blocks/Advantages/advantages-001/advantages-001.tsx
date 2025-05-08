import { useState, useEffect, useMemo, FC } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { useNode } from '@craftjs/core';
import { useMediaQuery } from 'react-responsive';
import styles from '../../settings-common/settings-common.module.scss';

export interface Advantages_001Props {
  title: string;
  description: string;
  advantages: string[];
  titleColor: string;
  textColor: string;
  titleSize: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  textSize: {
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
  titleFontWeight: number;
  fontWeight: number;
  lineHeight: number;
  textDecoration: 'none' | 'underline' | 'overline' | 'line-through';
  fontStyle: 'normal' | 'italic';
  backgroundColor: string;
  listStyle: string;
  gap: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
}

export const Advantages_001: FC<Advantages_001Props> & {
  craft?: {
    props: typeof Advantages_001DefaultProps;
    related: { settings: typeof AdvantagesBlockSettings };
  };
} = ({
  title,
  description,
  advantages,
  titleColor,
  textColor,
  titleSize,
  textSize,
  textAlign,
  padding,
  margin,
  maxWidth,
  titleFontWeight,
  fontWeight,
  lineHeight,
  textDecoration,
  fontStyle,
  backgroundColor,
  listStyle,
  gap,
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const [editable, setEditable] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const currentTitleSize = isMobile ? titleSize.mobile : isTablet ? titleSize.tablet : titleSize.desktop;
  const currentTextSize = isMobile ? textSize.mobile : isTablet ? textSize.tablet : textSize.desktop;
  const currentPadding = isMobile ? padding.mobile : isTablet ? padding.tablet : padding.desktop;
  const currentMargin = isMobile ? margin.mobile : isTablet ? margin.tablet : margin.desktop;
  const currentGap = isMobile ? gap.mobile : isTablet ? gap.tablet : gap.desktop;

  const editorTitle = useMemo(() => withReact(createEditor()), []);
  const editorDescription = useMemo(() => withReact(createEditor()), []);
  const editorAdvantages = useMemo(() => advantages.map(() => withReact(createEditor())), [advantages]);

  const initialTitleValue: Descendant[] = useMemo(() => {
    try {
      return JSON.parse(title);
    } catch {
      return [{ type: 'heading', children: [{ text: title }] }];
    }
  }, [title]);

  const initialDescriptionValue: Descendant[] = useMemo(() => {
    try {
      return JSON.parse(description);
    } catch {
      return [{ type: 'paragraph', children: [{ text: description }] }];
    }
  }, [description]);

  const initialAdvantagesValue: Descendant[][] = useMemo(() => {
    return advantages.map((advantage) => {
      try {
        return JSON.parse(advantage);
      } catch {
        return [{ type: 'paragraph', children: [{ text: advantage }] }];
      }
    });
  }, [advantages]);

  const [titleValue, setTitleValue] = useState<Descendant[]>(initialTitleValue);
  const [descriptionValue, setDescriptionValue] = useState<Descendant[]>(initialDescriptionValue);
  const [advantagesValue, setAdvantagesValue] = useState<Descendant[][]>(initialAdvantagesValue);

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
      style={{
        backgroundColor,
        padding: `${currentPadding.top} ${currentPadding.right} ${currentPadding.bottom} ${currentPadding.left}`,
        margin: `${currentMargin.top} ${currentMargin.right} ${currentMargin.bottom} ${currentMargin.left}`,
      }}
    >
      <div
        style={{
          maxWidth,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: currentGap,
          textAlign,
        }}
      >
        <Slate
          editor={editorTitle}
          initialValue={titleValue}
          onValueChange={(newValue) => {
            setTitleValue(newValue);
            setProp((props: Advantages_001Props) => (props.title = JSON.stringify(newValue)), 500);
          }}
        >
          <Editable
            readOnly={!editable}
            style={{
              color: titleColor,
              fontSize: currentTitleSize,
              fontWeight:titleFontWeight,
              lineHeight: `${lineHeight}`,
              textDecoration,
              fontStyle,
              textAlign,
              outline: 'none',
              cursor: editable ? 'text' : 'pointer',
            }}
          />
        </Slate>
        <Slate
          editor={editorDescription}
          initialValue={descriptionValue}
          onValueChange={(newValue) => {
            setDescriptionValue(newValue);
            setProp((props: Advantages_001Props) => (props.description = JSON.stringify(newValue)), 500);
          }}
        >
          <Editable
            readOnly={!editable}
            style={{
              color: textColor,
              fontSize: currentTextSize,
              fontWeight,
              lineHeight: `${lineHeight}`,
              textDecoration,
              fontStyle,
              textAlign,
              outline: 'none',
              cursor: editable ? 'text' : 'pointer',
            }}
          />
        </Slate>
        <ul
          style={{
            color: textColor,
            fontSize: currentTextSize,
            fontWeight,
            lineHeight: `${lineHeight}`,
            textDecoration,
            fontStyle,
            listStyleType: listStyle,
            paddingLeft: listStyle === 'none' ? '0' : '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: textAlign === 'center' || textAlign === 'justify' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
            gap: '20px',
            margin: '0 auto',
            textAlign,
          }}
        >
          {advantages.map((_, index) => (
            <li key={index}>
              <Slate
                editor={editorAdvantages[index]}
                initialValue={advantagesValue[index]}
                onValueChange={(newValue) => {
                  const newAdvantagesValue = [...advantagesValue];
                  newAdvantagesValue[index] = newValue;
                  setAdvantagesValue(newAdvantagesValue);
                  const newAdvantages = [...advantages];
                  newAdvantages[index] = JSON.stringify(newValue);
                  setProp((props: Advantages_001Props) => (props.advantages = newAdvantages), 500);
                }}
              >
                <Editable
                  readOnly={!editable}
                  style={{
                    outline: 'none',
                    cursor: editable ? 'text' : 'pointer',
                    textAlign,
                  }}
                />
              </Slate>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const AdvantagesBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as Advantages_001Props,
  }));

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <div className="advantages-block-settings">
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
          <label className={styles.settings_label}>Размер заголовка</label>
          <input
            type="text"
            value={props.titleSize[device]}
            onChange={(e) =>
              setProp((props: Advantages_001Props) => (props.titleSize[device] = e.target.value))
            }
            placeholder="например, 2rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Размер текста</label>
          <input
            type="text"
            value={props.textSize[device]}
            onChange={(e) =>
              setProp((props: Advantages_001Props) => (props.textSize[device] = e.target.value))
            }
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Отступ сверху</label>
          <input
            type="text"
            value={props.padding[device].top}
            onChange={(e) =>
              setProp((props: Advantages_001Props) => (props.padding[device].top = e.target.value))
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
              setProp((props: Advantages_001Props) => (props.padding[device].bottom = e.target.value))
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
              setProp((props: Advantages_001Props) => (props.padding[device].left = e.target.value))
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
              setProp((props: Advantages_001Props) => (props.padding[device].right = e.target.value))
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
              setProp((props: Advantages_001Props) => (props.margin[device].top = e.target.value))
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
              setProp((props: Advantages_001Props) => (props.margin[device].bottom = e.target.value))
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
              setProp((props: Advantages_001Props) => (props.margin[device].left = e.target.value))
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
              setProp((props: Advantages_001Props) => (props.margin[device].right = e.target.value))
            }
            placeholder="например, 1rem"
          />
        </div>
        <div>
          <label className={styles.settings_label}>Расстояние между элементами</label>
          <input
            type="text"
            value={props.gap[device]}
            onChange={(e) =>
              setProp((props: Advantages_001Props) => (props.gap[device] = e.target.value))
            }
            placeholder="например, 1.5rem"
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
              setProp((props: Advantages_001Props) => (props.fontWeight = parseInt(e.target.value)))
            }
          />
        </div>
        <div>
          <label className={styles.settings_label}>Высота строки</label>
          <input
            type="number"
            min="0.8"
            max="3"
            step="0.1"
            value={props.lineHeight}
            onChange={(e) =>
              setProp((props: Advantages_001Props) => (props.lineHeight = parseFloat(e.target.value)))
            }
          />
        </div>
        <div>
          <label className={styles.settings_label}>Максимальная ширина</label>
          <input
            type="text"
            value={props.maxWidth}
            onChange={(e) =>
              setProp((props: Advantages_001Props) => (props.maxWidth = e.target.value))
            }
            placeholder="например, 1200px"
          />
        </div>

      <label className={styles.settings_label}>Выравнивание текста</label>
      <select
        value={props.textAlign}
        onChange={(e) =>
          setProp((props: Advantages_001Props) => (props.textAlign = e.target.value as 'left' | 'center' | 'right' | 'justify' | 'inherit'))
        }
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
        onChange={(e) => setProp((props: Advantages_001Props) => (props.titleColor = e.target.value))}
      />

      <label className={styles.settings_label}>Цвет текста</label>
      <input
        type="color"
        value={props.textColor}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.textColor = e.target.value))}
      />

      <label className={styles.settings_label}>Цвет фона</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Advantages_001Props) => (props.backgroundColor = e.target.value))
        }
      />

      <label className={styles.settings_label}>Оформление текста</label>
      <select
        value={props.textDecoration}
        onChange={(e) =>
          setProp((props: Advantages_001Props) => (props.textDecoration = e.target.value as 'none' | 'underline' | 'overline' | 'line-through'))
        }
      >
        <option value="none">Нет</option>
        <option value="underline">Подчеркнутый</option>
        <option value="overline">Надчеркнутый</option>
        <option value="line-through">Зачеркнутый</option>
      </select>

      <label className={styles.settings_label}>Стиль списка</label>
      <select
        value={props.listStyle}
        onChange={(e) => setProp((props: Advantages_001Props) => (props.listStyle = e.target.value))}
      >
        <option value="disc">Disc</option>
        <option value="circle">Circle</option>
        <option value="square">Square</option>
        <option value="none">None</option>
      </select>

      <label className={styles.settings_label}>
        <input
          type="checkbox"
          checked={props.fontStyle === 'italic'}
          onChange={(e) =>
            setProp((props: Advantages_001Props) =>
              (props.fontStyle = e.target.checked ? 'italic' : 'normal')
            )
          }
        />
        Курсив
      </label>
    </div>
  );
};

export const Advantages_001DefaultProps: Advantages_001Props = {
  title: JSON.stringify([{ type: 'paragraph', children: [{ text: 'Преимущества' }] }]),
  description: JSON.stringify([{ type: 'paragraph', children: [{ text: 'Узнайте, почему стоит выбрать именно нас' }] }]),
  advantages: [
    JSON.stringify([{ type: 'paragraph', children: [{ text: 'Высокое качество услуг' }] }]),
    JSON.stringify([{ type: 'paragraph', children: [{ text: 'Профессиональная команда' }] }]),
    JSON.stringify([{ type: 'paragraph', children: [{ text: 'Индивидуальный подход' }] }]),
  ],
  titleColor: '#000000',
  textColor: '#333333',
  titleSize: {
    desktop: '2rem',
    tablet: '1.5rem',
    mobile: '1.25rem',
  },
  textSize: {
    desktop: '1.25rem',
    tablet: '1rem',
    mobile: '0.9rem',
  },
  textAlign: 'center',
  padding: {
    desktop: { top: '2rem', bottom: '2rem', left: '1rem', right: '1rem' },
    tablet: { top: '1.75rem', bottom: '1.75rem', left: '0.75rem', right: '0.75rem' },
    mobile: { top: '1.5rem', bottom: '1.5rem', left: '0.5rem', right: '0.5rem' },
  },
  margin: {
    desktop: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
    tablet: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
    mobile: { top: '0', bottom: '0', left: 'auto', right: 'auto' },
  },
  maxWidth: '1200px',
  titleFontWeight: 700,
  fontWeight: 400,
  lineHeight: 1.6,
  textDecoration: 'none',
  fontStyle: 'normal',
  backgroundColor: '#fff',
  listStyle: 'disc',
  gap: {
    desktop: '1.5rem',
    tablet: '1rem',
    mobile: '0.75rem',
  },
};

Advantages_001.craft = {
  props: Advantages_001DefaultProps,
  related: {
    settings: AdvantagesBlockSettings,
  },
};