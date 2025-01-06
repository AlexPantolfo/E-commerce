// src/pages/site/site.routes.ts
import { Routes } from '@angular/router';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';

export const siteRoutes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent, // Layout com navbar
    children: [
      { path: '', component: HomeComponent },
      // ...outras páginas do site
    ],
  },
];
