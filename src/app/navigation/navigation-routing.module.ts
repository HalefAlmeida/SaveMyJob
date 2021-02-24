import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NavigationComponent } from './navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'activities',
        loadChildren: () => import('../activities/activities.module').then(m => m.ActivitiesModule)
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
