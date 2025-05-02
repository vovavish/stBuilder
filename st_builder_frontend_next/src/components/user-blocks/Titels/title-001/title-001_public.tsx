import { Title_001Props } from './title-001';
import { renderSlateToReact } from '../../renderSlate';
import { Descendant } from 'slate';
import styles from './title-001_public.module.scss';

export const Title_001_public: React.FC<Title_001Props> = ({
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
  let parsedTitleText: Descendant[];
  let parsedContentText: Descendant[];

  try {
    parsedTitleText = typeof titleText === 'string' ? JSON.parse(titleText) : titleText;
  } catch {
    parsedTitleText = [{ type: 'heading', children: [{ text: '' }] }];
  }

  try {
    parsedContentText = typeof contentText === 'string' ? JSON.parse(contentText) : contentText;
  } catch {
    parsedContentText = [{ type: 'paragraph', children: [{ text: '' }] }];
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
    '--title-font-size-mobile': titleFontSize.mobile,
    '--title-font-size-tablet': titleFontSize.tablet,
    '--title-font-size-desktop': titleFontSize.desktop,
    '--text-font-size-mobile': textFontSize.mobile,
    '--text-font-size-tablet': textFontSize.tablet,
    '--text-font-size-desktop': textFontSize.desktop,
    '--gap-mobile': gap.mobile,
    '--gap-tablet': gap.tablet,
    '--gap-desktop': gap.desktop,
  } as React.CSSProperties;

  const titleStyles = {
    textAlign,
    color: titleColor,
    fontWeight: titleFontWeight,
    lineHeight: `${titleLineHeight}`,
    textDecoration: titleTextDecoration,
    fontStyle: titleFontStyle,
    margin: '0 auto',
    outline: 'none',
  };

  const textStyles = {
    textAlign,
    color: textColor,
    fontWeight: textFontWeight,
    lineHeight: `${textLineHeight}`,
    textDecoration: textTextDecoration,
    fontStyle: textFontStyle,
    margin: '0 auto',
    outline: 'none',
  };

  return (
    <section className={styles.textContainer} style={containerStyles}>
      {renderSlateToReact({ value: parsedTitleText, style: titleStyles })}
      {renderSlateToReact({ value: parsedContentText, style: textStyles })}
    </section>
  );
};