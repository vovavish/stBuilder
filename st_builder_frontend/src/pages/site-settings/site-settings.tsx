import { useParams } from 'react-router-dom';

import { SiteSettingsUI } from '@/components/ui/pages/site-settings';
import { SyntheticEvent, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { Preloader } from '@/components/ui/preloader';
import { useStore } from '@/hooks/useStore';

export const SiteSettings = observer(() => {
  const { userSitesStore } = useStore();

  const { id } = useParams();

  const [siteName, setSiteName] = useState(userSitesStore.userSiteById?.site_name || '');
  const [siteAddress, setSiteAddress] = useState(userSitesStore.userSiteById?.site_address || '');

  useEffect(() => {
    userSitesStore.getUserSiteById(id!);
  }, []);

  useEffect(() => {
    setSiteName(userSitesStore.userSiteById?.site_name || '');
    setSiteAddress(userSitesStore.userSiteById?.site_address || '');
  }, [userSitesStore.userSiteById]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    
    userSitesStore.updateSiteById(id!, siteName, undefined, siteAddress);
  };

  const handleCancel = () => {
    setSiteName(userSitesStore.userSiteById?.site_name || '');
    setSiteAddress(userSitesStore.userSiteById?.site_address || '');
  };

  const isFormChanged =
    siteName !== (userSitesStore.userSiteById?.site_name || '') ||
    siteAddress !== (userSitesStore.userSiteById?.site_address || '');

  if (userSitesStore.isLoading) {
    return <Preloader />;
  }

  if (!userSitesStore.userSiteById) {
    return <div className="mx-10">Такого сайта нет</div>;
  }

  return (
    <SiteSettingsUI
      site_name={siteName}
      setSiteName={setSiteName}
      site_address={siteAddress}
      setSiteAddress={setSiteAddress}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      isFormChanged={isFormChanged}
    />
  );
});
