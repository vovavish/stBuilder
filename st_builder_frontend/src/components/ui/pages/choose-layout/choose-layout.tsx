import { FC } from "react";
import { UserLayoutResponse } from "@/types/response/UserLayoutResponse";

import { API_URL } from "@/api";
import { Link } from "react-router-dom";

type ChooseLayoutUIProps = {
  layoutsList: UserLayoutResponse[];
};

export const ChooseLayoutUI: FC<ChooseLayoutUIProps> = ({ layoutsList }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Выберите шаблон для вашего сайта
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {layoutsList.map((layout) => (
          <Link
            key={layout.id}
            to={`/sites/choose-layout/${layout.id}`}
            className="border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer p-4 bg-white"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {layout.name}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {layout.description || "Краткое описание шаблона можно добавить здесь."}
            </p>
            <img
              src={`${API_URL}${layout.path_to_image}` || "/path/to/default-image.jpg"}
              alt={layout.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
