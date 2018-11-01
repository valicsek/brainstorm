/**
 * This file contains the routes of the app.
 */
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './modules/dashboard/pages/dashboard.component';
import { GameComponent } from './modules/game/pages/game.component';

const ROUTES: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'game/:id', component: GameComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
