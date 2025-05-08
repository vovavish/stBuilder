'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import styles from './create-site.module.scss';
import axios from 'axios';

const CreateSite = observer(() => {
  const router = useRouter();
  const { userSitesStore } = useStore();

  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
  
    try {
      await userSitesStore.createSite(siteName, siteAddress);
      setSuccess('Сайт успешно создан! Перенаправляем...');
      
      setTimeout(() => {
        router.push('/sites');
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Типизируем data как объект с возможным полем message
        const errorData = err.response?.data as { message?: string };
        
        if (errorData?.message) {
          setError(errorData.message);
        } else {
          setError('Ошибка при создании сайта. Пожалуйста, попробуйте снова.');
        }
      } else {
        setError('Ошибка при создании сайта. Пожалуйста, попробуйте снова.');
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Создание нового сайта</h1>
      
      <div className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Основные параметры</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Название сайта</label>
            <input
              type="text"
              className={styles.input}
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Мой новый сайт"
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
                placeholder="my-site"
                required
                pattern="[a-z0-9-]+"
                title="Только латинские буквы в нижнем регистре, цифры и дефисы"
              />
              <span className={styles.addressSuffix}>.stbuilder.ru</span>
            </div>
          </div>
          
          {error && <div className={styles.errorMessage}>{error}</div>}
          {success && <div className={styles.successMessage}>{success}</div>}
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Создание...' : 'Создать сайт'}
          </button>
        </form>
      </div>
    </div>
  );
});

export default CreateSite;