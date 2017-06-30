import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

import { AppComponent } from './app.component';
import { TomatoComponent } from './tomato/tomato.component';

import { TimerService } from './timer.service';

@NgModule({
  declarations: [
    AppComponent,
    TomatoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontawesomeModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
