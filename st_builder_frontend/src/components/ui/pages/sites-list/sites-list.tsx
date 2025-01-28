import { UserSiteResponse } from "@/types/response/UserSiteResponse";
import { FC, SyntheticEvent } from "react"; 
import { Link } from "react-router-dom";

import styles from './sites-list.module.scss';

type SitesListUIProps = {
  sitesList: UserSiteResponse[];
  onEditSiteClick: (e: SyntheticEvent, siteId: string) => void;
}

export const SitesListUI: FC<SitesListUIProps> = ({ sitesList, onEditSiteClick }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ваши сайты</h1>
      <Link
        to='/sites/choose-layout'
        className={styles.createButton}
      >
        Создать новый сайт
      </Link>
      {sitesList.length === 0 ? (
        <p className={styles.noSitesMessage}>У вас пока нет созданных сайтов.</p>
      ) : (
        <div className={styles.siteGrid}>
          {sitesList.map((site) => (
            <Link
              to={`/sites/settings/${site.id}`}
              key={site.id}
              className={styles.siteCard}
            >
              <h2 className={styles.siteTitle}>{site.site_name}</h2>
              {site.site_address && (
                <p className={styles.siteAddress}>Адрес: {site.site_address}</p>
              )}
              <button
                onClick={(e: SyntheticEvent) => onEditSiteClick(e, site.id)}
                className={styles.editButton}
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
