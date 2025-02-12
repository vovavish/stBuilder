import { createContext, useContext } from "react";

import { AuthStore } from "@/store/AuthStore/AuthStore";
import { UserSitesStore } from "@/store/UserSitesStore/UserSitesStore";
import { UserLayoutsStore } from "@/store/UserLayoutsStore/UserLayoutsStore";
import { SelectedNodeStore } from "@/store/SelectedNodeStore/SelectedNodeStore";

interface Store {
  authStore: AuthStore,
  userSitesStore: UserSitesStore,
  userLayoutsStore: UserLayoutsStore,
  selectedNodeStore: SelectedNodeStore,
}

export const store: Store = {
  authStore: new AuthStore(),
  userSitesStore: new UserSitesStore(),
  userLayoutsStore: new UserLayoutsStore(),
  selectedNodeStore: new SelectedNodeStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext)
}