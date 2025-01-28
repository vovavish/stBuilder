import { Dispatch, FC, SetStateAction, SyntheticEvent } from "react";
import { Link } from "react-router-dom";

import styles from './register.module.scss';

type RegisterUIProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;

  password: string;
  setPassword: Dispatch<SetStateAction<string>>;

  handleSubmit: (e: SyntheticEvent) => void;
};

export const RegisterUI: FC<RegisterUIProps> = ({
  email,
  setEmail,
  password,
  setPassword,
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};
