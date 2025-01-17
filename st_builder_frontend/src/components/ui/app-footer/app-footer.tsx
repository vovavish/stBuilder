import { FC } from "react";

export const AppFooterUI: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-6 mt-auto">
      <div className="flex justify-between items-center">
        <p className="text-sm">&copy; Вишняков Владимир, ИДБ-21-12, Дипломная работа</p>
        <nav className="space-x-4">
          <a
            href="/privacy"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Политика конфиденциальности
          </a>
          <a
            href="/terms"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Условия использования
          </a>
          <a
            href="/contact"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Контакты
          </a>
        </nav>
      </div>
    </footer>
  );
};