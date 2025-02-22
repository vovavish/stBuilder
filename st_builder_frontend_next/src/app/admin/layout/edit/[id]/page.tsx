"use client";

import { AdminLayoutDesignEditUI } from "@/components/ui/pages/admin";
import { Preloader } from "@/components/ui/preloader";
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";

import lz from 'lzutf8';

const AdminLayoutDesignEdit: FC = observer(() => {
  const { userLayoutsStore } = useStore();
  
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    userLayoutsStore.getUserLayoutById(id as string);
  }, [])

  const onUpdateLayoutData = (layoutData: string) => {
    const compressed = lz.encodeBase64(lz.compress(layoutData));
    if (compressed !== userLayoutsStore.userLayoutById?.layout_data) {
      userLayoutsStore.updateUserLayoutDataById(id as string, compressed);
    }
  }

  if (userLayoutsStore.isLoading) {
    <Preloader />;
  }

  if (!userLayoutsStore.userLayoutById) {
    return <div>Такого шаблона нет</div>;
  }

  return <AdminLayoutDesignEditUI layout={userLayoutsStore.userLayoutById} onUpdateLayoutData={onUpdateLayoutData}/>;
});

export default AdminLayoutDesignEdit;