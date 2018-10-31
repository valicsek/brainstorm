
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgModule } from '@angular/core';

const MODULES = [
  MatCardModule,
  MatGridListModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressBarModule
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
  providers: []
})

export class AppMaterialModule { }
