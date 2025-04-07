import { FC } from "react";
import { Title_001Props } from "./title-001";

export const Title_001_public: FC<Title_001Props> = ({
  titleText = 'Your Title Here',
  contentText = 'Your content text goes here. Add some description or information.',
  titleColor = '#000000',
  textColor = '#333333',
  titleSize = 36,
  textSize = 16,
  backgroundColor = 'transparent',
  padding = 20,
  textAlign = 'center',
}) => {
  const parseText = (html: string) => {
    return html
      .replace(/<\/div><div>/g, '\n')
      .replace(/<div>/g, '')
      .replace(/<\/div>/g, '')
      .split('\n');
  };

  return (
    <section
      style={{
        backgroundColor,
        padding: `${padding}px`,
        textAlign: textAlign as any,
      }}
    >
      {parseText(titleText).map((line, index) => (
        <h2
          key={`title-${index}`}
          style={{
            color: titleColor,
            fontSize: `${titleSize}px`,
            fontWeight: 'bold',
            marginBottom: index === 0 ? '20px' : '0',
          }}
        >
          {line}
        </h2>
      ))}
      {parseText(contentText).map((line, index) => (
        <p
          key={`content-${index}`}
          style={{
            color: textColor,
            fontSize: `${textSize}px`,
            lineHeight: 1.6,
            marginBottom: '10px',
          }}
        >
          {line}
        </p>
      ))}
    </section>
  );
};
