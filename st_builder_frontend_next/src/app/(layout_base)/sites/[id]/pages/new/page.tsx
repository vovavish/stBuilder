'use client';

import { useParams, useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import { useEffect, useState } from 'react';
import styles from './createPage.module.scss';
import Link from 'next/link';
import { Editor } from '@craftjs/core';
import { EditorPreviewer } from '@/components/editor-previewer';
import { UserLayoutByIdResponse, UserLayoutResponse } from '@/types/response/UserLayoutResponse';
import { API_URL } from '@/lib/api';
import { Preloader } from '@/components/ui/preloader';

import { Text_001 } from '@/components/user-blocks/Text/text-001/text-001';
import { Header_001 } from '@/components/user-blocks/Headers/header-001/header-001';
import { Title_001 } from '@/components/user-blocks/Titels/title-001/title-001';
import { Advantages_001 } from '@/components/user-blocks/Advantages/advantages-001/advantages-001';
import { Container } from '@/components/user-blocks/Container';
import { Model_3D_001 } from '@/components/user-blocks/3D-Models/3d-model-001/3d-model-001';
import { DXF_001 } from '@/components/user-blocks/CAD/DXF/dxf-001/dxf-001';
import { DXF_002 } from '@/components/user-blocks/CAD/DXF/dxf-002/dxf-002';
import { DXF_003 } from '@/components/user-blocks/CAD/DXF/dxf-003/dxf-003';
import { Gallery_001 } from '@/components/user-blocks/Gallery/gallery-001/gallery-001';
import axios from 'axios';
import { Header_002 } from '@/components/user-blocks/Headers/header-002/header-002';
import { Link_001 } from '@/components/user-blocks/Navigation/Link_001/link-001';
import { Link_002 } from '@/components/user-blocks/Navigation/Link_002/Link_002';

const CreatePage = observer(() => {
  const params = useParams();
  const router = useRouter();
  const siteId = params.id as string;
  const { userPagesStore, userSitesStore, userLayoutsStore } = useStore();

  const [formData, setFormData] = useState({
    page_name: '',
    page_slug: '',
    page_data: '{}' // Пустой JSON по умолчанию
  });
  const [selectedLayout, setSelectedLayout] = useState<UserLayoutByIdResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        await userSitesStore.getUserSiteById(siteId);
        await userLayoutsStore.getUserLayouts();
        await userLayoutsStore.getUserLayoutById(userLayoutsStore.userLayouts[0].id);
        setFormData(prev => ({
          ...prev,
          page_data: userLayoutsStore.userLayoutById?.layout_data || '{}'
        }));
        setSelectedLayout(userLayoutsStore.userLayoutById);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [siteId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectLayout = async (layout: UserLayoutResponse) => {
    await userLayoutsStore.getUserLayoutById(layout.id);
    setSelectedLayout(userLayoutsStore.userLayoutById);
    console.log('userLayoutsStore', userLayoutsStore.userLayoutById);
    setFormData(prev => ({
      ...prev,
      page_data: userLayoutsStore.userLayoutById?.layout_data || '{}'
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await userPagesStore.createPage(
        Number(siteId),
        formData.page_name,
        formData.page_slug || '',
        formData.page_data
      );
      
      router.push(`/sites/settings/${siteId}`);
    } catch (err) {
        if (axios.isAxiosError(err)) {
          const errorData = err.response?.data as { message?: string };
          
          if (errorData?.message) {
            setError(errorData.message);
          } else {
            setError('Ошибка при создании страницы. Пожалуйста, попробуйте снова.');
          }
        } else {
          setError('Ошибка при создании страницы. Пожалуйста, попробуйте снова.');
        }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !userSitesStore.userSiteById || userLayoutsStore.isLoading) {
    return <Preloader />;
  }

  if (!userSitesStore.userSiteById) {
    return <div>Сайт не найден</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Создание новой страницы</h1>
        <Link href={`/sites/settings/${siteId}`} className={styles.backLink}>
          ← Назад к настройкам
        </Link>
      </div>

      <div className={styles.content}>
        {/* Левая часть - предпросмотр выбранного шаблона */}
        <div className={styles.previewSection}>
          <h2 className={styles.sectionTitle}>Предпросмотр шаблона</h2>
          {selectedLayout ? (
            <div className={styles.editorWrapper}>
              <Editor resolver={{
                Text_001, Header_001, Header_002, Title_001, Advantages_001, 
                Model_3D_001, Container, DXF_001, DXF_002, DXF_003, Gallery_001, Link_001, Link_002,
              }}>
                <EditorPreviewer jsonData={selectedLayout.layout_data} />
              </Editor>
            </div>
          ) : (
            <div className={styles.emptyPreview}>
              Выберите шаблон справа для предпросмотра
            </div>
          )}
        </div>

        {/* Правая часть - форма и список шаблонов */}
        <div className={styles.formSection}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.formGroup}>
              <label htmlFor="page_name" className={styles.label}>
                Название страницы
              </label>
              <input
                type="text"
                id="page_name"
                name="page_name"
                value={formData.page_name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Главная страница"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="page_slug" className={styles.label}>
                URL страницы (slug)
              </label>
              <div className={styles.slugContainer}>
                <span className={styles.slugPrefix}>
                  {userSitesStore.userSiteById?.site_address}.stbuilder.ru/
                </span>
                <input
                  type="text"
                  id="page_slug"
                  name="page_slug"
                  value={formData.page_slug}
                  onChange={handleChange}
                  className={`${styles.input} ${styles.slugInput}`}
                  placeholder="home"
                  pattern="[a-z0-9-]+"
                  title="Только латинские буквы в нижнем регистре, цифры и дефисы"
                />
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Выберите шаблон</h2>
            <div className={styles.templatesGrid}>
              {userLayoutsStore.userLayouts.map((layout) => (
                <div
                  key={layout.id}
                  className={`${styles.templateCard} ${
                    selectedLayout?.id === layout.id ? styles.selected : ''
                  }`}
                  onClick={() => handleSelectLayout(layout)}
                >
                  <h3 className={styles.templateName}>{layout.name}</h3>
                  <img
                    src={`${API_URL}/${layout.path_to_image}` || '/default-template.jpg'}
                    alt={layout.name}
                    className={styles.templateImage}
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading || !selectedLayout}
            >
              {isLoading ? 'Создание...' : 'Создать страницу'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default CreatePage;