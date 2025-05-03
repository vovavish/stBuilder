'use client';
import React, { FC } from 'react';
import { DXFRenderer } from '../dxf-001/dxf-001';
import { DXF_001Props } from '../dxf-001/dxf-001';
import styles from './dxf-001_public.module.scss';

export const DXF_001_public: FC<DXF_001Props> = ({
  dxfUrl,
  backgroundColor,
  width,
  height,
  padding,
  margin,
}) => {
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
  } as React.CSSProperties;

  return (
    <div className={styles.dxfContainer} style={containerStyle}>
      <DXFRenderer url={dxfUrl} isMobile={false} />
    </div>
  );
};