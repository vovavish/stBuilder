import { useState, useEffect, FC } from 'react';
import ContentEditable from 'react-contenteditable';
import { useNode } from '@craftjs/core';
import styles from '../../settings-common/settings-common.module.scss';
import { api, API_URL } from '@/lib/api';

export interface Header_002Props {
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
  links: { text: string; url: string }[];
  linkAlignment: 'center' | 'left' | 'right' | 'space-between';
  linkFontColor: string;
  linkBackgroundColor: string;
}

export const Header_002: FC<Header_002Props> & {
  craft?: { props: typeof Header_002DefaultProps; related: { settings: typeof HeaderSettings } };
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
  links,
  linkAlignment,
  linkFontColor,
  linkBackgroundColor,
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
      <nav
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: linkAlignment,
          backgroundColor: linkBackgroundColor,
          padding: '1rem',
          zIndex: 2,
        }}
      >
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '1rem' }}>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} style={{ color: linkFontColor, textDecoration: 'none' }}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <ContentEditable
          disabled={!editable}
          html={text_company_name}
          onChange={(e) =>
            setProp((props: Header_002Props) => (props.text_company_name = e.target.value), 500)
          }
          tagName="h1"
          style={{ fontSize: `${textSize}px`, fontWeight: 'bold', marginBottom: `${topTextMarginBottom}px` }}
        />
        <ContentEditable
          disabled={!editable}
          html={text_company_slogan}
          onChange={(e) =>
            setProp((props: Header_002Props) => (props.text_company_slogan = e.target.value), 500)
          }
          tagName="h2"
          style={{ fontSize: `${textSize * 0.75}px`, fontWeight: 'bold' }}
        />
        <ContentEditable
          disabled={!editable}
          html={text_company_additional}
          onChange={(e) =>
            setProp(
              (props: Header_002Props) => (props.text_company_additional = e.target.value),
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
    props: node.data.props as Header_002Props,
  }));

  const [newLink, setNewLink] = useState({ text: '', url: '' });

  const addLink = () => {
    if (newLink.text && newLink.url) {
      setProp((props: Header_002Props) => props.links.push(newLink));
      setNewLink({ text: '', url: '' });
    }
  };

  const removeLink = (index: number) => {
    setProp((props: Header_002Props) => {
      props.links.splice(index, 1);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
  
        const response = await api.post('/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        const uploadedFileUrl = response.data.filePath;
        setProp((props: Header_002Props) => {
          props.backgroundImage = `${API_URL}/${uploadedFileUrl}`;
        });
      } catch (err) {
        console.error('Ошибка при загрузке фонового изображения:', err);
      }
    }
  };

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
          setProp((props: Header_002Props) => (props.textSize = parseInt(e.target.value, 10)))
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
          setProp((props: Header_002Props) => (props.topTextMarginBottom = parseInt(e.target.value, 10)))
        }
      />
      
      <label className={styles.settings_label}>Верхний отступ нижнего текста</label>
      <input
        type="range"
        min="0"
        max="300"
        step="1"
        value={props.bottomTextMarginTop}
        onChange={(e) =>
          setProp((props: Header_002Props) => (props.bottomTextMarginTop = parseInt(e.target.value, 10)))
        }
      />

      <label className={styles.settings_label}>Цвет фона</label>
      <input
        type="color"
        value={props.backgroundColor}
        onChange={(e) =>
          setProp((props: Header_002Props) => (props.backgroundColor = e.target.value))
        }
      />

      <label className={styles.settings_label}>Цвет текста</label>
      <input
        type="color"
        value={props.textColor}
        onChange={(e) => setProp((props: Header_002Props) => (props.textColor = e.target.value))}
      />

      <label className={styles.settings_label}>Фоновое изображение (.jpg, .png, .webp)</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <label className={styles.settings_label}>Прозрачность фона</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={props.backgroundOpacity}
        onChange={(e) =>
          setProp(
            (props: Header_002Props) => (props.backgroundOpacity = parseFloat(e.target.value)),
          )
        }
      />

      <label className={styles.settings_label}>Позиция фонового изображения</label>
      <select
        value={props.backgroundPosition}
        onChange={(e) =>
          setProp((props: Header_002Props) => (props.backgroundPosition = e.target.value))
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
        onChange={(e) => setProp((props: Header_002Props) => (props.overlayColor = e.target.value))}
      />

      <label className={styles.settings_label}>Прозрачность переднего плана</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={props.overlayOpacity}
        onChange={(e) =>
          setProp((props: Header_002Props) => (props.overlayOpacity = parseFloat(e.target.value)))
        }
      />

      <div className="link-settings">
        <label className={styles.settings_label}>Выравнивание ссылок</label>
        <select
          value={props.linkAlignment}
          onChange={(e) => setProp((props: Header_002Props) => (props.linkAlignment = e.target.value as 'center' | 'left' | 'right' | 'space-between'))}
        >
          <option value="center">По центру</option>
          <option value="left">Слева</option>
          <option value="right">Справа</option>
          <option value="space-between">На расстоянии</option>
        </select>

        <label className={styles.settings_label}>Цвет шрифта ссылок</label>
        <input
          type="color"
          value={props.linkFontColor}
          onChange={(e) => setProp((props: Header_002Props) => (props.linkFontColor = e.target.value))}
        />

        <label className={styles.settings_label}>Цвет фона ссылок</label>
        <input
          type="color"
          value={props.linkBackgroundColor}
          onChange={(e) => setProp((props: Header_002Props) => (props.linkBackgroundColor = e.target.value))}
        />

        <label className={styles.settings_label}>Ссылки</label>
        {props.links.map((link, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={link.text}
              onChange={(e) =>
                setProp((props: Header_002Props) => (props.links[index].text = e.target.value))
              }
              placeholder="Текст"
              className="mr-2"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) =>
                setProp((props: Header_002Props) => (props.links[index].url = e.target.value))
              }
              placeholder="URL"
              className="mr-2"
            />
            <button onClick={() => removeLink(index)} className="text-red-500">
              Удалить
            </button>
          </div>
        ))}
        <div className="flex items-center mb-2">
          <input
            type="text"
            value={newLink.text}
            onChange={(e) => setNewLink({ ...newLink, text: e.target.value })}
            placeholder="Текст"
            className="mr-2"
          />
          <input
            type="text"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="URL"
            className="mr-2"
          />
          <button onClick={addLink} className="text-green-500">
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export const Header_002DefaultProps = {
  text_company_name: 'Добавьте название компании',
  text_company_slogan: 'Добавьте слоган компании',
  text_company_additional: 'Добавьте дополнительную информацию',
  backgroundColor: '#282c34',
  textColor: '#ffffff',
  textSize: 40,
  topTextMarginBottom: 20,
  bottomTextMarginTop: 20,
  backgroundImage: '',
  backgroundOpacity: 1,
  backgroundPosition: 'center',
  overlayColor: '#000000',
  overlayOpacity: 0.3,
  links: [
    { text: 'Главная', url: '#' },
    { text: 'О нас', url: '#' },
    { text: 'Контакты', url: '#' },
  ],
  linkAlignment: 'center' as const,
  linkFontColor: '#ffffff',
  linkBackgroundColor: 'transparent',
};

Header_002.craft = {
  props: Header_002DefaultProps,
  related: {
    settings: HeaderSettings,
  },
};