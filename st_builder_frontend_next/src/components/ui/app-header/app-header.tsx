"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./app-header.module.scss";
import { signOut, useSession } from "next-auth/react";
import ApiPublishedUserSitesController from "@/lib/ApiPublishUserPagesController";
import { useStore } from "@/hooks/useStore";

export const AppHeaderUI: FC = () => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { userPagesStore } = useStore();
  
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");

  // Проверяем, находимся ли на странице редактирования сайта
  const isEditSitePage = pathname?.startsWith("/sites/edit/");
  // Извлекаем ID страницы из URL
  const pageId = isEditSitePage ? pathname.split("/").pop() : null;

  const handlePublish = async () => {
    if (!pageId) {
      setError("Не удалось определить страницу для публикации");
      return;
    }

    try {
      setIsPublishing(true);
      setError("");
      
      // Вызываем API для публикации
      const publishedPage = await ApiPublishedUserSitesController.publishPage(Number(pageId));
      
      // Обновляем данные в хранилище
      await userPagesStore.getPageById(Number(pageId));
      
      // Получаем данные о сайте для формирования URL
      if (!publishedPage || !publishedPage.page.userSite.site_address) {
        throw new Error("Не удалось получить данные сайта");
      }
      
      // Формируем URL опубликованной страницы
      const url = `${publishedPage.page.userSite.site_address}.stbuilder.ru/${publishedPage.page.page_slug}`;
      setPublishedUrl(url);
      
    } catch (err) {
      setError("Ошибка при публикации страницы");
      console.error("Publish error:", err);
    } finally {
      setIsPublishing(false);
    }
  };

  const closeModal = () => {
    setIsPublishModalOpen(false);
    setPublishedUrl("");
    setError("");
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>St Builder</div>
      <nav className={styles.nav}>
        <Link href="/" className={styles.link}>
          Главная
        </Link>
        <Link href="/sites" className={styles.link}>
          Мои сайты
        </Link>
        <Link href="/profile" className={styles.link}>
          Профиль
        </Link>
        {isEditSitePage && (
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className={styles.button}
          >
            Опубликовать
          </button>
        )}
        {session.status === "authenticated" && (
          <Link
            href="#"
            onClick={() => signOut({ callbackUrl: "/" })}
            className={styles.link}
          >
            Выйти
          </Link>
        )}
      </nav>

      {/* Модальное окно публикации */}
      {isPublishModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {publishedUrl ? (
              <>
                <h3>Страница опубликована!</h3>
                <div className={styles.publishedUrlContainer}>
                  <p>Адрес опубликованной страницы:</p>
                  <a 
                    href={`https://${publishedUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.publishedUrl}
                  >
                    {publishedUrl}
                  </a>
                </div>
                <button
                  onClick={closeModal}
                  className={styles.closeButton}
                >
                  Закрыть
                </button>
              </>
            ) : (
              <>
                <h3>Опубликовать страницу</h3>
                <p>Вы уверены, что хотите опубликовать эту страницу?</p>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.modalActions}>
                  <button
                    onClick={closeModal}
                    className={styles.cancelButton}
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className={styles.publishButton}
                  >
                    {isPublishing ? "Публикация..." : "Опубликовать"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};