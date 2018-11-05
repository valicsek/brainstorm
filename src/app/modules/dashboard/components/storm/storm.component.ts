import { StormService } from './storm.service';
import { Component, OnInit, Input } from '@angular/core';
import { Storm } from '../../models/storm.model';
import { Group } from '../../models/group.model';

@Component({
  selector: 'app-storm',
  templateUrl: './storm.component.html',
  styleUrls: ['./storm.component.css']
})
export class StormComponent implements OnInit {

  @Input('group') group: Group;
  /** This attribute contains the storm data */
  @Input('data') data: Storm;

  constructor(
    private stormService: StormService
  ) { }

  ngOnInit() {
  }

  onStormDelete() {
    this.stormService.delete(this.group.id, this.data.id).subscribe(
      (data: any) => {
        if (data.success) {
          alert(data.message);
        }
      },
      error => alert(error.message)
    );
  }

}
