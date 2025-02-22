"use client";

import { FC, useEffect } from "react";

import { ChooseLayoutUI } from "@/components/ui/pages/choose-layout";
import { useStore } from "@/hooks/useStore";
import { Preloader } from "@/components/ui/preloader";
import { observer } from "mobx-react-lite";

const ChooseLayout: FC = observer(() => {
  const { userLayoutsStore } = useStore();

  useEffect(() => {
    userLayoutsStore.getUserLayouts();
  }, []);

  if (userLayoutsStore.isLoading && !userLayoutsStore.userLayouts.length) {
    return <Preloader />;
  }

  return (
    <ChooseLayoutUI layoutsList={userLayoutsStore.userLayouts}/>
  );
});

export default ChooseLayout;
