import { API_URL } from "@/lib/api";
import { UserLayoutForAdminResponse } from "@/types/response/UserLayoutResponse";
import { FC } from "react";
import Link from "next/link";

import styles from "./admin-home.module.scss";
import Image from "next/image";

type AdminHomeUIProps = {
  layouts: UserLayoutForAdminResponse[];
};

export const AdminHomeUI: FC<AdminHomeUIProps> = ({ layouts }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Админ панель</h1>

      <div className={styles.buttonContainer}>
        <Link href="/admin/layout/create" className={styles.createButton}>Создать новый шаблон</Link>
      </div>

      <div className={styles.layoutList}>
        <h2 className={styles.listTitle}>Список шаблонов</h2>
        <ul className={styles.list}>
          {layouts.map((layout) => (
            <li key={layout.id} className={styles.listItem}>
              <Link className={styles.listLink} href={`/admin/layout/${layout.id}`}>
                {layout.path_to_image && (
                  <Image
                    src={`${API_URL}/${layout.path_to_image}`}
                    alt={layout.name}
                    width={64}
                    height={64}
                    className={styles.layoutImage}
                  />
                )}
                <div>
                  <h3 className={styles.layoutName}>{layout.name}</h3>
                  <p className={styles.layoutDescription}>{layout.description}</p>
                  <p>Опубликован: {layout.isPublished ? "Да" : "Нет"}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
