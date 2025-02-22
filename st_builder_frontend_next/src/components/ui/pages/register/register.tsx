import { FC, FormEventHandler } from "react";
import Link from "next/link";

import styles from './register.module.scss';

type RegisterUIProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

export const RegisterUI: FC<RegisterUIProps> = ({
  handleSubmit,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Регистрация</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={styles.formField}>
            <label htmlFor="email" className={styles.label}>
              Почта
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className={styles.input}
              placeholder="Введите почту"
              required
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="password" className={styles.label}>
              Пароль
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className={styles.input}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Зарегестрироваться
          </button>
        </form>

        <p className={styles.footerText}>
          Вы уже зарегестрированы?{" "}
          <Link href="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
