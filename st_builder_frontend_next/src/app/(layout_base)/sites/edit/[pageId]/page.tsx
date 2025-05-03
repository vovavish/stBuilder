"use client";

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { Editor } from '@craftjs/core';

import lz from 'lzutf8';

import debounce from 'debounce';

import { useStore } from '@/hooks/useStore';
import { Preloader } from '@/components/ui/preloader';
import { observer } from 'mobx-react-lite';
import { EditorForLoading } from '@/components/editor-with-loading/editor-with-loading';
import { RenderNode } from '@/components/render-node';
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
import { Link_001 } from '@/components/user-blocks/Navigation/Link_001/link-001';
import { Link_002 } from '@/components/user-blocks/Navigation/Link_002/Link_002';
import { Header_002 } from '@/components/user-blocks/Headers/header-002/header-002';

const SiteEdit = observer(() => {
  const { userSitesStore, userPagesStore } = useStore();

  const params = useParams();

  const pageId = params.pageId;

  useEffect(() => {
    userPagesStore.getPageById(Number(pageId!));
  }, [])

  if (userPagesStore.isLoading) {
    return <Preloader />;
  }

  if (!userPagesStore.userPageById) {
    return <div className="mx-10">Такой страницы нет</div>;
  }

  return (
    <div className='craftjs-renderer flex-1 h-full w-full transition overflow-auto'>
      <Editor
        resolver={{ Text_001, Header_001, Header_002, Title_001, Advantages_001, Model_3D_001, Container, DXF_001, DXF_002, DXF_003, Gallery_001, Link_001, Link_002 }}
        onNodesChange={debounce((query) => {
          const json = query.serialize();
          const compressed = lz.encodeBase64(lz.compress(json));
          if (compressed !== userSitesStore.userSiteById?.site_data) {
            userPagesStore.updatePage(Number(pageId!), undefined, undefined, compressed);
          }
        }, 1000)}
        onRender={RenderNode}
      >
        <EditorForLoading jsonData={userPagesStore.userPageById.page_data}/>
      </Editor>
    </div>
  );
});

export default SiteEdit;