import Image from 'next/image';
import { Link_002Props } from './Link_002';
import styles from './Link_002_public.module.scss';

export const Link_002_public: React.FC<Link_002Props> = ({
  alignment,
  links,
  backgroundColor,
  fontColor,
  borderColor,
  borderWidth,
  borderStyle,
  logoUrl,
}) => {
  return (
    <nav
      className={styles.nav}
      style={{
        backgroundColor,
        color: fontColor,
        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
        justifyContent: alignment === 'center' ? 'center' : alignment === 'left' ? 'flex-start' : alignment === 'space-beetwen' ? 'space-between' : 'flex-end',
      }}
    >
      {logoUrl && <Image src={logoUrl} alt="Logo" className={styles.logo} width={64} height={64}/>}
      <ul className={styles.menu}>
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} style={{ color: fontColor }}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};