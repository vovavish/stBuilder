import type { FC } from 'react';

import styles from './preloader.module.scss';

export const Preloader: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
    </div>
  );
};
