import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { R_TOPICS_PATH, R_HOME, R_BASHBOARD_PATH, R_DETAIL_PATH } from './app-constants';

const routes: Routes = [
  { path: '', redirectTo: R_HOME, pathMatch: 'full', data: { title: 'Home', isShow: true }},
  { path: R_TOPICS_PATH, component: TopicsComponent, data: { title: 'Topics', isShow: true }},
  { path: R_BASHBOARD_PATH, component: DashboardComponent, data: { title: 'Dashboard', isShow: true }},
  { path: `${R_DETAIL_PATH}:id`, component: TopicDetailComponent, data: { title: 'Topic Detail', isShow: false }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  public routes = routes;

  getHomeRouter(){
    return routes.filter(router=>router.path="")[0]
  }

  getTopicsRouter(){
    return this.routes.filter(router=>router.path="topics")[0]
  }

  getDashboardRouter(){
    return routes.filter(router=>router.path="dashboard")[0]
  }
}
