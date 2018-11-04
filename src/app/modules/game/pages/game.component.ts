import { GameService } from './../game.service';
import { Group } from './../../dashboard/models/group.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import stringSimilarity from 'string-similarity';
import { Storm } from '../../dashboard/models/storm.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  /** This variable contains that group what we want to study. */
  group: Group;

  /** This variable contains the id of the group what user wants to study.
   * This id can find in the url parameter.
   */
  groupId: number;

  /** This variable contains the actual index of the storm. */
  actualStormIndex: number;

  /** This variable contains the user answer. */
  answerInput: string;

  /**
   * This variable contains the status of the game.
   * true: the game stops and show results.
   * */
  userFinished: boolean;

  /**
   * This variable contains the statistic of the user.
   * Contains the number of good and bad answers.
   * The elapsed time during one storm.
   */
  stat: any;

  /**
   * This variable contains a number between 0 and 100.
   * mat-progress-bar uses it.
   */
  gameProgressValue: number;

  constructor(
    private gameService: GameService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

    // This code part get the parameter from the url and set the variable
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.groupId = params.id;
        this.gameService.getGroup(this.groupId).subscribe(
          (data: any) => {
            if (!data.success) {
              alert(data.message);
            } else {
              this.group = data.data[0];
            }
          },
          error => alert(error.message)
        );
      }
    });

    this.group = new Group(-1, '', [
      new Storm('', [], '')
    ]);
    this.gameProgressValue = 0;
    this.actualStormIndex = 0;
    this.userFinished = false;
    this.answerInput = '';
    this.stat = {
      good_answers: [],
      bad_answers: []
    };
  }

  /**
   * This function determines that is the user answer is good or not.
   * @param givenAnswer The answer what user give
   * @param realAnswer The real answer what we are waiting
   */
  private determineThatAnswerIsGood(givenAnswer, realAnswer): boolean {
    const result = stringSimilarity.compareTwoStrings(givenAnswer, realAnswer);
    return result >= 0.80;
  }

  /**
   * This function calls when user clicks to the submit button.
   * It changes the actual storm index.
   * Checkes whether the game has finished or not yet.
   * Create statistic for statistic variable.
   * Reset the answer input
   */
  onSubmitClick(): void {
    const storm = this.group.stormArray[this.actualStormIndex];

    if (!this.answerInput) {
      alert('Answer is missing!');
    } else {
      const isUserKnow = this.determineThatAnswerIsGood(this.answerInput, storm.answer);

      if (isUserKnow) {
        this.snackBar.open('Perfect!', 'OK', {
          duration: 1000,
          verticalPosition: 'top',
          panelClass: 'snackbar-good'
        });
        this.stat.good_answers.push({
          storm,
          answer: this.answerInput,
          time_elapsed: 0
        });
      } else {
        this.snackBar.open(`Wrong! The answer should be "${storm.answer}"`, 'OK', {
          verticalPosition: 'top',
          panelClass: 'snackbar-bad',
          duration: 5000,
        });
        this.stat.bad_answers.push({
          storm,
          answer: this.answerInput,
          time_elapsed: 0
        });
      }
    }
    this.answerInput = '';

    this.actualStormIndex++;
    this.gameProgressValue = (this.actualStormIndex / this.group.stormArray.length) * 100;

    if (!this.group.stormArray[this.actualStormIndex]) {
      this.userFinished = true;
      // alert('You finished with the storms');
    }
  }

  /**
   * This function calls when the user clicks to the back logo button
   * Also asks a confirmation from the user.
   */
  onBackLogoClicked() {
    if (confirm('Are you sure you want to finish?')) {
      this.router.navigate(['dashboard']);
    }
  }

  onRestartButtonClicked() {
    location.reload();
  }

}
