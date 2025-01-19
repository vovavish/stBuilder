import { API_URL } from "@/api";
import { UserLayoutResponse } from "@/types/response/UserLayoutResponse";
import { FC } from "react";
import { Link } from "react-router-dom";

type AdminHomeUIProps = {
  layouts: UserLayoutResponse[];
}

export const AdminHomeUI: FC<AdminHomeUIProps> = ({layouts}) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Админ панель</h1>
      
      <div className="mt-6">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Создать новый шаблон
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Список шаблонов</h2>
        <ul className="mt-4">
          {layouts.map((layout) => (
            <li key={layout.id} className="p-2 border-b">
              <Link className="flex items-center" to={`/admin/layout/${layout.id}`}>
                {layout.path_to_image && (
                  <img src={`${API_URL}${layout.path_to_image}`} alt={layout.name} className="w-16 h-16 object-cover mr-4" />
                )}
                <div>
                  <h3 className="font-semibold">{layout.name}</h3>
                  <p className="text-sm text-gray-600">{layout.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
