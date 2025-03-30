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
  console.log('Rendering Title_001 with:', { titleText, contentText });

  return (
    <section
      style={{
        backgroundColor,
        padding: `${padding}px`,
        textAlign: textAlign as any,
      }}
    >
      <h2
        style={{
          color: titleColor,
          fontSize: `${titleSize}px`,
          fontWeight: 'bold',
          marginBottom: '20px',
        }}
      >
        {titleText}
      </h2>
      <p
        style={{
          color: textColor,
          fontSize: `${textSize}px`,
          lineHeight: 1.6,
        }}
      >
        {contentText}
      </p>
    </section>
  );
};