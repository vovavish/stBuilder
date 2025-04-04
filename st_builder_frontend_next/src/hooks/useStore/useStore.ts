import { createContext, useContext } from "react";

import { AuthStore } from "@/store/AuthStore/AuthStore";
import { UserSitesStore } from "@/store/UserSitesStore/UserSitesStore";
import { UserLayoutsStore } from "@/store/UserLayoutsStore/UserLayoutsStore";
import { SelectedNodeStore } from "@/store/SelectedNodeStore/SelectedNodeStore";
import { UserPagesStore } from "@/store/PublishUserPagesStore/PublishUserPagesStore";

interface Store {
  authStore: AuthStore,
  userSitesStore: UserSitesStore,
  userLayoutsStore: UserLayoutsStore,
  selectedNodeStore: SelectedNodeStore,
  userPagesStore: UserPagesStore,
}

export const store: Store = {
  authStore: new AuthStore(),
  userSitesStore: new UserSitesStore(),
  userLayoutsStore: new UserLayoutsStore(),
  selectedNodeStore: new SelectedNodeStore(),
  userPagesStore: new UserPagesStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext)
}