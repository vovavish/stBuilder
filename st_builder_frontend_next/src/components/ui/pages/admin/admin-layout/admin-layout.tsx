import { FC } from 'react';
import {
  UserLayoutByIdAdminResponse,
} from '@/types/response/UserLayoutResponse';
import Link from 'next/link';
import { api, API_URL } from '@/lib/api';
import styles from './admin-layout.module.scss';
import Image from 'next/image';

type AdminLayoutUIProps = {
  layout: UserLayoutByIdAdminResponse;
  layoutFormData: UserLayoutByIdAdminResponse;
  setLayoutFormData: (updatedData: UserLayoutByIdAdminResponse) => void;
  onLayoutSave: (updatedLayout: UserLayoutByIdAdminResponse) => void;
};

export const AdminLayoutUI: FC<AdminLayoutUIProps> = ({
  layout,
  layoutFormData,
  setLayoutFormData,
  onLayoutSave,
}) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const uploadedImageUrl = response.data.filePath;

        setLayoutFormData({
          ...layoutFormData,
          path_to_image: uploadedImageUrl,
        });

        console.log('Image uploaded successfully, URL:', uploadedImageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
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
            className={styles.textarea}
          />
        </div>

        <div className={styles.fieldContainer}>
          <label className={styles.label}>Изображение</label>
          <div className={styles.imageUploadContainer}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.fileInput}
              id="layout-image-upload"
            />
            <label htmlFor="layout-image-upload" className={styles.uploadButton}>
              Загрузить изображение
            </label>
            {layoutFormData.path_to_image && (
              <div className={styles.imagePreview}>
                <span>Текущее изображение:</span>
                <Image
                  src={`${API_URL}/${layoutFormData.path_to_image}`}
                  alt="Preview"
                  width={200}
                  height={200}
                  className={styles.previewImage}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.fieldContainer}>
          <label className={styles.label}>Опубликован?</label>
          <select
            value={layoutFormData.isPublished ? 'true' : 'false'}
            onChange={(e) =>
              setLayoutFormData({
                ...layoutFormData,
                isPublished: e.target.value === 'true',
              })
            }
            className={styles.input}
          >
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <Link href={`/admin/layout/edit/${layout.id}`} className={styles.editButton}>
            Редактировать дизайн
          </Link>
          <button onClick={() => onLayoutSave(layoutFormData)} className={styles.saveButton}>
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  );
};
