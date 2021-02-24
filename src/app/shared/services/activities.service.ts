import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class Activities {
  id: number;
  activity: string;
  start: Date;
  end: Date;
}

@Injectable({
  providedIn: 'root'
})

export class ActivitiesService {

  private actualActivity: Activities

  private activeNow: boolean = false

  private lastID: number = 1;

  activities: Activities[] = []

  constructor() { }

  nextId(): number {
    return this.lastID++;
  }
  create(activity: Activities) {
    this.activities.push(activity);
  }

  read() {
    return of(this.activities);
  }

  public get isActive() {
    return this.activeNow
  }

  changeActivityStatus() {
    this.activeNow = !this.activeNow
  }

  start() {
    this.actualActivity = {
      id: null,
      activity: null,
      start: new Date,
      end: null
    }
    this.changeActivityStatus();
  }

  finish(activityDescription: string) {
    this.actualActivity.end = new Date
    this.actualActivity.activity = activityDescription
    this.actualActivity.id = this.nextId()
    this.create(this.actualActivity)
    this.actualActivity = null
    this.changeActivityStatus();
  }

}
