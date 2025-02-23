"use client";

import { useEffect } from 'react';

import { useParams } from 'next/navigation';

import { Editor } from '@craftjs/core';

import lz from 'lzutf8';

import debounce from 'debounce';

import { Container } from '@/components/user-blocks/Container';
import { Card, CardBottom, CardTop } from '@/components/user-blocks/Card';
import { Text } from '@/components/user-blocks/Text';
import { useStore } from '@/hooks/useStore';
import { Preloader } from '@/components/ui/preloader';
import { observer } from 'mobx-react-lite';
import { EditorForLoading } from '@/components/editor-with-loading/editor-with-loading';
import { RenderNode } from '@/components/render-node';
import { Header_001 } from '@/components/user-blocks/Headers/header-001/header-001';

const SiteEdit = observer(() => {
  const { userSitesStore } = useStore();

  const params = useParams();
  
  useEffect(() => {
    userSitesStore.getUserSiteById(params.id! as string);
  }, [])

  if (userSitesStore.isLoading) {
    return <Preloader />;
  }

  if (!userSitesStore.userSiteById) {
    return <div className="mx-10">Такого сайта нет</div>;
  }

  return (
    <div className='craftjs-renderer flex-1 h-full w-full transition overflow-auto'>
      <Editor
        resolver={{ Card, Text, Header_001, Container, CardTop, CardBottom }}
        onNodesChange={debounce((query) => {
          const json = query.serialize();
          const compressed = lz.encodeBase64(lz.compress(json));
          if (compressed !== userSitesStore.userSiteById?.site_data) {
            userSitesStore.updateSiteDataById(params.id! as string, compressed);
          }
        }, 1000)}
        onRender={RenderNode}
      >
        <EditorForLoading jsonData={userSitesStore.userSiteById.site_data}/>
      </Editor>
    </div>
  );
});

export default SiteEdit;