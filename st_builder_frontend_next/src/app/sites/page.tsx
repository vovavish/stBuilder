'use client';

import { observer } from 'mobx-react-lite';
import { useEffect, SyntheticEvent } from 'react';

import { useStore } from '@/hooks/useStore';

import { Preloader } from '@/components/ui/preloader';
import { SitesListUI } from '@/components/ui/pages/sites-list';
import { useRouter } from 'next/navigation';

const SitesList = observer(() => {
  const { userSitesStore } = useStore();

  const router = useRouter();

  useEffect(() => {
    userSitesStore.getUserSites();
  }, []);

  const onEditSiteClick = (e: SyntheticEvent, siteId: string) => {
    e.preventDefault();

    router.push(`/sites/edit/${siteId}`);
  };

  if (userSitesStore.isLoading || !userSitesStore.userSites.length) {
    return <Preloader />;
  }

  return <SitesListUI sitesList={userSitesStore.userSites} onEditSiteClick={onEditSiteClick} />;
});

export default SitesList;