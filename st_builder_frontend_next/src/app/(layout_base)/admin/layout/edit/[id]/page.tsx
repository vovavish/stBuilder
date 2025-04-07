"use client";

import { AdminLayoutDesignEditUI } from "@/components/ui/pages/admin";
import { Preloader } from "@/components/ui/preloader";
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams } from "next/navigation";

import lz from 'lzutf8';

const AdminLayoutDesignEdit: FC = observer(() => {
  const { userLayoutsStore } = useStore();
  
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    userLayoutsStore.getUserLayoutByIdAdmin(id as string);
  }, [])

  const onUpdateLayoutData = (layoutData: string) => {
    const compressed = lz.encodeBase64(lz.compress(layoutData));
    if (compressed !== userLayoutsStore.userLayoutByIdAdmin?.layout_data) {
      userLayoutsStore.updateUserLayoutDataById(id as string, compressed);
    }
  }

  if (userLayoutsStore.isLoading) {
    <Preloader />;
  }

  if (!userLayoutsStore.userLayoutByIdAdmin) {
    return <div>Такого шаблона нет</div>;
  }

  return <AdminLayoutDesignEditUI layout={userLayoutsStore.userLayoutByIdAdmin!} onUpdateLayoutData={onUpdateLayoutData}/>;
});

export default AdminLayoutDesignEdit;