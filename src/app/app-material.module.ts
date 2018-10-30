
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';

const MODULES = [
  MatCardModule
];

@NgModule({
  imports: [MODULES],
  exports: [MODULES],
  providers: []
})

export class AppMaterialModule { }
