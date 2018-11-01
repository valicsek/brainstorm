import { DashboardService } from './../dashboard/dashboard.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private dashboardService: DashboardService,
    private http: HttpClient
  ) { }

  getGroup(group_id) {
    return this.http.get(`http://localhost:1995/api/modules/${group_id}`);
  }
}
