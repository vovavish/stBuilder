"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./app-header.module.scss";
import { signOut, useSession } from "next-auth/react";
import ApiPublishedUserSitesController from "@/lib/ApiPublishUserPagesController";
import { useStore } from "@/hooks/useStore";

export const AppHeaderUI: FC = () => {
  const session = useSession();
  const pathname = usePathname();
  const { userPagesStore, authStore } = useStore();
  
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isEditSitePage = pathname?.startsWith("/sites/edit/");
  const pageId = isEditSitePage ? pathname.split("/").pop() : null;

  const handlePublish = async () => {
    if (!pageId) {
      setError("Не удалось определить страницу для публикации");
      return;
    }

    try {
      setIsPublishing(true);
      setError("");
      
      const publishedPage = await ApiPublishedUserSitesController.publishPage(Number(pageId));
      await userPagesStore.getPageById(Number(pageId));
      
      if (!publishedPage || !publishedPage.page.userSite.site_address) {
        throw new Error("Не удалось получить данные сайта");
      }
      
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>St Builder</div>
        
        {/* Основное меню для десктопа */}
        <nav className={styles.desktopNav}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/sites" className={styles.link}>
            Мои сайты
          </Link>
          {isEditSitePage && (
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className={styles.button}
            >
              Опубликовать
            </button>
          )}
          {session.status === "authenticated" ? (
            <Link
              href="#"
              onClick={() => {
                  authStore.logout();
                  signOut({ callbackUrl: "/" })}
                }
              className={styles.link}
            >
              Выйти
            </Link>
          ) : <Link href="/login" className={styles.link}>Войти</Link>}
        </nav>
        
        {/* Кнопка бургер-меню для мобильных */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.menuIcon}></span>
        </button>
        
        {/* Мобильное меню (выпадающее) */}
        {isMobileMenuOpen && (
          <nav className={styles.mobileNav}>
            <Link href="/" className={styles.link} onClick={toggleMobileMenu}>
              Главная
            </Link>
            <Link href="/sites" className={styles.link} onClick={toggleMobileMenu}>
              Мои сайты
            </Link>
            {isEditSitePage && (
              <button
                onClick={() => {
                  setIsPublishModalOpen(true);
                  toggleMobileMenu();
                }}
                className={styles.button}
              >
                Опубликовать
              </button>
            )}
            {session.status === "authenticated" ? (
              <Link
                href="#"
                onClick={() => {
                  authStore.logout();
                  signOut({ callbackUrl: "/" });
                  toggleMobileMenu();
                }}
                className={styles.link}
              >
                Выйти
              </Link>
            ) : <Link href="/login" className={styles.link}>Войти</Link>}
          </nav>
        )}
      </div>

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