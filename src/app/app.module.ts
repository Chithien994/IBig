import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';

import { TopicService } from '../services/topic.service';
import { MessageService } from '../services/message.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { DeleteModalComponent } from './common/modal/delete/delete-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    HeaderComponent,
    FooterComponent,
    TopicDetailComponent,
    MessageComponent,
    DashboardComponent,
    SearchComponent,
    DeleteModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    VirtualScrollerModule
  ],
  providers: [
    TopicService,
    MessageService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
