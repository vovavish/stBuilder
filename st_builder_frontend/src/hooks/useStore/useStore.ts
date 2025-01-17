import { createContext, useContext } from "react";

import { AuthStore } from "@/store/AuthStore/AuthStore";
import { UserSitesStore } from "@/store/UserSitesStore/UserSitesStore";

interface Store {
  authStore: AuthStore,
  userSitesStore: UserSitesStore
}

export const store: Store = {
  authStore: new AuthStore(),
  userSitesStore: new UserSitesStore()
}

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext)
}