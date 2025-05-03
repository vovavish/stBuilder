'use client';
import React, { useEffect, FC, useState, useMemo } from 'react';
import { useNode } from '@craftjs/core';

import { api, API_URL } from '@/lib/api';
import { useMediaQuery } from 'react-responsive';
import styles from '../../../settings-common/settings-common.module.scss';

import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { DXFRenderer } from '../dxf-001/dxf-001';

export interface DXF_002Props {
  dxfUrl: string;
  text: string;
  backgroundColor: string;
  width: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  height: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
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
  fontSize: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
  textAlign: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  textMaxWidth: string;
  textColor: string;
  fontWeight: number;
  lineHeight: number;
  textDecoration: 'none' | 'underline' | 'overline' | 'line-through';
  fontStyle: 'normal' | 'italic';
  textBackgroundColor: string;
}

export const DXF_002: FC<DXF_002Props> & {
  craft?: {
    props: typeof DXF_002DefaultProps;
    related: { settings: typeof DXFBlockSettings };
  };
} = ({
  dxfUrl,
  text,
  backgroundColor,
  width,
  height,
  padding,
  margin,
  fontSize,
  textAlign,
  textMaxWidth,
  textColor,
  fontWeight,
  lineHeight,
  textDecoration,
  fontStyle,
  textBackgroundColor,
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const editor = useMemo(() => withReact(createEditor()), []);
  const initialValue: Descendant[] = useMemo(() => {
    try {
      return JSON.parse(text);
    } catch {
      return [{ type: 'paragraph', children: [{ text }] }];
    }
  }, [text]);

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [editable, setEditable] = useState(false);

  const isTablet = useMediaQuery({ maxWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 480 });

  const currentWidth = isMobile ? width.mobile : isTablet ? width.tablet : width.desktop;
  const currentHeight = isMobile ? height.mobile : isTablet ? height.tablet : height.desktop;
  const currentPadding = isMobile ? padding.mobile : isTablet ? padding.tablet : padding.desktop;
  const currentMargin = isMobile ? margin.mobile : isTablet ? margin.tablet : margin.desktop;
  const currentFontSize = isMobile ? fontSize.mobile : isTablet ? fontSize.tablet : fontSize.desktop;

  useEffect(() => {
    if (!selected) setEditable(false);
  }, [selected]);

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      style={{
        backgroundColor,
        padding: `${currentPadding.top} ${currentPadding.right} ${currentPadding.bottom} ${currentPadding.left}`,
        margin: `${currentMargin.top} ${currentMargin.right} ${currentMargin.bottom} ${currentMargin.left}`,
        width: currentWidth,
        height: currentHeight,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          flex: isMobile ? '0 0 auto' : '1',
          width: isMobile ? '100%' : '40%',
          backgroundColor: textBackgroundColor,
          height: isMobile ? 'auto' : '100%',
          overflow: 'auto',
          display: isMobile ? 'block' : 'flex',
          alignItems: isMobile ? 'initial' : 'center',
          justifyContent: isMobile ? 'initial' : 'center',
        }}
        onClick={() => selected && setEditable(true)}
      >
        <Slate
          editor={editor}
          initialValue={value}
          onValueChange={(newValue) => {
            setValue(newValue);
            setProp((props: DXF_002Props) => (props.text = JSON.stringify(newValue)), 500);
          }}
        >
          <Editable
            readOnly={!editable}
            style={{
              fontSize: currentFontSize,
              textAlign,
              maxWidth: textMaxWidth,
              color: textColor,
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
  
      <div
        style={{
          flex: isMobile ? '1 1 auto' : '2',
          width: isMobile ? '100%' : '60%',
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <DXFRenderer url={dxfUrl} isMobile={isMobile} />
      </div>
    </div>
  );
};

const DXFBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({ props: node.data.props as DXF_002Props }));

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleDxfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedFileUrl = response.data.filePath;
        setProp((props: DXF_002Props) => {
          props.dxfUrl = `${API_URL}/${uploadedFileUrl}`;
        });

        console.log('DXF file uploaded successfully, URL:', uploadedFileUrl);
      } catch (error) {
        console.error('Error uploading DXF file:', error);
      }
    }
  };

  return (
    <div className="dxf-settings">
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

      <h3 className={styles.settings_label}>Настройки DXF</h3>
      <label className={styles.settings_label}>DXF File (.dxf)</label>
      <input type="file" accept=".dxf" onChange={handleDxfChange} />
      <label className={styles.settings_label}>DXF URL</label>
      <input
        type="text"
        value={props.dxfUrl}
        onChange={(e) => setProp((props: DXF_002Props) => (props.dxfUrl = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Ширина блока</label>
      <input
        type="text"
        value={props.width[device]}
        onChange={(e) => setProp((props: DXF_002Props) => (props.width[device] = e.target.value))}
        placeholder="например, 100% или 800px"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Высота блока</label>
      <input
        type="text"
        value={props.height[device]}
        onChange={(e) => setProp((props: DXF_002Props) => (props.height[device] = e.target.value))}
        placeholder="например, 600px или 50vh"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ сверху</label>
      <input
        type="text"
        value={props.padding[device].top}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.padding[device].top = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ снизу</label>
      <input
        type="text"
        value={props.padding[device].bottom}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.padding[device].bottom = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ слева</label>
      <input
        type="text"
        value={props.padding[device].left}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.padding[device].left = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ справа</label>
      <input
        type="text"
        value={props.padding[device].right}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.padding[device].right = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ сверху (внешний)</label>
      <input
        type="text"
        value={props.margin[device].top}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.margin[device].top = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ снизу (внешний)</label>
      <input
        type="text"
        value={props.margin[device].bottom}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.margin[device].bottom = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ слева (внешний)</label>
      <input
        type="text"
        value={props.margin[device].left}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.margin[device].left = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Отступ справа (внешний)</label>
      <input
        type="text"
        value={props.margin[device].right}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.margin[device].right = e.target.value))
        }
        placeholder="например, 1rem"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Цвет фона блока</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.backgroundColor = e.target.value))
        }
        className="w-full p-1 border rounded"
      />

      <h3 className={styles.settings_label}>Настройки текста</h3>
      <label className={styles.settings_label}>Размер шрифта</label>
      <input
        type="text"
        value={props.fontSize[device]}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.fontSize[device] = e.target.value))
        }
        placeholder="например, 1rem или 3vw"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Выравнивание текста</label>
      <select
        value={props.textAlign}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.textAlign = e.target.value as any))
        }
        className="w-full p-1 border rounded"
      >
        <option value="left">По левому краю</option>
        <option value="center">По центру</option>
        <option value="right">По правому краю</option>
        <option value="justify">По ширине</option>
        <option value="inherit">Наследовать</option>
      </select>
      <label className={styles.settings_label}>Максимальная ширина текста</label>
      <input
        type="text"
        value={props.textMaxWidth}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.textMaxWidth = e.target.value))
        }
        placeholder="например, 90% или 500px"
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Цвет текста</label>
      <input
        type="color"
        value={props.textColor}
        onChange={(e) => setProp((props: DXF_002Props) => (props.textColor = e.target.value))}
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Цвет фона текста</label>
      <input
        type="color"
        value={props.textBackgroundColor}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.textBackgroundColor = e.target.value))
        }
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Толщина шрифта</label>
      <input
        type="number"
        min="100"
        max="900"
        step="100"
        value={props.fontWeight}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.fontWeight = parseInt(e.target.value)))
        }
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Высота строки</label>
      <input
        type="number"
        min="0.8"
        max="3"
        step="0.1"
        value={props.lineHeight}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.lineHeight = parseFloat(e.target.value)))
        }
        className="w-full p-1 border rounded"
      />
      <label className={styles.settings_label}>Оформление текста</label>
      <select
        value={props.textDecoration}
        onChange={(e) =>
          setProp((props: DXF_002Props) => (props.textDecoration = e.target.value as any))
        }
        className="w-full p-1 border rounded"
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
            setProp((props: DXF_002Props) =>
              (props.fontStyle = e.target.checked ? 'italic' : 'normal')
            )
          }
          className="mr-2"
        />
        Курсив
      </label>
    </div>
  );
};

export const DXF_002DefaultProps: DXF_002Props = {
  dxfUrl: '',
  text: JSON.stringify([{ type: 'paragraph', children: [{ text: 'Описание чертежа' }] }]),
  backgroundColor: '#ffffff',
  width: {
    desktop: '1000px',
    tablet: '100%',
    mobile: '100%',
  },
  height: {
    desktop: '600px',
    tablet: '500px',
    mobile: '600px',
  },
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
  fontSize: {
    desktop: '1.25rem',
    tablet: '1rem',
    mobile: '0.9rem',
  },
  textAlign: 'left',
  textMaxWidth: '90%',
  textColor: '#000000',
  fontWeight: 400,
  lineHeight: 1.5,
  textDecoration: 'none',
  fontStyle: 'normal',
  textBackgroundColor: 'transparent',
};

DXF_002.craft = {
  props: DXF_002DefaultProps,
  related: {
    settings: DXFBlockSettings,
  },
};