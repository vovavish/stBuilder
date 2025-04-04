'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useStore } from '@/hooks/useStore';
import styles from './sites-settings.module.scss';

const SiteSettings = observer(() => {
  const params = useParams();
  const siteId = params.id as string;

  const { userSitesStore, userPagesStore } = useStore();

  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await userSitesStore.getUserSiteById(siteId);
        await userPagesStore.getPages(Number(siteId));
        
        if (userSitesStore.userSiteById) {
          setSiteName(userSitesStore.userSiteById.site_name);
          setSiteAddress(userSitesStore.userSiteById.site_address!);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [siteId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userSitesStore.updateSiteById(siteId, siteName, siteAddress);
    } catch (error) {
      console.error('Ошибка при обновлении сайта:', error);
    }
  };

  if (isLoading) {
    return <div className={styles.loadingMessage}>Загрузка...</div>;
  }

  if (!userSitesStore.userSiteById) {
    return <div className={styles.errorMessage}>Сайт не найден</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Настройки сайта</h1>
      
      <div className={styles.content}>
        {/* Форма редактирования сайта */}
        <div className={styles.settingsSection}>
          <h2 className={styles.sectionTitle}>Основные настройки</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Название сайта</label>
              <input
                type="text"
                className={styles.input}
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="Введите название сайта"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Адрес сайта</label>
              <div className={styles.addressInputContainer}>
                <input
                  type="text"
                  className={styles.input}
                  value={siteAddress}
                  onChange={(e) => setSiteAddress(e.target.value)}
                  placeholder="Введите адрес сайта"
                  required
                />
                <span className={styles.addressSuffix}>.stbuilder.ru</span>
              </div>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Сохранить изменения
            </button>
          </form>
        </div>
        
        {/* Список страниц сайта */}
        <div className={styles.pagesSection}>
          <h2 className={styles.sectionTitle}>Страницы сайта</h2>
          
          {userPagesStore.userPages.length === 0 ? (
            <p className={styles.emptyMessage}>У этого сайта пока нет страниц</p>
          ) : (
            <ul className={styles.pagesList}>
              {userPagesStore.userPages.map((page) => (
                <li key={page.id} className={styles.pageItem}>
                  <div className={styles.pageContent}>
                    <div className={styles.pageInfo}>
                      <h3 className={styles.pageName}>{page.page_name}</h3>
                      <p className={styles.pageMeta}>
                        {page.page_slug} • {new Date(page.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={styles.pageActions}>
                      {page.publishedPages &&
                        <Link 
                        href={`http://${siteAddress}.stbuilder.ru/${page.page_slug}`} 
                        target="_blank"
                        className={styles.pageLink}
                        >
                          Перейти
                        </Link>
                      }
                      <Link 
                        href={`/sites/edit/${page.id}`} 
                        target="_blank"
                        className={styles.pageLink}
                      >
                        Редактировать
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          <Link 
            href={`/sites/${siteId}/pages/new`} 
            className={styles.createPageButton}
          >
            Создать новую страницу
          </Link>
        </div>
      </div>
    </div>
  );
});

export default SiteSettings;