
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgModule } from '@angular/core';

const MODULES = [
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  DragDropModule
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
  providers: []
})

export class AppMaterialModule { }
