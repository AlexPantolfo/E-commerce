import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '', // redireciona para o “módulo” do site
  },
  {
    path: '',
    // Carrega as rotas do site via lazy loading
    loadChildren: () =>
      import('../app/pages/site/site.routes').then((m) => m.siteRoutes),
  },
//   {
//     path: 'admin',
//     // Carrega as rotas do admin via lazy loading
//     loadChildren: () =>
//       import('../pages/admin/admin.routes').then((m) => m.adminRoutes),
//   },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent
  },
];
