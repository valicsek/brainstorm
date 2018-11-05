import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-router.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { StormComponent } from './modules/dashboard/components/storm/storm.component';
import { GameComponent } from './modules/game/pages/game.component';
import { HttpClientModule } from '@angular/common/http';


/** dependency of NgModel */
import { FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerComponent } from './modules/dashboard/components/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StormComponent,
    GameComponent,
    TimerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
