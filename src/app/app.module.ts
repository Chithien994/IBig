import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { HeaderComponent } from './core/common/header/header.component';
import { FooterComponent } from './core/common/footer/footer.component';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { TopicAddComponent } from './topic-add/topic-add.component';
import { MessageComponent } from './core/common/message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './core/common/search/search.component';
import { DialogComponent } from './core/common/dialog/dialog.component';
import { DialogService } from './core/common/dialog/dialog.service';

import { TopicService } from './services/topics/topic.service';
import { MessageService } from './services/message/message.service';
import { AuthenticationService } from './services/auth/authentication.service';
import { DeleteModalComponent } from './core/common/modal/delete/delete-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { AuthGuardService } from './services/auth/auth.guard.service';
import { UsersService } from './services/users/users.service';
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
    DialogComponent,
    TopicAddComponent
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
    DialogService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
