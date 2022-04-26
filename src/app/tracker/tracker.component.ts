import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss'],
})
export class TrackerComponent implements OnInit {
  @Input() xClick?: number;
  @Input() yClick?: number;

  constructor() {}

  ngOnInit(): void {
    console.log(this.xClick, this.yClick);
  }
}
