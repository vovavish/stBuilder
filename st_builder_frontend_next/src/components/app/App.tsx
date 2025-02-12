import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Routes, Route } from 'react-router-dom';

import { useStore } from '@/hooks/useStore';

import { ProtectedRoute } from '../protected-route';
import { Login } from '@/pages/login/login';
import { Register } from '@/pages/register';
import { SitesList } from '@/pages/sites-list';
import { AppHeader } from '../app-header';
import { AppFooter } from '../app-footer';
import { SiteSettings } from '@/pages/site-settings';
import { SiteEdit } from '@/pages/site-edit';
import { ChooseLayout } from '@/pages/choose-layout';
import { ChooseLayoutDetails } from '@/pages/choose-layout-details';
import { AdminHome, AdminLayout, AdminLayoutDesignEdit } from '@/pages/admin';
import { Home } from '@/pages/home';

export function App() {
  const { authStore } = useStore();
  useEffect(() => {
    authStore.checkAuth();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <Routes>
        <Route index element={<Home />} />

        <Route path="/" element={<ProtectedRoute onlyUnAuthorized/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<ProtectedRoute requiredRole='USER'/>}>
          <Route path="/sites" element={<SitesList />} />
          <Route path="/sites/choose-layout" element={<ChooseLayout />} />
          <Route path="/sites/choose-layout/:id" element={<ChooseLayoutDetails />} />
          <Route path="/sites/settings/:id" element={<SiteSettings />} />
          <Route path="/sites/edit/:id" element={<SiteEdit />} />
          <Route path="/sites/view/:id" element={<div>site view (/sites/view/:id)</div>} />
        </Route>

        <Route path='/admin' element={<ProtectedRoute requiredRole='ADMIN'/>}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/layout/:id" element={<AdminLayout />} />
          <Route path="/admin/layout/edit/:id" element={<AdminLayoutDesignEdit />} />
        </Route>
      </Routes>
      <AppFooter />
    </div>
  )
  
}

export default observer(App);