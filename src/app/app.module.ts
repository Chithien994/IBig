import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { MessageComponent } from '../common/message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from '../common/search/search.component';
import { DialogComponent } from '../common/dialog/dialog.component';
import { DialogService } from '../common/dialog/dialog.service';

import { TopicService } from '../services/topic/topic.service';
import { MessageService } from '../services/message/message.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { DeleteModalComponent } from '../common/modal/delete/delete-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { AuthGuardService } from '../services/auth/auth.guard.service';
import { from } from 'rxjs';

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
    DeleteModalComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    VirtualScrollerModule,
    NgbModule
  ],
  providers: [
    TopicService,
    MessageService,
    AuthenticationService,
    AuthGuardService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
