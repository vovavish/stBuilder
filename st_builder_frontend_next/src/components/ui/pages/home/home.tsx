import { FC } from 'react';
import styles from './home.module.scss';
import { Factory, Wrench, LineChart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const HomeUI: FC = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Создайте профессиональный сайт для вашего производства
          </h1>
          <p className={styles.heroSubtitle}>Конструктор сайтов с промышленной спецификой</p>
          <div className={styles.heroButtons}>
            <Link href="/sites" className={styles.primaryButton}>
              Начать создание
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            src="/assets/production-facility.jpg"
            alt="Производственное предприятие"
            width={300}
            height={300}
          />
        </div>
      </section>

      {/* Преимущества */}
      <section className={styles.benefits}>
        <h2 className={styles.sectionTitle}>Почему выбирают наш конструктор</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <Factory className={styles.benefitIcon} />
            <h3 className={styles.benefitCardTitle}>Специализированные шаблоны</h3>
            <p>Готовые решения для машиностроения, металлообработки и промышленного оборудования</p>
          </div>
          <div className={styles.benefitCard}>
            <Wrench className={styles.benefitIcon} />
            <h3 className={styles.benefitCardTitle}>Технический функционал</h3>
            <p>Чертежи, 3D-модели и калькуляторы расчета стоимости</p>
          </div>
          <div className={styles.benefitCard}>
            <LineChart className={styles.benefitIcon} />
            <h3 className={styles.benefitCardTitle}>Интеграции с ERP/CRM</h3>
            <p>Подключение к 1С, SAP, ERP-системам и CRM для автоматизации продаж</p>
          </div>
        </div>
      </section>
    </div>
  );
};
