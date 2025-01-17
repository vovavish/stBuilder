import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import type { FC } from 'react';

type SiteSettingsUIProps = {
  site_name: string;
  setSiteName: Dispatch<SetStateAction<string>>;
  site_address: string;
  setSiteAddress: Dispatch<SetStateAction<string>>;

  isFormChanged: boolean;

  handleSubmit: (e: SyntheticEvent) => void;

  handleCancel: () => void;
};

export const SiteSettingsUI: FC<SiteSettingsUIProps> = ({
  site_name,
  setSiteName,
  site_address,
  setSiteAddress,
  handleSubmit,
  handleCancel,
  isFormChanged,
}) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Настройки сайта</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="siteName" className="block text-lg font-medium mb-2">
            Имя сайта
          </label>
          <input
            id="siteName"
            type="text"
            value={site_name}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter site name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="siteAddress" className="block text-lg font-medium mb-2">
            Название сайта на поддомене
          </label>
          <input
            id="siteAddress"
            type="text"
            value={site_address}
            onChange={(e) => setSiteAddress(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Enter site address"
          />
        </div>

        {isFormChanged && (
          <div className='flex gap-4'>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">
              Сохранить изменения
            </button>
            <button
              onClick={handleCancel}
              type='button'
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              Отмена
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
