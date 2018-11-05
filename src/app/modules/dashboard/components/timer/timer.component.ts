import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  /**
  * This variable contains the amount of minutes
  * what user wants to study.
  */
  minutesForStudy: number;

  /**
   * A Timer for students
   */
  timer: any;


  constructor() { }

  ngOnInit() {
    this.minutesForStudy = 25;
  }

  onStartTimer() {
    /**
     * If the user clicks more than 1 times it is going to be faster.
     * But with this, we can deny the number of clicking :)
     */
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.minutesForStudy--;
      if (this.minutesForStudy <= 0) {
        this.onStopTimer();
        this.playNotificationSound();
        alert('Go to walk or eat something :)!');
        this.minutesForStudy = 25;
      }
    }, 60000);
  }

  onStopTimer() {
    clearInterval(this.timer);
  }

  /**
   * https://stackoverflow.com/questions/44883501/play-sound-in-angular-4?rq=1
   */
  private playNotificationSound() {
    const audio = new Audio();
    audio.src = '../../../assets/audio/take_pause_sound.mp3';
    audio.load();
    audio.play();
  }
}
