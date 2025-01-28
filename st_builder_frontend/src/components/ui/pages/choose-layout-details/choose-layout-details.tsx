import { UserLayoutByIdResponse } from '@/types/response/UserLayoutResponse';
import { Editor } from '@craftjs/core';
import { FC } from 'react';
import { Container } from '@/components/user/Container';
import { Card, CardBottom, CardTop } from '@/components/user/Card';
import { Button } from '@/components/user/Button';
import { Text } from '@/components/user/Text';
import { EditorPreviewer } from '@/components/editor-previewer';

import styles from './choose-layout-details.module.scss';

type ChooseLayoutDetailsUIProps = {
  layout: UserLayoutByIdResponse;
  onSelectLayout: (layout: UserLayoutByIdResponse) => void;
};

export const ChooseLayoutDetailsUI: FC<ChooseLayoutDetailsUIProps> = ({
  layout,
  onSelectLayout,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.editorWrapper}>
        <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}>
          <EditorPreviewer jsonData={layout.layout_data} />
        </Editor>
      </div>

      <div className={styles.sidebar}>
        <h3 className={styles.title}>{layout.name}</h3>
        <p className={styles.description}>{layout.description}</p>
        <button
          onClick={() => onSelectLayout(layout)}
          className={styles.selectButton}
        >
          Выбрать этот шаблон
        </button>
      </div>
    </div>
  );
};
