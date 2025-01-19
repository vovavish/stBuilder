import { UserSiteResponse } from "@/types/response/UserSiteResponse";
import { FC, SyntheticEvent } from "react"; 

import { Link } from "react-router-dom";

type SitesListUIProps = {
  sitesList: UserSiteResponse[];
  onEditSiteClick: (e: SyntheticEvent, siteId: string) => void;
}

export const SitesListUI: FC<SitesListUIProps> = ({ sitesList, onEditSiteClick}) => {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-8">Ваши сайты</h1>
      <Link
        to='/sites/choose-layout'
        className="mb-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Создать новый сайт
      </Link>
      {sitesList.length === 0 ? (
        <p className="text-gray-600">У вас пока нет созданных сайтов.</p>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitesList.map((site) => (
            <Link
              to={`/sites/settings/${site.id}`}
              key={site.id}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold mb-2">{site.site_name}</h2>
              {site.site_address && (
                <p className="text-gray-700">Адрес: {site.site_address}</p>
              )}
              <button
                onClick={(e: SyntheticEvent) => onEditSiteClick(e, site.id)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Редактировать сайт
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
