import { AdminLayoutDesignEditUI } from "@/components/ui/pages/admin";
import { Preloader } from "@/components/ui/preloader";
import { useStore } from "@/hooks/useStore";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import lz from 'lzutf8';

export const AdminLayoutDesignEdit: FC = observer(() => {
  const { userLayoutsStore } = useStore();
  
  const { id } = useParams();

  useEffect(() => {
    userLayoutsStore.getUserLayoutById(id!);
  }, [])

  const onUpdateLayoutData = (layoutData: string) => {
    const compressed = lz.encodeBase64(lz.compress(layoutData));
    if (compressed !== userLayoutsStore.userLayoutById?.layout_data) {
      userLayoutsStore.updateUserLayoutDataById(id!, compressed);
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