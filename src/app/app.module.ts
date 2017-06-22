import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet.component';
import { TweetService } from './tweet.service';
import { Http, HttpModule } from "@angular/http";
import { CalendarComponent } from "app/calendar.component";
import { MainComponent } from "app/main.component";
import { environment } from "environments/environment";
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes = [
  { path: "tweets/:date", component: MainComponent },
  { path: "tweets", component: MainComponent },
  { path: "", redirectTo: environment.baseHref + "tweets", pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    TweetComponent,
    CalendarComponent
  ],
  imports: [
    HttpModule, // Service で Http を使うのに必要
    BrowserModule, // HTML テンプレートの展開に必要
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    TweetService,
    { provide: APP_BASE_HREF, useValue: environment.baseHref }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
