"use client";

import { AdminHomeUI } from '@/components/ui/pages/admin';
import { Preloader } from '@/components/ui/preloader';
import { useStore } from '@/hooks/useStore';
import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const AdminHome: FC = observer(() => {
  const { userLayoutsStore } = useStore();

  useEffect(() => {
    userLayoutsStore.getAllUserLayoutsAdmin();
  }, []);

  if (userLayoutsStore.isLoading) {
    return <Preloader />;
  }

  return <AdminHomeUI layouts={userLayoutsStore.userLayoutsAdmin}/>;
});

export default AdminHome;