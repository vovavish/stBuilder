import { FC, FormEventHandler } from "react";
import Link from "next/link";
import styles from './login.module.scss';

type LoginUIProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  error?: string | null;
};

export const LoginUI: FC<LoginUIProps> = ({
  handleSubmit,
  error,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Вход</h2>
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}
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
            Войти
          </button>
        </form>

        <p className={styles.footerText}>
          Вы здесь впервые?{" "}
          <Link href="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};