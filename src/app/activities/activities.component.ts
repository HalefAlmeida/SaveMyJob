import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activities, ActivitiesService } from '../shared/shared/activities.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

  activities$: Observable<Activities[]>

  activeNow: boolean = false

  actualActivity: Activities

  constructor(
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit(): void {
    this.activities$ = this.activitiesService.read()
  }

  onClick() {
    if (!this.activeNow) {
      this.activeNow = true
      this.actualActivity = {
        id: 1,
        activity: 'teste',
        start: new Date,
        end: null
      }
    } else {
      this.activeNow = false
      this.actualActivity.end = new Date
      this.create(this.actualActivity)
    }
    console.log(this.actualActivity);

  }
  create(actualActivity: Activities) {
    this.activitiesService.create(actualActivity)
  }

}
