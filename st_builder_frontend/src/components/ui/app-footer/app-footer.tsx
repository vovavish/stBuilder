import { FC } from "react";

import styles from "./app-footer.module.scss";

export const AppFooterUI: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>&copy; Вишняков Владимир, ИДБ-21-12, Дипломная работа</p>
        <nav className={styles.nav}>
          <a href="/privacy" className={styles.link}>
            Политика конфиденциальности
          </a>
          <a href="/terms" className={styles.link}>
            Условия использования
          </a>
          <a href="/contact" className={styles.link}>
            Контакты
          </a>
        </nav>
      </div>
    </footer>
  );
};
