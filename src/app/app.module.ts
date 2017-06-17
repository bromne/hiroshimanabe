import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TweetComponent } from './tweet.component';
import { TweetService } from './tweet.service';
import { Http, HttpModule } from "@angular/http";
import { CalendarComponent } from "app/calendar.component";
@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    CalendarComponent
  ],
  imports: [
    HttpModule, // Service で Http を使うのに必要
    BrowserModule, // HTML テンプレートの展開に必要
  ],
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
