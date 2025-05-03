import { EditorForLoading } from '@/components/editor-with-loading/editor-with-loading';
import { UserLayoutByIdAdminResponse } from '@/types/response/UserLayoutResponse';
import { Editor } from '@craftjs/core';
import debounce from 'debounce';
import { FC } from 'react';
import { Text_001 } from '@/components/user-blocks/Text/text-001/text-001';
import { Header_001 } from '@/components/user-blocks/Headers/header-001/header-001';
import { Title_001 } from '@/components/user-blocks/Titels/title-001/title-001';
import { Advantages_001 } from '@/components/user-blocks/Advantages/advantages-001/advantages-001';
import { Container } from '@/components/user-blocks/Container';
import { Model_3D_001 } from '@/components/user-blocks/3D-Models/3d-model-001/3d-model-001';
import { DXF_001 } from '@/components/user-blocks/CAD/DXF/dxf-001/dxf-001';
import { DXF_002 } from '@/components/user-blocks/CAD/DXF/dxf-002/dxf-002';
import { DXF_003 } from '@/components/user-blocks/CAD/DXF/dxf-003/dxf-003';
import { Gallery_001 } from '@/components/user-blocks/Gallery/gallery-001/gallery-001';
import { RenderNode } from '@/components/render-node';
import { Link_001 } from '@/components/user-blocks/Navigation/Link_001/link-001';
import { Header_002 } from '@/components/user-blocks/Headers/header-002/header-002';

type AdminLayoutDesignEditUIProps = {
  layout: UserLayoutByIdAdminResponse;
  onUpdateLayoutData: (layoutData: string) => void;
};

export const AdminLayoutDesignEditUI: FC<AdminLayoutDesignEditUIProps> = ({
  layout,
  onUpdateLayoutData,
}) => {
  return (
    <div className="craftjs-renderer">
      <Editor
        resolver={{
          Text_001,
          Header_001,
          Header_002,
          Title_001,
          Advantages_001,
          Model_3D_001,
          Container,
          DXF_001,
          DXF_002,
          DXF_003,
          Gallery_001,
          Link_001,
        }}
        onNodesChange={debounce((query) => {
          const json = query.serialize();
          onUpdateLayoutData(json);
        }, 1000)}
        onRender={RenderNode}
      >
        <EditorForLoading jsonData={layout.layout_data} />
      </Editor>
    </div>
  );
};
