import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TweetComponent } from './tweet.component';
import { TweetService } from './tweet.service';
@NgModule({
  declarations: [
    AppComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TweetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
