import { observer } from 'mobx-react-lite';
import { useEffect, SyntheticEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { useStore } from '@/hooks/useStore';

import { Preloader } from '@/components/ui/preloader';
import { SitesListUI } from '@/components/ui/pages/sites-list';

export const SitesList = observer(() => {
  const { userSitesStore } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    userSitesStore.getUserSites();
  }, []);

  const onEditSiteClick = (e: SyntheticEvent, siteId: string) => {
    e.preventDefault();

    navigate(`/sites/edit/${siteId}`);
  };

  if (!userSitesStore.userSites.length) {
    return <Preloader />;
  }

  return <SitesListUI sitesList={userSitesStore.userSites} onEditSiteClick={onEditSiteClick} />;
});
