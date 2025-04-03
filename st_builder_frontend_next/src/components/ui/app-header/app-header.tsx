"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./app-header.module.scss";
import { signOut, useSession } from "next-auth/react";
import ApiPublishedUserSitesController from "@/lib/ApiPublishUserSitesController";

export const AppHeaderUI: FC = () => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [siteAddress, setSiteAddress] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState("");

  // Проверяем, находимся ли на странице редактирования сайта
  const isEditSitePage = pathname?.startsWith("/sites/edit/");
  // Извлекаем ID сайта из URL
  const siteId = isEditSitePage ? pathname.split("/").pop() : null;

  const handlePublish = async () => {
    if (!siteId || !siteAddress) {
      setError("Пожалуйста, укажите имя сайта");
      return;
    }

    try {
      setIsPublishing(true);
      setError("");
      
      // Вызываем API для публикации
      await ApiPublishedUserSitesController.publishSite(Number(siteId), siteAddress);
      
      // Закрываем модальное окно и перенаправляем пользователя
      setIsPublishModalOpen(false);
      router.push("/sites"); // или куда вам нужно после публикации
    } catch (err) {
      setError("Ошибка при публикации сайта");
      console.error("Publish error:", err);
    } finally {
      setIsPublishing(false);
    }
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
            <h3>Опубликовать сайт</h3>
            <input
              type="text"
              value={siteAddress}
              onChange={(e) => setSiteAddress(e.target.value)}
              placeholder="Имя сайта"
              className={styles.input}
            />
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.modalActions}>
              <button
                onClick={() => setIsPublishModalOpen(false)}
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
          </div>
        </div>
      )}
    </header>
  );
};