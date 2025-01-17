import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Editor } from '@craftjs/core';

import lz from 'lzutf8';

import debounce from 'debounce';

import { Container } from '@/components/user/Container';
import { Card, CardBottom, CardTop } from '@/components/user/Card';
import { Button } from '@/components/user/Button';
import { Text } from '@/components/user/Text';
import { useStore } from '@/hooks/useStore';
import { Preloader } from '@/components/ui/preloader';
import { observer } from 'mobx-react-lite';
import { EditorForLoading } from '@/components/editor-with-loading/editor-with-loading';

export const SiteEdit = observer(() => {
  const { userSitesStore } = useStore();

  const { id } = useParams();

  useEffect(() => {
    userSitesStore.getUserSiteById(id!);
  }, [])

  if (userSitesStore.isLoading) {
    return <Preloader />;
  }

  if (!userSitesStore.userSiteById) {
    return <div className="mx-10">Такого сайта нет</div>;
  }

  return (
    <Editor
      resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}
      onNodesChange={debounce((query) => {
        const json = query.serialize();
        const compressed = lz.encodeBase64(lz.compress(json));
        if (compressed !== userSitesStore.userSiteById?.site_data) {
          userSitesStore.updateSiteDataById(id!, compressed);
        }
      }, 1000)}
    >
      <EditorForLoading jsonData={userSitesStore.userSiteById.site_data}/>
    </Editor>
  );
});
