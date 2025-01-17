import { Dispatch, FC, SetStateAction, SyntheticEvent } from "react";

import { Link } from "react-router-dom";

type LoginUIProps = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;

  password: string;
  setPassword: Dispatch<SetStateAction<string>>;

  handleSubmit: (e: SyntheticEvent) => void;
};

export const LoginUI: FC<LoginUIProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Почта
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Введите почту"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Введите пароль"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Войти
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Вы здесь впервые? <Link to="/register" className="text-blue-500 hover:underline">Зарегестрироваться</Link>
        </p>
      </div>
    </div>
  );
};
