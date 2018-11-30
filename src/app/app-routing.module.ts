import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { R_TOPICS_PATH, R_HOME, R_BASHBOARD_PATH, R_DETAIL_PATH, R_LOGIN_PATH, R_REGISTER_PATH } from './app-constants';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: R_HOME, pathMatch: 'full', data: { title: 'Home', isShow: true, auth: false }},
  { path: R_REGISTER_PATH, component: RegisterComponent, data: { title: 'Register', isShow: false, auth: true }},
  { path: R_TOPICS_PATH, component: TopicsComponent, data: { title: 'Topics', isShow: true, auth: true }},
  { path: R_BASHBOARD_PATH, component: DashboardComponent, data: { title: 'Dashboard', isShow: true, auth: true }},
  { path: `${R_DETAIL_PATH}:id`, component: TopicDetailComponent, data: { title: 'Topic Detail', isShow: false, auth: true }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public routes = routes;
}
