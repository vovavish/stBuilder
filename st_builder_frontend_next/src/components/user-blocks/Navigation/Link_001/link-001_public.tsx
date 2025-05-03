import { Link_001Props } from './link-001';
import styles from './link-001_public.module.scss';

export const Link_001_public: React.FC<Link_001Props> = ({
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
  const containerStyles = {
    backgroundColor,
    textAlign,
    '--padding-mobile': `${padding.mobile.top} ${padding.mobile.right} ${padding.mobile.bottom} ${padding.mobile.left}`,
    '--padding-tablet': `${padding.tablet.top} ${padding.tablet.right} ${padding.tablet.bottom} ${padding.tablet.left}`,
    '--padding-desktop': `${padding.desktop.top} ${padding.desktop.right} ${padding.desktop.bottom} ${padding.desktop.left}`,
    '--margin-mobile': `${margin.mobile.top} ${margin.mobile.right} ${margin.mobile.bottom} ${margin.mobile.left}`,
    '--margin-tablet': `${margin.tablet.top} ${margin.tablet.right} ${margin.tablet.bottom} ${margin.tablet.left}`,
    '--margin-desktop': `${margin.desktop.top} ${margin.desktop.right} ${margin.desktop.bottom} ${margin.desktop.left}`,
    '--font-size-mobile': fontSize.mobile,
    '--font-size-tablet': fontSize.tablet,
    '--font-size-desktop': fontSize.desktop,
  } as React.CSSProperties;

  const linkStyles = {
    color,
    fontWeight,
    textDecoration,
    fontStyle,
    display: 'inline-block',
  };

  return (
    <div className={styles.linkContainer} style={containerStyles}>
      <a href={url} style={linkStyles}>
        {text}
      </a>
    </div>
  );
};