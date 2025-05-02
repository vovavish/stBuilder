import { Text_001Props } from './text-001';
import { renderSlateToReact } from '../../renderSlate';
import { Descendant } from 'slate';
import styles from './text-001_public.module.scss';

export const Text_001_public: React.FC<Text_001Props> = ({
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
  let parsedText: Descendant[];

  try {
    parsedText = typeof text === 'string' ? JSON.parse(text) : text;
  } catch {
    parsedText = [{ type: 'paragraph', children: [{ text: '' }] }];
  }

  const containerStyles = {
    backgroundColor,
    maxWidth: '100%',
    '--max-width': maxWidth,
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

  const textStyles = {
    textAlign,
    color,
    fontWeight,
    lineHeight: `${lineHeight}`,
    textDecoration,
    fontStyle,
    margin: '0 auto',
    outline: 'none',
  };

  return (
    <div className={styles.textContainer} style={containerStyles}>
      {renderSlateToReact({ value: parsedText, style: textStyles })}
    </div>
  );
};