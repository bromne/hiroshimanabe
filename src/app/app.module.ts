import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TweetComponent } from './tweet.component';
import { TweetService } from './tweet.service';
import { Http, HttpModule } from "@angular/http";
import { CalendarComponent } from "app/calendar.component";
import { MainComponent } from "app/main.component";

const appRoutes: Routes = [
  { path: "tweets/:date", component: MainComponent },
  { path: "tweets", component: MainComponent },
  { path: "", redirectTo: "/tweets", pathMatch: 'full' },
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
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
