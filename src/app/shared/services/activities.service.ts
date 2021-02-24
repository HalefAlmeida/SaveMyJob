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

  lastID: number = 1;

  nextId(): number {
    return this.lastID++;
  }
  create(activity: Activities) {
    this.activities.push(activity);
  }

  activities: Activities[] = []

  constructor() { }

  read() {
    return of(this.activities);
  }
}
