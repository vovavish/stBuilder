"use client";

import { ChooseLayoutDetailsUI } from "@/components/ui/pages/choose-layout-details";
import { Preloader } from "@/components/ui/preloader";
import { useStore } from "@/hooks/useStore";
import { UserLayoutByIdResponse } from "@/types/response/UserLayoutResponse";
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";

import { useRouter, useParams } from "next/navigation";

const ChooseLayoutDetails: FC = observer(() => {
  const { userLayoutsStore, userSitesStore } = useStore();

  const router = useRouter();

  const { id } = useParams();

  useEffect(() => {
    userLayoutsStore.getUserLayoutById(id as string);
  }, []);

  const onLayoutSelect = async (layout: UserLayoutByIdResponse) => {
    await userSitesStore.createSite(layout.name, layout.layout_data);
    router.push('/sites');
  }

  if (userLayoutsStore.isLoading || !userLayoutsStore.userLayoutById) {
    return <Preloader />;
  }

  return (
    <ChooseLayoutDetailsUI layout={userLayoutsStore.userLayoutById} onSelectLayout={onLayoutSelect}/>
  );
});

export default ChooseLayoutDetails;