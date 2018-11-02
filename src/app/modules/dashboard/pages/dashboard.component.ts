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

  /** This variable contains if API service calls are in process or not. */
  isAPICallInProcess: boolean;

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

  /**
   * This variable contains tips for students
   * how can they improve their studying session.
   */
  tipsForStudyArray: string[];

  constructor(
    private dashboardService: DashboardService,
    private router: Router) { }

  ngOnInit() {
    this.tipsForStudyArray = [
      'Make own youtube video about you study.',
      'Study multiple subjects each day.',
      'Take notes by hand.',
      'Test yourself frequently.',
      'Connect what you are learning with something you already know.',
      'Mindmap always a good choice to organize your studies.'
    ];

    this.isAPICallInProcess = true;
    this.dashboardService.getGroups().subscribe(
      (data: Group[]) => {
        this.groupArray = data;
        this.isAPICallInProcess = false;
      },
      error => alert(error.message)
    );

    this.groupArray = [];
    this.stormArray = [];
    this.newGroup = new Group(-1, '', null);
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
      this.dashboardService.getGroups().subscribe(
        (data: Group[]) => this.groupArray = data,
        error => alert(error)
      );
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

      const group: Group = new Group(this.groupArray.length + 1, this.newGroup.title, []);
      this.dashboardService.save('group', group).subscribe(
        data => {
          this.groupArray.push(group);
          this.newGroup.title = '';
        },
        error => alert(error.message)
      );
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
    this.dashboardService.save('storm', this.newStorm, this.selectedGroup.id).subscribe(
      data => {
        this.selectedGroup.stormArray.push(this.newStorm);
        this.newStorm = new Storm('', [], '');
      },
      error => alert(error.message)
    );
  }

  /**
   * This function starts the study session.
   * It navigates to the game page with the group identifier.
   */
  onStartStormClicked() {
    this.router.navigate(['game', this.selectedGroup.id]);
  }

  /**
   * This function calls when user click to a trash icon on a group view.
   * @param group The group what we want to delete
   */
  onGroupItemDelete(group) {
    if (confirm('Are you sure you want to delete?')) {
      this.dashboardService.delete(group.id).subscribe(
        (data: any) => {
          if (data.success) {
            location.reload();
          }
        },
        error => alert(error.message)
      );
    }
  }

  /**
   * Return a random tip from tipsForStudyArray
   * The Tip card use this function to show a random tip.
   */
  getRandomTip() {
    const randomNumber = Math.floor((Math.random() * this.tipsForStudyArray.length));
    return this.tipsForStudyArray[randomNumber];
  }
}
