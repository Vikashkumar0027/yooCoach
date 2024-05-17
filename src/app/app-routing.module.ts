import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login/login.guard';

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
    canLoad:[LoginGuard]
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
