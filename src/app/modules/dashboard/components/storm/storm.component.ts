import { Component, OnInit, Input } from '@angular/core';
import { Storm } from '../../models/storm.model';

@Component({
  selector: 'app-storm',
  templateUrl: './storm.component.html',
  styleUrls: ['./storm.component.css']
})
export class StormComponent implements OnInit {

  /** This attribute contains the storm data */
  @Input('data') data: Storm;

  constructor() { }

  ngOnInit() {
  }

}
