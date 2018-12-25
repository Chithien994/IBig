import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { R_TOPICS_PATH, R_HOME, R_BASHBOARD_PATH, R_DETAIL_PATH,
  R_LOGIN_PATH, R_SIGNUP_PATH, NOT_ADMIN, R_TOPICS_ADD_PATH } from './app-constants';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from '../services/auth/auth.guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: R_HOME,
    pathMatch: 'full',
    data: { title: 'Home', isShow: false, auth: false, roles: NOT_ADMIN }
  },
  {
    path: R_LOGIN_PATH,
    component: LoginComponent,
    data: { title: 'Login', isShow: true, auth: false, roles: NOT_ADMIN }
  },
  {
    path: R_SIGNUP_PATH,
    component: RegisterComponent,
    data: { title: 'Register', isShow: true, auth: false, roles: NOT_ADMIN }
  },
  {
    path: R_TOPICS_PATH,
    component: TopicsComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Topics', isShow: true, auth: true, roles: NOT_ADMIN }
  },
  {
    path: R_BASHBOARD_PATH,
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Dashboard', isShow: true, auth: true, roles: NOT_ADMIN }
  },
  {
    path: R_TOPICS_ADD_PATH,
    component: TopicsComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Add Topic', isShow: true, auth: true, roles: NOT_ADMIN }
  },
  {
    path: `${R_DETAIL_PATH}:id`,
    component: TopicDetailComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Topic Detail', isShow: false, auth: true, roles: NOT_ADMIN }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public routes = routes;
}
