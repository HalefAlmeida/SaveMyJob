import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Activities {
  id: number,
  activity: string,
  start: Date,
  end: Date
}

@Injectable({
  providedIn: 'root'
})

export class ActivitiesService {
  create(activity: Activities) {
    this.activities.push(activity);
  }

  activities: Activities[] = []

  constructor() { }

  read() {
    return of(this.activities);
  }
}
