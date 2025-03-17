import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // Default route redirecting to home
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Lazy loaded home module
  { 
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule) 
  },
  
  // Lazy loaded auth module
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) 
  },
  
  // Protected client-dashboard route using AuthGuard
  { 
    path: 'client-dashboard', 
    loadComponent: () => import('./client-dashboard/client-dashboard.component').then(c => c.ClientDashboardComponent),
    canActivate: [AuthGuard] 
  },
  
  // Wildcard route for 404 handling
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

