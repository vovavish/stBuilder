import { FC } from "react";
import styles from './home.module.scss';
import { Factory, Wrench, LineChart, Smartphone } from "lucide-react";

export const HomeUI: FC = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Создайте профессиональный сайт для вашего производства
          </h1>
          <p className={styles.heroSubtitle}>
            Конструктор сайтов с промышленной спецификой
          </p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryButton}>Начать создание</button>
            <button className={styles.secondaryButton}>Посмотреть примеры</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src="/production-facility.jpg" alt="Производственное предприятие" />
        </div>
      </section>

      {/* Преимущества */}
      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Почему выбирают наш конструктор</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <Factory className={styles.benefitIcon} />
            <h3>Специализированные шаблоны</h3>
            <p>Готовые решения для машиностроения, металлообработки и промышленного оборудования</p>
          </div>
          <div className={styles.benefitCard}>
            <Wrench  className={styles.benefitIcon} />
            <h3>Технический функционал</h3>
            <p>Чертежи, спецификации, 3D-модели и калькуляторы расчета стоимости</p>
          </div>
          <div className={styles.benefitCard}>
            <LineChart  className={styles.benefitIcon} />
            <h3>Интеграции с ERP/CRM</h3>
            <p>Подключение к 1С, SAP, ERP-системам и CRM для автоматизации продаж</p>
          </div>
        </div>
      </section>

      {/* Шаблоны */}
      <section className={styles.templates}>
        <h2 className={styles.sectionTitle}>Примеры шаблонов</h2>
        <div className={styles.templateGrid}>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={styles.templateCard}>
              <div className={styles.templateInfo}>
                <h3>Промышленный шаблон #{item}</h3>
                <button className={styles.templateButton}>Выбрать</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Функционал */}
      <section className={styles.features}>
        <div className={styles.featureText}>
          <h2 className={styles.sectionTitle}>Профессиональные инструменты</h2>
          <ul className={styles.featureList}>
            <li>Визуальный редактор с промышленными элементами</li>
            <li>SEO-оптимизация для технических терминов</li>
            <li>Мультиязычная поддержка</li>
            <li>API для интеграции с производственными системами</li>
          </ul>
        </div>
        <div className={styles.featureImage}>
          <Smartphone  className={styles.responsiveIllustration} />
        </div>
      </section>
    </div>
  );
};