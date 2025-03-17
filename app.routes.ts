import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    title: 'Home - SIFEN API Service',
    data: {
      description: 'Explore the SIFEN API service for seamless electronic invoice integration'
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    title: 'Login - SIFEN API Service',
    data: {
      description: 'Login to your SIFEN API account'
    }
  },
  {
    path: 'client-dashboard',
    loadComponent: () => import('./client-dashboard/client-dashboard.component').then(c => c.ClientDashboardComponent),
    canActivate: [() => inject(AuthGuard).canActivate()],
    title: 'Dashboard - SIFEN API Service',
    data: {
      description: 'Manage your SIFEN API account and subscriptions',
      requiresAuth: true
    }
  },
  {
    path: '**',
    loadComponent: () => import('./shared/not-found/not-found.component').then(c => c.NotFoundComponent),
    title: 'Page Not Found - SIFEN API Service'
  }
];

