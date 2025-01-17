import type { FC } from "react";

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { observer } from "mobx-react-lite";

import { useStore } from "@/hooks/useStore";

import { Preloader } from "../ui/preloader";

type ProtectedRouteProps = {
  onlyUnAuthorized?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = observer(({onlyUnAuthorized}) => {
  const { authStore } = useStore();

  const location = useLocation();

  if (!authStore.isAuthChecked || authStore.isUserLoading) {
    return <Preloader />
  }

  if (!onlyUnAuthorized && !authStore.user) {
    return <Navigate replace to="/login" state={{from: location}} />;
  }

  if (onlyUnAuthorized && authStore.user) {
    const from = location.state?.from || {pathname: '/'};
    return <Navigate replace to={from} />;
  }

  return <Outlet />;
});