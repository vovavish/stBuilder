import { createContext, useContext } from "react";

import { AuthStore } from "@/store/AuthStore/AuthStore";
import { UserSitesStore } from "@/store/UserSitesStore/UserSitesStore";
import { UserLayoutsStore } from "@/store/UserLayoutsStore/UserLayoutsStore";

interface Store {
  authStore: AuthStore,
  userSitesStore: UserSitesStore,
  userLayoutsStore: UserLayoutsStore,
}

export const store: Store = {
  authStore: new AuthStore(),
  userSitesStore: new UserSitesStore(),
  userLayoutsStore: new UserLayoutsStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext)
}