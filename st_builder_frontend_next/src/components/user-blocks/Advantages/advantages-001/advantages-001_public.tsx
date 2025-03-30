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
  console.log('Rendering Advantages_001 with:', { title, description, advantages });

  return (
    <section
      style={{
        backgroundColor,
        padding: `${padding}px`,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2
          style={{
            color: titleColor,
            fontSize: `${titleSize}px`,
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            color: textColor,
            fontSize: `${textSize}px`,
            lineHeight: 1.6,
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          {description}
        </p>
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
            {advantages.map((advantage, index) => (
              <li key={index}>{advantage}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};