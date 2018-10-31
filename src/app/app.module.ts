import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-router.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { StormComponent } from './modules/dashboard/components/storm/storm.component';
/** dependency of NgModel */
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
