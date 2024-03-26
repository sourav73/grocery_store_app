import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { MakePaymentComponent } from './pages/make-payment/make-payment.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        title: 'Home',
        component: HomeComponent,
      },
      {
        path: 'category',
        title: 'Products',
        children: [
          {
            path: '',
            redirectTo: ':categoryId/products',
            pathMatch: 'full',
          },
          {
            path: ':categoryId/products',
            component: ProductsComponent,
          },
        ],
      },
      {
        path: 'checkout',
        component: CheckoutPageComponent
      },
      {
        path: 'payment',
        component: MakePaymentComponent
      }
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
