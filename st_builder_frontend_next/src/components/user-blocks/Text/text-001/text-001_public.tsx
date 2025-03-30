import { Text_001Props } from './text-001';

export const Text_001_public: React.FC<Text_001Props> = ({
  text,
  fontSize,
  textAlign,
  paggingY = 0,
  maxWidth = 400,
}) => {
  return (
    <p
      style={{
        fontSize: `${fontSize}px`,
        textAlign,
        padding: `${paggingY}px 0`,
        maxWidth: `${maxWidth}px`,
        margin: '0 auto',
      }}
    >
      {text || 'Default Text'}
    </p>
  );
};
