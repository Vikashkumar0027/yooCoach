import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login/login.guard';
import { AdminGuard } from './guard/admin/admin.guard';
import { AdminloginGuard } from './guard/adminLogin/adminlogin.guard';
// canLoad:[LoginGuard]
const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    // redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AdminloginGuard]
  },
  {
    path: 'otpfield',
    loadChildren: () => import('./otpfield/otpfield.module').then( m => m.OtpfieldPageModule)
  },
  {
    path: 'subject-detais',
    loadChildren: () => import('./subject-detais/subject-detais.module').then( m => m.SubjectDetaisPageModule)
  },
  {
    path: 'personal-details',
    loadChildren: () => import('./personal-details/personal-details.module').then( m => m.PersonalDetailsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canLoad: [AuthGuard]
  },
  // dashboard/dashboard.module
  {
    path: 'tabs/dashboard/:id',
    loadChildren: () => import('./pages/tabs/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule),
    canLoad: [AdminGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
