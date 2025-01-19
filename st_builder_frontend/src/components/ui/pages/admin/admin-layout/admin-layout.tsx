import { FC } from 'react';
import { UserLayoutByIdResponse, UserLayoutResponse } from '@/types/response/UserLayoutResponse';
import { Link } from 'react-router-dom';

type AdminLayoutUIProps = {
  layout: UserLayoutByIdResponse;
  layoutFormData: UserLayoutResponse;
  setLayoutFormData: (updatedData: UserLayoutResponse) => void;
  onLayoutSave: (updatedLayout: UserLayoutResponse) => void;
};

export const AdminLayoutUI: FC<AdminLayoutUIProps> = ({
  layout,
  layoutFormData,
  setLayoutFormData,
  onLayoutSave,
}) => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Редактированиe шаблона</h1>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Имя шаблона</label>
        <input
          type="text"
          value={layoutFormData.name}
          onChange={(e) => setLayoutFormData({ ...layoutFormData, name: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Описание</label>
        <textarea
          value={layoutFormData.description}
          onChange={(e) => setLayoutFormData({ ...layoutFormData, description: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Путь к изображению</label>
        <input
          type="text"
          value={layoutFormData.path_to_image}
          onChange={(e) => setLayoutFormData({ ...layoutFormData, path_to_image: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div className="flex justify-between">
        <Link to={`/admin/layout/edit/${layout.id}`} className="bg-blue-500 text-white px-4 py-2 rounded">Редактировать дизайн</Link>
        <button
          onClick={() => onLayoutSave(layoutFormData)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};
