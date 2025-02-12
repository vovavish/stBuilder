import { AdminHomeUI } from '@/components/ui/pages/admin';
import { Preloader } from '@/components/ui/preloader';
import { useStore } from '@/hooks/useStore';
import { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

export const AdminHome: FC = observer(() => {
  const { userLayoutsStore } = useStore();

  useEffect(() => {
    userLayoutsStore.getUserLayouts();
  }, []);

  if (userLayoutsStore.isLoading) {
    return <Preloader />;
  }

  return <AdminHomeUI layouts={userLayoutsStore.userLayouts}/>;
});
