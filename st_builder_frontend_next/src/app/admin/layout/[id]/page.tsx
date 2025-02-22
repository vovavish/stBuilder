"use client";

import { AdminLayoutUI } from '@/components/ui/pages/admin';
import { Preloader } from '@/components/ui/preloader';
import { useStore } from '@/hooks/useStore';
import { UserLayoutResponse } from '@/types/response/UserLayoutResponse';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AdminLayout: FC = observer(() => {
  const { userLayoutsStore } = useStore();
  const [layoutFormData, setLayoutFormData] = useState<UserLayoutResponse | undefined>(undefined);

  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    if (id) {
      userLayoutsStore.getUserLayoutById(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (userLayoutsStore.userLayoutById) {
      setLayoutFormData(userLayoutsStore.userLayoutById);
    }
  }, [userLayoutsStore.userLayoutById]);

  if (userLayoutsStore.isLoading || !layoutFormData) {
    return <Preloader />;
  }

  if (!userLayoutsStore.userLayoutById) {
    return <div>Такого шаблона нет</div>;
  }

  return (
    <AdminLayoutUI
      layout={userLayoutsStore.userLayoutById}
      layoutFormData={layoutFormData!}
      setLayoutFormData={setLayoutFormData}
      onLayoutSave={(updatedLayout) => {
        userLayoutsStore.updateUserLayoutById(
          updatedLayout.id,
          updatedLayout.name,
          undefined,
          updatedLayout.description,
          updatedLayout.path_to_image,
        );
      }}
    />
  );
});

export default AdminLayout;