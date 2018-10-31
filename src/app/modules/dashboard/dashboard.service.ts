import { Injectable } from '@angular/core';
import { Group } from './models/group.model';
import { Storm } from './models/storm.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  /**
   * This function returns groups.
   */
  getGroups(): Group[] {
    return [
      new Group('Network Bullshit', [
        new Storm('How can you suck it?', ['Use your mouth', 'Use when you kissing'], 'Mouth')
      ]),
      new Group('Robot Control', []),
      new Group('Bullshit', [])
    ];
  }
}
