import { Advantages_001Props } from "./advantages-001";

export const Advantages_001_public: React.FC<Advantages_001Props> = ({
  title = 'Преимущества',
  description = 'Узнайте, почему стоит выбрать именно нас',
  advantages = [
    'Высокое качество услуг',
    'Профессиональная команда',
    'Индивидуальный подход',
  ],
  titleColor = '#000000',
  textColor = '#333333',
  titleSize = 36,
  textSize = 16,
  backgroundColor = '#f8f8f8',
  padding = 40,
  listStyle = 'disc',
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
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Заголовок */}
        {parseText(title).map((line, i) => (
          <h2
            key={`title-${i}`}
            style={{
              color: titleColor,
              fontSize: `${titleSize}px`,
              fontWeight: 'bold',
              marginBottom: i === 0 ? '20px' : '0',
              textAlign: 'center',
            }}
          >
            {line}
          </h2>
        ))}

        {/* Описание */}
        {parseText(description).map((line, i) => (
          <p
            key={`desc-${i}`}
            style={{
              color: textColor,
              fontSize: `${textSize}px`,
              lineHeight: 1.6,
              marginBottom: i === 0 ? '30px' : '0',
              textAlign: 'center',
            }}
          >
            {line}
          </p>
        ))}

        {/* Список преимуществ */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ul
            style={{
              color: textColor,
              fontSize: `${textSize}px`,
              listStyleType: listStyle,
              paddingLeft: listStyle === 'none' ? '0' : '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              gap: '20px',
            }}
          >
            {advantages.map((item, index) =>
              parseText(item).map((line, subIndex) => (
                <li key={`adv-${index}-${subIndex}`}>{line}</li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};
