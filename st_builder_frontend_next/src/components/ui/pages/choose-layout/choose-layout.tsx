import { FC } from "react";
import { UserLayoutResponse } from "@/types/response/UserLayoutResponse";
import { API_URL } from "@/lib/api";
import Link from "next/link";

import styles from './choose-layout.module.scss';

type ChooseLayoutUIProps = {
  layoutsList: UserLayoutResponse[];
};

export const ChooseLayoutUI: FC<ChooseLayoutUIProps> = ({ layoutsList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Выберите шаблон для вашего сайта
      </h1>
      <div className={styles.grid}>
        {layoutsList.map((layout) => (
          <Link
            key={layout.id}
            href={`/sites/choose-layout/${layout.id}`}
            className={styles.card}
          >
            <h2 className={styles.cardTitle}>
              {layout.name}
            </h2>
            <p className={styles.cardDescription}>
              {layout.description || "Краткое описание шаблона можно добавить здесь."}
            </p>
            <img
              src={`${API_URL}/${layout.path_to_image}` || "/path/to/default-image.jpg"}
              alt={layout.name}
              className={styles.cardImage}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
