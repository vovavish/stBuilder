import React from 'react';

import { Gallery_001Props, GalleryImage } from './gallery-001';


export const Gallery_001_public: React.FC<Gallery_001Props> = ({ 
  image, 
  imageRatio, 
  borderRadius, 
  showCaption, 
  caption,
  width,
  height,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
}) => {
  return (
    <div
      style={{
        width: '100%',
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ maxWidth: '800px', width: '100%' }}>
        {image ? (
          <GalleryImage
            src={image}
            ratio={imageRatio}
            borderRadius={borderRadius}
            caption={caption}
            showCaption={showCaption}
            width={width}
            height={height}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            paddingLeft={paddingLeft}
            paddingRight={paddingRight}
          />
        ) : (
          <div style={{
            border: '2px dashed #ccc',
            padding: '40px',
            textAlign: 'center',
            borderRadius: '8px'
          }}>
            <p>Загрузите изображение</p>
          </div>
        )}
      </div>
    </div>
  );
};
