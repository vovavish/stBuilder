import { Advantages_001Props } from './advantages-001';
import { renderSlateToReact } from '../../renderSlate';
import { Descendant } from 'slate';
import styles from './advantages-001_public.module.scss';

export const Advantages_001_public: React.FC<Advantages_001Props> = ({
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
  let parsedTitle: Descendant[];
  let parsedDescription: Descendant[];
  let parsedAdvantages: Descendant[][];

  try {
    parsedTitle = typeof title === 'string' ? JSON.parse(title) : title;
  } catch {
    parsedTitle = [{ type: 'heading', children: [{ text: '' }] }];
  }

  try {
    parsedDescription = typeof description === 'string' ? JSON.parse(description) : description;
  } catch {
    parsedDescription = [{ type: 'paragraph', children: [{ text: '' }] }];
  }

  try {
    parsedAdvantages = advantages.map((advantage) =>
      typeof advantage === 'string' ? JSON.parse(advantage) : advantage
    );
  } catch {
    parsedAdvantages = advantages.map(() => [{ type: 'paragraph', children: [{ text: '' }] }]);
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
    '--title-font-size-mobile': titleSize.mobile,
    '--title-font-size-tablet': titleSize.tablet,
    '--title-font-size-desktop': titleSize.desktop,
    '--text-font-size-mobile': textSize.mobile,
    '--text-font-size-tablet': textSize.tablet,
    '--text-font-size-desktop': textSize.desktop,
    '--gap-mobile': gap.mobile,
    '--gap-tablet': gap.tablet,
    '--gap-desktop': gap.desktop,
  } as React.CSSProperties;

  const titleStyles = {
    textAlign,
    color: titleColor,
    fontWeight: titleFontWeight,
    lineHeight: `${lineHeight}`,
    textDecoration,
    fontStyle,
    margin: '0 auto',
    outline: 'none',
  };

  const textStyles = {
    textAlign,
    color: textColor,
    fontWeight,
    lineHeight: `${lineHeight}`,
    textDecoration,
    fontStyle,
    margin: '0 auto',
    outline: 'none',
  };

  const listStyles = {
    color: textColor,
    fontWeight,
    lineHeight: `${lineHeight}`,
    textDecoration,
    fontStyle,
    listStyleType: listStyle,
    paddingLeft: listStyle === 'none' ? '0' : '20px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: textAlign === 'center' || textAlign === 'justify' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
    gap: '20px',
    margin: '0 auto',
    textAlign,
  };

  return (
    <section className={styles.advantagesContainer} style={containerStyles}>
      {renderSlateToReact({
        value: parsedTitle,
        style: titleStyles,
      })}
      {renderSlateToReact({
        value: parsedDescription,
        style: textStyles,
      })}
      <ul style={listStyles}>
        {parsedAdvantages.map((advantage, index) => (
          <li key={index}>
            {renderSlateToReact({
              value: advantage,
              style: { outline: 'none' },
            })}
          </li>
        ))}
      </ul>
    </section>
  );
};