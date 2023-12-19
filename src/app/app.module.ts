import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MoodContainerComponent } from './mood-container/mood-container.component';
import { LoginPageComponent } from './mood-container/login-page/login-page.component';
import { RegisterPageComponent } from './mood-container/register-page/register-page.component';
import {AppRoutingModule} from "./app-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainPageComponent } from './mood-container/main-page/main-page.component';
import { NavbarComponent } from './mood-container/main-page/navbar/navbar.component';
import { ContentComponent } from './mood-container/main-page/content/content.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterAuthGuard} from "./Guards/routerAuthGuard";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CredentialsInterceptor} from "./Guards/credentialsInterceptor";
import { ConnectionRefusedComponent } from './mood-container/errors/connection-refused/connection-refused.component';
import {MainAuthGuard} from "./Guards/mainAuthGuard";
import {CommonModule, DatePipe} from "@angular/common";
import {ModalBaseComponent} from "./Services/Modals/modal-base/modal-base.component";
import { CreatePublicationComponent } from './Services/Modals/Custom/create-publication/create-publication.component';

@NgModule({
    declarations: [
        AppComponent,
        MoodContainerComponent,
        LoginPageComponent,
        RegisterPageComponent,
        MainPageComponent,
        ContentComponent,
        NavbarComponent,
        ConnectionRefusedComponent,
        ModalBaseComponent,
        CreatePublicationComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CredentialsInterceptor,
            multi: true
        },
        DatePipe,
        RouterAuthGuard,
        MainAuthGuard
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
