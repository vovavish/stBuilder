import { Text_001Props } from './text-001';

export const Text_001_public: React.FC<Text_001Props> = ({
  text,
  fontSize,
  textAlign,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  maxWidth,
  color,
  fontWeight,
  lineHeight,
  textDecoration,
  fontStyle,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  borderStyle,
}) => {
  return (
    <div
      style={{
        padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
        margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
        maxWidth: '100%',
      }}
    >
      {(text || 'Default Text')
        .replace(/<\/div><div>/g, '\n') // заменяем div на переносы строк
        .replace(/<div>/g, '')
        .replace(/<\/div>/g, '')
        .split('\n')
        .map((line, index) => (
          <p
            key={index}
            style={{
              fontSize: `${fontSize}px`,
              textAlign,
              maxWidth,
              color,
              fontWeight,
              lineHeight: `${lineHeight}`,
              textDecoration,
              fontStyle,
              margin: '0 auto',
            }}
          >
            {line}
          </p>
        ))}
    </div>
  );
};
