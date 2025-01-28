import { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import type { FC } from 'react';

import styles from './site-settings.module.scss';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Настройки сайта</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="siteName" className={styles.label}>
            Имя сайта
          </label>
          <input
            id="siteName"
            type="text"
            value={site_name}
            onChange={(e) => setSiteName(e.target.value)}
            className={styles.input}
            placeholder="Enter site name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="siteAddress" className={styles.label}>
            Название сайта на поддомене
          </label>
          <input
            id="siteAddress"
            type="text"
            value={site_address}
            onChange={(e) => setSiteAddress(e.target.value)}
            className={styles.input}
            placeholder="Enter site address"
          />
        </div>

        {isFormChanged && (
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              Сохранить изменения
            </button>
            <button
              onClick={handleCancel}
              type='button'
              className={styles.button}
            >
              Отмена
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
