"use client";

import { AdminLayoutUI } from '@/components/ui/pages/admin';
import { Preloader } from '@/components/ui/preloader';
import { useStore } from '@/hooks/useStore';
import { UserLayoutByIdAdminResponse } from '@/types/response/UserLayoutResponse';
import { observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const AdminLayout: FC = observer(() => {
  const { userLayoutsStore } = useStore();
  const [layoutFormData, setLayoutFormData] = useState<UserLayoutByIdAdminResponse | undefined>(undefined);

  const params = useParams();
  const { id } = params;
  
  useEffect(() => {
    if (id) {
      userLayoutsStore.getUserLayoutByIdAdmin(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (userLayoutsStore.userLayoutByIdAdmin) {
      setLayoutFormData(userLayoutsStore.userLayoutByIdAdmin);
    }
  }, [userLayoutsStore.userLayoutByIdAdmin]);

  if (userLayoutsStore.isLoading || !layoutFormData) {
    return <Preloader />;
  }

  if (!userLayoutsStore.userLayoutByIdAdmin) {
    return <div>Такого шаблона нет</div>;
  }

  return (
    <AdminLayoutUI
      layout={userLayoutsStore.userLayoutByIdAdmin!}
      layoutFormData={layoutFormData!}
      setLayoutFormData={setLayoutFormData}
      onLayoutSave={(updatedLayout) => {
        userLayoutsStore.updateUserLayoutById(
          updatedLayout.id,
          updatedLayout.name,
          undefined,
          updatedLayout.description,
          updatedLayout.path_to_image,
          updatedLayout.isPublished
        );
      }}
    />
  );
});

export default AdminLayout;