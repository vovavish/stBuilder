'use client';
import React, { FC } from 'react';
import { useMediaQuery } from 'react-responsive';
import { DXFRenderer } from '../dxf-001/dxf-001';
import { renderSlateToReact } from '../../../renderSlate';
import { Descendant } from 'slate';
import styles from './dxf-003_public.module.scss';
import { DXF_002Props } from '../dxf-002/dxf-002';

export const DXF_003_public: FC<DXF_002Props> = ({
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
  const isMobile = useMediaQuery({ maxWidth: 480 });

  let parsedText: Descendant[];
  try {
    parsedText = JSON.parse(text);
  } catch {
    parsedText = [{ type: 'paragraph', children: [{ text: '' }] }];
  }

  const containerStyle = {
    backgroundColor,
    '--width-mobile': width.mobile,
    '--width-tablet': width.tablet,
    '--width-desktop': width.desktop,
    '--height-mobile': height.mobile,
    '--height-tablet': height.tablet,
    '--height-desktop': height.desktop,
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
    color: textColor,
    fontWeight,
    lineHeight: `${lineHeight}`,
    textDecoration,
    fontStyle,
    maxWidth: textMaxWidth,
    margin: '0 auto',
  };

  return (
    <div className={styles.dxfContainer} style={containerStyle}>
      <div className={styles.dxfWrapper}>
        <DXFRenderer url={dxfUrl} isMobile={isMobile} />
      </div>
      <div className={styles.textWrapper} style={{ backgroundColor: textBackgroundColor }}>
        <div className={styles.textContent}>
          {renderSlateToReact({ value: parsedText, style: textStyles })}
        </div>
      </div>
    </div>
  );
};