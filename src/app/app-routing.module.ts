import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full', data: { title: 'Home', isShow: true }},
  { path: 'topics', component: TopicsComponent, data: { title: 'Topics', isShow: true }},
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', isShow: true }},
  { path: 'detail/:id', component: TopicDetailComponent, data: { title: 'Topic Detail', isShow: false }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public routes = routes;
 }
