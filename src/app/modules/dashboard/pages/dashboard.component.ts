import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { Storm } from '../models/storm.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  /** This variable contains the groups */
  groupArray: Group[];

  /** This variable contains the storms */
  stormArray: Storm[];

  /**
   * This variable contains the selectedGroup from the list.
   * Modify if User clicks to one of the groups
   */
  selectedGroup: Group;

  /**
   * This variable contains the data of the new group
   * If the new group added, then the name of this variable will be null.
   */
  newGroup: Group;

  /**
   * This variable contains the data of the new storm
   * If the new storm added, then the data of this variable will be null.
   */
  newStorm: Storm;

  constructor(
    private dashboardService: DashboardService,
    private router: Router) { }

  ngOnInit() {
    this.groupArray = this.dashboardService.getGroups();
    this.stormArray = [];
    this.newGroup = new Group('', null);
    this.newStorm = new Storm('', [], '');
  }

  /**
   * This function calls when the group filter changed.
   * Use this function to filter the groupArray.
   * @param $event The event of input
   */
  onGroupFilterInputChanged($event) {
    const valueOfInput = $event.srcElement.value;
    if (valueOfInput) {
      this.groupArray = this.groupArray.filter((item) => {
        return item.title.toLowerCase().includes(valueOfInput.toLowerCase());
      });
    } else {
      this.groupArray = this.dashboardService.getGroups();
    }
  }

  /**
  * This function calls when the storm filter changed.
  * Use this function to filter the stormArray.
  * @param $event The event of input
  */
  onStormFilterInputChanged($event) {
    alert('NOT IMPLEMENTED YET');
  }

  /**
   * This function been called when the user clicks to an element from the groupList
   * @param group The selected group
   */
  onGroupItemSelected(group) {
    this.selectedGroup = group;

    if (group.stormArray) {
      this.stormArray = group.stormArray;
    }
  }

  /**
   * This function adds a new group to the groups
   * It has been called when the user clicks to add new group button
   */
  onAddNewGroupItem() {
    if (this.newGroup.title) {
      const nuOfExisting = this.groupArray.filter((item) => item.title === this.newGroup.title);

      if (nuOfExisting.length > 0) {
        alert('This group already exists');
        return;
      }

      this.groupArray.push(new Group(this.newGroup.title, []));
      this.newGroup.title = '';
    }
  }


  /**
   * This function adds a new group to the groups
   * It has been called when the user clicks to add new group button
   */
  onAddNewStormItem() {
    if (!this.selectedGroup) {
      alert('You should select a group first!');
      return;
    }

    this.selectedGroup.stormArray.push(this.newStorm);
    this.newStorm = new Storm('', [], '');
  }

  /**
   * This function starts the study session
   */
  onStartStormClicked() {
    this.router.navigate(['game']);
  }
}
