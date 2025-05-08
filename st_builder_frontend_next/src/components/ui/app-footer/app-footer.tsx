import { FC } from "react";

import styles from "./app-footer.module.scss";
import Link from "next/link";

export const AppFooterUI: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>&copy; Вишняков Владимир, ИДБ-21-12, Дипломная работа</p>
        <Link href="/terms" className={styles.link}>Пользовательское соглашение</Link>
      </div>
    </footer>
  );
};
