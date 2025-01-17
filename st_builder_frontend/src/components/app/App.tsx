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

export function App() {
  const { authStore } = useStore();
  useEffect(() => {
    authStore.checkAuth();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <Routes>
        <Route index element={<div>index page (/)</div>} />

        <Route path="/" element={<ProtectedRoute onlyUnAuthorized />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/sites" element={<SitesList />} />
          <Route path="/sites/settings/:id" element={<SiteSettings />} />
          <Route path="/sites/edit/:id" element={<SiteEdit />} />
          <Route path="/sites/view/:id" element={<div>site view (/sites/view/:id)</div>} />
        </Route>
      </Routes>
      <AppFooter />
    </div>
  )
  
}

export default observer(App);