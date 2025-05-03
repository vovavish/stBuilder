import { useNode } from '@craftjs/core';
import { useMediaQuery } from 'react-responsive';
import { FC, useState } from 'react';
import stylesSettings from '../../settings-common/settings-common.module.scss';
import styles from './Link_002.module.scss';
import { api, API_URL } from '@/lib/api';

export interface Link_002Props {
  alignment: 'center' | 'left' | 'right' | 'space-beetwen';
  links: { text: string; url: string }[];
  backgroundColor: string;
  fontColor: string;
  borderColor: string;
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  logoUrl?: string;
}

export const Link_002: FC<Link_002Props> & {
  craft?: {
    props: typeof Link_002DefaultProps;
    related: { settings: typeof Link_002Settings };
  };
} = ({
  alignment,
  links,
  backgroundColor,
  fontColor,
  borderColor,
  borderWidth,
  borderStyle,
  logoUrl,
}) => {
  const {
    connectors: { connect, drag },
    selected,
  } = useNode((state) => ({
    selected: state.events.selected,
  }));

  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      ref={(ref) => {
        if (ref) connect(drag(ref));
      }}
      className={styles.nav}
      style={{
        backgroundColor,
        color: fontColor,
        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
        justifyContent: alignment === 'center' ? 'center' : alignment === 'left' ? 'flex-start' : alignment === 'space-beetwen' ? 'space-between' : 'flex-end',
      }}
    >
      {logoUrl && <img src={logoUrl} alt="Logo" className={styles.logo} />}
      {isMobile ? (
        <div className={styles.burgerMenu}>
          <button onClick={toggleMenu} className={styles.burgerButton}>
            ☰
          </button>
          {isMenuOpen && (
            <ul className={styles.mobileMenu}>
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.url} style={{ color: fontColor }}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ul className={styles.menu}>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} style={{ color: fontColor }}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export const Link_002Settings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as Link_002Props,
  }));

  const [newLink, setNewLink] = useState({ text: '', url: '' });

  const addLink = () => {
    if (newLink.text && newLink.url) {
      setProp((props: Link_002Props) => props.links.push(newLink));
      setNewLink({ text: '', url: '' });
    }
  };

  const removeLink = (index: number) => {
    setProp((props: Link_002Props) => {
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
          setProp((props: Link_002Props) => {
            props.logoUrl = `${API_URL}/${uploadedFileUrl}`;
          });
        } catch (err) {
          console.error('Ошибка при загрузке фонового изображения:', err);
        }
      }
    };

  return (
    <div className="link-settings">
      <div>
        <label className={stylesSettings.settings_label}>Выравнивание</label>
        <select
          value={props.alignment}
          onChange={(e) => setProp((props: Link_002Props) => (props.alignment = e.target.value as any))}
        >
          <option value="center">По центру</option>
          <option value="left">Слева</option>
          <option value="right">Справа</option>space-beetwen
          <option value="space-beetwen">На расстоянии</option>
        </select>
      </div>

      <label className={styles.settings_label}>Фоновое изображение (.jpg, .png, .webp)</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <div>
        <label className={stylesSettings.settings_label}>Ссылки</label>
        {props.links.map((link, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={link.text}
              onChange={(e) =>
                setProp((props: Link_002Props) => (props.links[index].text = e.target.value))
              }
              placeholder="Текст"
              className="mr-2"
            />
            <input
              type="text"
              value={link.url}
              onChange={(e) =>
                setProp((props: Link_002Props) => (props.links[index].url = e.target.value))
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

      <div>
        <label className={stylesSettings.settings_label}>Цвет фона</label>
        <input
          type="color"
          value={props.backgroundColor}
          onChange={(e) => setProp((props: Link_002Props) => (props.backgroundColor = e.target.value))}
        />
      </div>

      <div>
        <label className={stylesSettings.settings_label}>Цвет шрифта</label>
        <input
          type="color"
          value={props.fontColor}
          onChange={(e) => setProp((props: Link_002Props) => (props.fontColor = e.target.value))}
        />
      </div>

      <div>
        <label className={stylesSettings.settings_label}>Цвет обводки</label>
        <input
          type="color"
          value={props.borderColor}
          onChange={(e) => setProp((props: Link_002Props) => (props.borderColor = e.target.value))}
        />
      </div>

      <div>
        <label className={stylesSettings.settings_label}>Ширина обводки</label>
        <input
          type="number"
          min="0"
          value={props.borderWidth}
          onChange={(e) => setProp((props: Link_002Props) => (props.borderWidth = parseInt(e.target.value)))}
        />
      </div>

      <div>
        <label className={stylesSettings.settings_label}>Стиль обводки</label>
        <select
          value={props.borderStyle}
          onChange={(e) => setProp((props: Link_002Props) => (props.borderStyle = e.target.value as any))}
        >
          <option value="none">Нет</option>
          <option value="solid">Сплошной</option>
          <option value="dashed">Пунктир</option>
          <option value="dotted">Точки</option>
        </select>
      </div>
    </div>
  );
};

export const Link_002DefaultProps = {
  alignment: 'center' as const,
  links: [
    { text: 'Главная', url: '#' },
    { text: 'О нас', url: '#' },
    { text: 'Контакты', url: '#' },
    { text: 'Войти', url: '#' },
  ],
  backgroundColor: '#ffffff',
  fontColor: '#000000',
  borderColor: '#000000',
  borderWidth: 0,
  borderStyle: 'none' as const,
  logoUrl: '',
};

Link_002.craft = {
  props: Link_002DefaultProps,
  related: {
    settings: Link_002Settings,
  },
};