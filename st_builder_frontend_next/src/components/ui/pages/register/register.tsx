import { FC, FormEventHandler } from "react";
import Link from "next/link";
import styles from './register.module.scss';

type RegisterUIProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  error?: string | null;
};

export const RegisterUI: FC<RegisterUIProps> = ({
  handleSubmit,
  error,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Регистрация</h2>
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
            Зарегистрироваться
          </button>
        </form>

        <p className={styles.footerText}>
          Вы уже зарегистрированы?{" "}
          <Link href="/login" className={styles.link}>
            Войти
          </Link>
        </p>
        <p className={styles.footerText}>При регистрации вы соглашаетесь с <Link href="/terms" className={styles.link}>пользовательским соглашением</Link></p>
      </div>
    </div>
  );
};