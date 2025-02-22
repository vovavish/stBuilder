import { FC } from 'react';
import { UserLayoutByIdResponse, UserLayoutResponse } from '@/types/response/UserLayoutResponse';
import Link from 'next/link';

import styles from './admin-layout.module.scss';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Редактированиe шаблона</h1>

      <div className={styles.fieldContainer}>
        <label className={styles.label}>Имя шаблона</label>
        <input
          type="text"
          value={layoutFormData.name}
          onChange={(e) => setLayoutFormData({ ...layoutFormData, name: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.fieldContainer}>
        <label className={styles.label}>Описание</label>
        <textarea
          value={layoutFormData.description}
          onChange={(e) => setLayoutFormData({ ...layoutFormData, description: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.fieldContainer}>
        <label className={styles.label}>Путь к изображению</label>
        <input
          type="text"
          value={layoutFormData.path_to_image}
          onChange={(e) => setLayoutFormData({ ...layoutFormData, path_to_image: e.target.value })}
          className={styles.input}
        />
      </div>

      <div className={styles.buttonGroup}>
        <Link href={`/admin/layout/edit/${layout.id}`} className={styles.editButton}>Редактировать дизайн</Link>
        <button
          onClick={() => onLayoutSave(layoutFormData)}
          className={styles.saveButton}
        >
          Сохранить изменения
        </button>
      </div>
    </div>
  );
};
