import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {
  public minutes: string = '25';
  public seconds: string = '00';
  public minutesToUse: string;
  public secondsToUse: string;
  public numberOfPomodoros: number = 0;
  public startTime: number = 0;
  public timerInterval: any;
  public timerIsRunning: boolean = false;
  public pauseStartTime: number = 0;
  public pausedTime: number = 0;
  public playOrPauseClassName: string = 'timer-button fa fa-play';

  constructor() { }

  public startOrPauseTimer(): void {
    if (!this.timerIsRunning) {
      if (this.pauseStartTime !== 0) {
        this.pausedTime += new Date().getTime() - this.pauseStartTime;
      }
      this.playOrPauseClassName = 'timer-button fa fa-pause';
      this.startTimerTracking();
    } else if (this.timerIsRunning) {
      clearInterval(this.timerInterval);
      this.timerIsRunning = false;
      this.pauseStartTime = new Date().getTime();
      this.playOrPauseClassName = 'timer-button fa fa-play';
    }
  }

  public startTimerTracking(): void {
    if (this.startTime === 0) {
      this.startTime = new Date().getTime();
    }
    this.timerIsRunning = true;
    this.timerInterval = setInterval(() => { this.getTimeRemaining(); }, 100);
  }

  public getTimeRemaining(): void {
    let milliseconds: number;
    if (!this.minutesToUse && !this.secondsToUse) {
      this.minutesToUse = this.minutes;
      this.secondsToUse = this.seconds;
    }
    milliseconds = (+this.minutesToUse * 60000) + (+this.secondsToUse * 1000) - (Date.now() - this.startTime - this.pausedTime);
    this.convertTime(milliseconds);
  }

  public convertTime(milliseconds: number): void {
    const totalSeconds: number = Math.floor(milliseconds / 1000);
    const minutes: string = this.addZeroToTimeRemainingIfNeeded(Math.floor(totalSeconds / 60));
    const seconds: string = this.addZeroToTimeRemainingIfNeeded(totalSeconds - (+minutes * 60));
    this.minutes = minutes;
    this.seconds = seconds;
    this.checkIfTimerIsFinished(totalSeconds);
  }

  public addZeroToTimeRemainingIfNeeded(minutesOrSeconds: number): string {
    if (minutesOrSeconds.toString().length >= 2) { return minutesOrSeconds.toString(); }
    return (Math.pow(10, 2) + Math.floor(minutesOrSeconds)).toString().substring(1);
  }

  public checkIfTimerIsFinished(timeLeft: number): void {
    if (timeLeft < 0) {
      clearInterval(this.timerInterval);
      this.timerIsRunning = false;
      this.pausedTime = 0;
      this.startTime = 0;
      this.minutesToUse = undefined;
      this.secondsToUse = undefined;
      this.playOrPauseClassName = 'timer-button fa fa-play';
      if (this.numberOfPomodoros % 2 === 0) {
        this.minutes = '05';
        this.seconds = '00';
      } else {
        this.minutes = '25';
        this.seconds = '00';
      }
      this.numberOfPomodoros++;
    }
  }

  public stopTimer(): void {
    this.playOrPauseClassName = 'timer-button fa fa-play';
    clearInterval(this.timerInterval);
    this.timerIsRunning = false;
    this.pausedTime = 0;
    this.pauseStartTime = 0;
    this.startTime = 0;
    this.minutesToUse = undefined;
      this.secondsToUse = undefined;
    if (this.numberOfPomodoros % 2 === 0) {
      this.minutes = '25';
      this.seconds = '00';
    } else {
      this.minutes = '05';
      this.seconds = '00';
    }
  }

  public addMinutes(): void {
    if (this.timerIsRunning) { return; }

    let minutes: number = +this.minutes;
    minutes++;
    if (minutes < 10) {
      this.minutes = `0${minutes}`;
    } else if (minutes <= 60) {
      this.minutes = minutes.toString();
    }
  }

  public subtractMinutes(): void {
    if (this.timerIsRunning) { return; }

    let minutes: number = +this.minutes;
    minutes--;
    if (minutes >= 10 && minutes < 100) {
      this.minutes = minutes.toString();
    } else if (minutes < 10 && minutes >= 0) {
      this.minutes = `0${minutes}`;
    }
  }

  public addSeconds(): void {
    if (this.timerIsRunning) { return; }

    let seconds: number = +this.seconds;
    seconds++;
    if (seconds < 10) {
      this.seconds = `0${seconds}`;
    } else if (seconds <= 60) {
      this.seconds = seconds.toString();
    }
  }

  public subtractSeconds(): void {
    if (this.timerIsRunning) { return; }

    let seconds: number = +this.seconds;
    seconds--;
    if (seconds >= 10) {
      this.seconds = seconds.toString();
    } else if (seconds < 10 && seconds >= 0) {
      this.seconds = `0${seconds}`;
    }
  }

}
