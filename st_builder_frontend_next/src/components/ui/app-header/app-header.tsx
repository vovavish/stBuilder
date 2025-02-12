"use client";

import { FC } from "react";
import Link from "next/link";

import styles from "./app-header.module.scss";
import { signOut, useSession } from "next-auth/react";

export const AppHeaderUI: FC = () => {
  const session = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        St Builder
      </div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Главная
        </Link>
        <Link href="/sites" className={styles.link}>
          Мои сайты
        </Link>
        <Link href="/profile" className={styles.link}>
          Профиль
        </Link>
        {session.status === "authenticated" && <Link href="#" onClick={() => signOut({callbackUrl: "/"})} className={styles.link}>
          Выйти
        </Link>}
      </nav>
    </header>
  );
};