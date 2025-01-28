import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./app-header.module.scss";

export const AppHeaderUI: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        St Builder
      </div>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Главная
        </Link>
        <Link to="/sites" className={styles.link}>
          Мои сайты
        </Link>
        <Link to="/profile" className={styles.link}>
          Профиль
        </Link>
      </nav>
    </header>
  );
};