import { FC } from "react";

import { Link } from "react-router-dom";

export const AppHeaderUI: FC = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="text-2xl font-bold">
        St Builder
      </div>
      <nav className="space-x-4">
        <Link
          to="/"
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        >
          Главная
        </Link>
        <Link
          to="/sites"
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        >
          Мои сайты
        </Link>
        <Link
          to="/profile"
          className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        >
          Профиль
        </Link>
      </nav>
    </header>
  );
};
