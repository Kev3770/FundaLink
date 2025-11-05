// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Programs } from './pages/programs/programs';
import { NewsPage } from './pages/news/news';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'about', component: About },
      { path: 'programs', component: Programs },
      { path: 'news', component: NewsPage }
    ]
  }
];