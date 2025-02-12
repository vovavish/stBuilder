import { FC, useEffect } from "react";

import { ChooseLayoutUI } from "@/components/ui/pages/choose-layout";
import { useStore } from "@/hooks/useStore";
import { Preloader } from "@/components/ui/preloader";
import { observer } from "mobx-react-lite";

export const ChooseLayout: FC = observer(() => {
  const { userLayoutsStore } = useStore();

  useEffect(() => {
    userLayoutsStore.getUserLayouts();
  }, []);

  if (!userLayoutsStore.userLayouts.length) {
    return <Preloader />;
  }

  return (
    <ChooseLayoutUI layoutsList={userLayoutsStore.userLayouts}/>
  );
});