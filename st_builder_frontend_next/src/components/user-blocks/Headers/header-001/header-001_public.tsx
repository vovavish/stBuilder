import { Header_001Props } from "./header-001";

export const Header_001_public: React.FC<Header_001Props> = ({
  text_company_name = 'Company Name',
  text_company_slogan = 'Your Slogan Here',
  text_company_additional = 'Additional information',
  textColor = '#ffffff',
  textSize = 40,
  topTextMarginBottom = 0,
  bottomTextMarginTop = 0,
  backgroundColor = '#282c34',
  backgroundImage = '',
  backgroundOpacity = 1,
  backgroundPosition = 'center',
  overlayColor = '#000000',
  overlayOpacity = 0.3,
}) => {
  // Функция для очистки HTML и преобразования в строки с \n
  const parseText = (html: string) => {
    return html
      .replace(/<\/div><div>/g, '\n')
      .replace(/<div>/g, '')
      .replace(/<\/div>/g, '')
      .split('\n');
  };

  return (
    <header
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '80px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition,
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'overlay',
        color: textColor,
        textAlign: 'center',
        padding: '20px',
        position: 'relative',
        opacity: backgroundOpacity,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {parseText(text_company_name).map((line, i) => (
          <h1
            key={`name-${i}`}
            style={{
              fontSize: `${textSize}px`,
              fontWeight: 'bold',
              marginBottom: `${topTextMarginBottom}px`,
            }}
          >
            {line}
          </h1>
        ))}

        {parseText(text_company_slogan).map((line, i) => (
          <h2
            key={`slogan-${i}`}
            style={{
              fontSize: `${textSize * 0.75}px`,
              fontWeight: 'bold',
            }}
          >
            {line}
          </h2>
        ))}

        {parseText(text_company_additional).map((line, i) => (
          <p
            key={`additional-${i}`}
            style={{
              fontSize: `${textSize * 0.5}px`,
              marginTop: `${bottomTextMarginTop}px`,
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </header>
  );
};
