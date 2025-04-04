import { UserLayoutByIdResponse } from '@/types/response/UserLayoutResponse';
import { Editor } from '@craftjs/core';
import { FC } from 'react';
import { EditorPreviewer } from '@/components/editor-previewer';

import { Text_001 } from '@/components/user-blocks/Text/text-001/text-001';
import { Header_001 } from '@/components/user-blocks/Headers/header-001/header-001';
import { Title_001 } from '@/components/user-blocks/Titels/title-001/title-001';
import { Advantages_001 } from '@/components/user-blocks/Advantages/advantages-001/advantages-001';
import { Container } from '@/components/user-blocks/Container';
import { Model_3D_001 } from '@/components/user-blocks/3D-Models/3d-model-001/3d-model-001';
import { DXF_001 } from '@/components/user-blocks/CAD/DXF/dxf-001/dxf-001';
import { DXF_002 } from '@/components/user-blocks/CAD/DXF/dxf-002/dxf-002';
import { DXF_003 } from '@/components/user-blocks/CAD/DXF/dxf-003/dxf-003';

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
        <Editor resolver={{ Text_001, Header_001, Title_001, Advantages_001, Model_3D_001, Container, DXF_001, DXF_002, DXF_003}}>
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
