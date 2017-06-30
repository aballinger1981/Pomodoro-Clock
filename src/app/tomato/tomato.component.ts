import { Component, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-tomato',
  templateUrl: './tomato.component.html',
  styleUrls: ['./tomato.component.css']
})
export class TomatoComponent implements OnInit {

  constructor(
    public timerService: TimerService
  ) { }

  ngOnInit() {
  }

}
