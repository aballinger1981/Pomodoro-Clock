import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-tomato',
  templateUrl: './tomato.component.html',
  styleUrls: ['./tomato.component.css']
})
export class TomatoComponent implements OnInit {
  @ViewChild('tomato') tomato: ElementRef;

  constructor(
    public timerService: TimerService,
    public renderer: Renderer
  ) { }

  ngOnInit() {
  }

  public setFocus(): void {
    this.renderer.invokeElementMethod(this.tomato.nativeElement, 'focus', []);
  }

}
