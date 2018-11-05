import { DashboardService } from './../dashboard.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Group } from '../models/group.model';
import { Storm } from '../models/storm.model';
import { Router } from '@angular/router';
import { MindMap } from '../../mindmap/index';
import { NodeOptions } from 'vis';
import stringSimilarity from 'string-similarity';

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

  /**
   * This variable contains a random number between 0 and the length of the tipsForStudyArray
   * Possible solution for ExpressionChangedAfterItHasBeenCheckedError
   */
  randomTipIndex: number;

  /**
   * This variable contains that the user see the question add card or not
   * A toggle modify this variable
   */
  showNewQuestion: boolean;

  /**
   * This variable contains that the user wants to hide the
   * group list or not.
   */
  showGroupList: boolean;

  /**
   * This div element contains the mindmap of the folder
   * <div #mindMap />
   * It is a reference for an div element with ID
   */
  @ViewChild('mindMap') mindMap;

  /**
   * This reference contains the stormFilter input.
   */
  @ViewChild('stormFilter') stormFilter: ElementRef;

  constructor(
    private dashboardService: DashboardService,
    private router: Router) { }

  ngOnInit() {
    this.showGroupList = true;
    this.showNewQuestion = false;
    this.tipsForStudyArray = [
      'Make own youtube video about you study.',
      'Study multiple subjects each day.',
      'Take notes by hand.',
      'Each node you add should have at least 2 different question',
      'Test yourself frequently.',
      'Mnenomics, like OSI model: Please Do Not Throw Sausage Pizza Away',
      'Connect what you are learning with something you already know.',
      'Mindmap always a good choice to organize your studies.'
    ];
    this.randomTipIndex = Math.floor((Math.random() * this.tipsForStudyArray.length));

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
    this.newGroup = new Group(this.uniqueIdGenerator(), '', null);
    this.newStorm = new Storm(this.uniqueIdGenerator(), '', [], '');
  }

  /**
   * Toggle the group list.
   * A button call this function
   */
  toggleGroups() {
    this.showGroupList = !this.showGroupList;
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
    const valueOfInput = $event.srcElement.value.toLowerCase();
    if (valueOfInput && this.selectedGroup) {
      this.stormArray = this.selectedGroup.stormArray.filter((storm) => {
        return storm.question.toLowerCase().includes(valueOfInput) ||
          storm.answer.toLowerCase().includes(valueOfInput);
      });
    } else {
      this.stormArray = this.selectedGroup.stormArray;
    }
  }

  /**
   * This function builds a mindmap when the user select a folder
   */
  private buildMindmap(group: Group) {

    const mindMap = new MindMap(group.title, group.MindMap.data);
    // "Subscribe" for an event.
    mindMap.onDataChanged = (mindmap) => {
      this.dashboardService.saveMindmap(group.id, mindmap).subscribe(
        (data: any) => {
          if (data.success === false) {
            alert(data.message);
          }
        },
        error => alert(error.message)
      );
    };

    /**
     * TODO: Bad solution
     * The ngIf removes the DOM element, and to fast to catch without timeout.
     */
    setTimeout(() => {
      /**
       * If you use just this.mindMap, then vis will not able the reach childNodes function.
       * That is why we have to use the NativeElement for it.
       */
      mindMap.buildMap(this.mindMap.nativeElement);

      /**
       * If the user select a node, then shows the related questions.
       */
      mindMap.network.on('selectNode', (params) => {
        const stormFilter: HTMLInputElement = this.stormFilter.nativeElement;
        /** https://stackoverflow.com/questions/31865910/in-the-vis-javascript-library-how-do-i-get-the-node-from-its-node-id/31874209 */
        const selectedNode: NodeOptions = mindMap.nodes.get(params.nodes[0]);
        stormFilter.value = selectedNode.label;

        this.stormArray = this.selectedGroup.stormArray.filter((storm) => {
          return storm.question.toLocaleLowerCase().includes(selectedNode.label.toLowerCase()) ||
            storm.answer.toLocaleLowerCase().includes(selectedNode.label.toLowerCase()) ||
            stringSimilarity.compareTwoStrings(storm.question.toLocaleLowerCase(), selectedNode.label.toLowerCase()) >= 0.6 ||
            stringSimilarity.compareTwoStrings(storm.answer.toLocaleLowerCase(), selectedNode.label.toLowerCase()) >= 0.6;
        });
      });

      mindMap.network.on('deselectNode', () => {
        this.stormFilter.nativeElement.value = '';
        this.stormArray = this.selectedGroup.stormArray;
      });

    }, 0);
  }

  /**
   * This function been called when the user clicks to an element from the groupList
   * @param group The selected group
   */
  onGroupItemSelected(group: Group) {
    this.selectedGroup = group;

    if (group.stormArray) {
      this.stormArray = group.stormArray;
    }

    /**
     * https://stackoverflow.com/questions/43945548/scroll-to-element-on-click-in-angular-4/43945776
     * NOTE: This setTimeout needs because if you don't use it, then
     * it will not scroll down to the element when you select first.
     * It because I use *ngIf="". The ngIf destroy the div element, and
     * first time, it not exists.
     */
    setTimeout(() => {
      const objDiv = document.getElementById('storm');
      objDiv.scrollIntoView();
    }, 0);

    // Build the mindmap of the group
    this.buildMindmap(group);
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

      const group: Group = new Group(this.uniqueIdGenerator(), this.newGroup.title, []);
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
        this.newStorm = new Storm(this.uniqueIdGenerator(), '', [], '');
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
   * This function generates a unique id for groups and storms.
   * I don't use database for storing the data.
   * https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  private uniqueIdGenerator() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
