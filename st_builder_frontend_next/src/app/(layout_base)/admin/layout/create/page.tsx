"use client";

import { AdminLayoutUICreate } from '@/components/ui/pages/admin';
import { Preloader } from '@/components/ui/preloader';
import { useStore } from '@/hooks/useStore';
import { UserLayoutByIdAdminResponse } from '@/types/response/UserLayoutResponse';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

const AdminLayoutCreate: FC = observer(() => {
  const { userLayoutsStore } = useStore();
  const router = useRouter();
  const [layoutFormData, setLayoutFormData] = useState<Omit<UserLayoutByIdAdminResponse, 'id'>>({
    name: '',
    description: '',
    path_to_image: '',
    isPublished: false,
    layout_data: '',
  });

  const handleCreateLayout = async () => {
    try {
      await userLayoutsStore.createUserLayout(
        layoutFormData.name,
        layoutFormData.description,
        layoutFormData.path_to_image,
        '',
      );
      
      if (userLayoutsStore.userLayoutById) {
        router.push(`/admin`);
      }
    } catch (error) {
      console.error('Error creating layout:', error);
    }
  };

  if (userLayoutsStore.isLoading) {
    return <Preloader />;
  }

  return (
    <AdminLayoutUICreate
      layoutFormData={layoutFormData}
      setLayoutFormData={setLayoutFormData}
      onLayoutCreate={handleCreateLayout}
    />
  );
});

export default AdminLayoutCreate;