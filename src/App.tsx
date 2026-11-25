import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Home } from '@/pages/Home';

const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })));
const Features = lazy(() => import('@/pages/Features').then((m) => ({ default: m.Features })));
const Pricing = lazy(() => import('@/pages/Pricing').then((m) => ({ default: m.Pricing })));
const Integration = lazy(() => import('@/pages/Integration').then((m) => ({ default: m.Integration })));
const IntegrationDetail = lazy(() =>
  import('@/pages/IntegrationDetail').then((m) => ({ default: m.IntegrationDetail }))
);
const Blog = lazy(() => import('@/pages/Blog').then((m) => ({ default: m.Blog })));
const BlogDetail = lazy(() =>
  import('@/pages/BlogDetail').then((m) => ({ default: m.BlogDetail }))
);
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })));
const StyleGuide = lazy(() =>
  import('@/pages/StyleGuide').then((m) => ({ default: m.StyleGuide }))
);
const Licenses = lazy(() => import('@/pages/Licenses').then((m) => ({ default: m.Licenses })));
const Changelog = lazy(() => import('@/pages/Changelog').then((m) => ({ default: m.Changelog })));
const Instructions = lazy(() =>
  import('@/pages/Instructions').then((m) => ({ default: m.Instructions }))
);
const Password = lazy(() => import('@/pages/Password').then((m) => ({ default: m.Password })));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
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
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
