import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Features } from '@/pages/Features';
import { Pricing } from '@/pages/Pricing';
import { Integration } from '@/pages/Integration';
import { IntegrationDetail } from '@/pages/IntegrationDetail';
import { Blog } from '@/pages/Blog';
import { BlogDetail } from '@/pages/BlogDetail';
import { Contact } from '@/pages/Contact';
import { StyleGuide } from '@/pages/StyleGuide';
import { Licenses } from '@/pages/Licenses';
import { Changelog } from '@/pages/Changelog';
import { Instructions } from '@/pages/Instructions';
import { Password } from '@/pages/Password';
import { NotFound } from '@/pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/integrations/:slug" element={<IntegrationDetail />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/license" element={<Navigate to="/licenses" replace />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/password" element={<Password />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
