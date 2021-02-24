import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Activities, ActivitiesService } from 'src/app/shared/services/activities.service';


@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {

  activityForm: FormGroup

  activities$: Observable<Activities[]>

  activityDescription: string = null

  // hasUnitNumber = false;

  // states = [
  //   {name: 'Alabama', abbreviation: 'AL'},
  //   {name: 'Alaska', abbreviation: 'AK'},
  //   {name: 'American Samoa', abbreviation: 'AS'},
  //   {name: 'Arizona', abbreviation: 'AZ'},
  //   {name: 'Arkansas', abbreviation: 'AR'},
  //   {name: 'California', abbreviation: 'CA'},
  //   {name: 'Colorado', abbreviation: 'CO'},
  //   {name: 'Connecticut', abbreviation: 'CT'},
  //   {name: 'Delaware', abbreviation: 'DE'},
  //   {name: 'District Of Columbia', abbreviation: 'DC'},
  //   {name: 'Federated States Of Micronesia', abbreviation: 'FM'},
  //   {name: 'Florida', abbreviation: 'FL'},
  //   {name: 'Georgia', abbreviation: 'GA'},
  //   {name: 'Guam', abbreviation: 'GU'},
  //   {name: 'Hawaii', abbreviation: 'HI'},
  //   {name: 'Idaho', abbreviation: 'ID'},
  //   {name: 'Illinois', abbreviation: 'IL'},
  //   {name: 'Indiana', abbreviation: 'IN'},
  //   {name: 'Iowa', abbreviation: 'IA'},
  //   {name: 'Kansas', abbreviation: 'KS'},
  //   {name: 'Kentucky', abbreviation: 'KY'},
  //   {name: 'Louisiana', abbreviation: 'LA'},
  //   {name: 'Maine', abbreviation: 'ME'},
  //   {name: 'Marshall Islands', abbreviation: 'MH'},
  //   {name: 'Maryland', abbreviation: 'MD'},
  //   {name: 'Massachusetts', abbreviation: 'MA'},
  //   {name: 'Michigan', abbreviation: 'MI'},
  //   {name: 'Minnesota', abbreviation: 'MN'},
  //   {name: 'Mississippi', abbreviation: 'MS'},
  //   {name: 'Missouri', abbreviation: 'MO'},
  //   {name: 'Montana', abbreviation: 'MT'},
  //   {name: 'Nebraska', abbreviation: 'NE'},
  //   {name: 'Nevada', abbreviation: 'NV'},
  //   {name: 'New Hampshire', abbreviation: 'NH'},
  //   {name: 'New Jersey', abbreviation: 'NJ'},
  //   {name: 'New Mexico', abbreviation: 'NM'},
  //   {name: 'New York', abbreviation: 'NY'},
  //   {name: 'North Carolina', abbreviation: 'NC'},
  //   {name: 'North Dakota', abbreviation: 'ND'},
  //   {name: 'Northern Mariana Islands', abbreviation: 'MP'},
  //   {name: 'Ohio', abbreviation: 'OH'},
  //   {name: 'Oklahoma', abbreviation: 'OK'},
  //   {name: 'Oregon', abbreviation: 'OR'},
  //   {name: 'Palau', abbreviation: 'PW'},
  //   {name: 'Pennsylvania', abbreviation: 'PA'},
  //   {name: 'Puerto Rico', abbreviation: 'PR'},
  //   {name: 'Rhode Island', abbreviation: 'RI'},
  //   {name: 'South Carolina', abbreviation: 'SC'},
  //   {name: 'South Dakota', abbreviation: 'SD'},
  //   {name: 'Tennessee', abbreviation: 'TN'},
  //   {name: 'Texas', abbreviation: 'TX'},
  //   {name: 'Utah', abbreviation: 'UT'},
  //   {name: 'Vermont', abbreviation: 'VT'},
  //   {name: 'Virgin Islands', abbreviation: 'VI'},
  //   {name: 'Virginia', abbreviation: 'VA'},
  //   {name: 'Washington', abbreviation: 'WA'},
  //   {name: 'West Virginia', abbreviation: 'WV'},
  //   {name: 'Wisconsin', abbreviation: 'WI'},
  //   {name: 'Wyoming', abbreviation: 'WY'}
  // ];

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      activity: [null, [Validators.required, Validators.minLength(10)]],
      // firstName: [null, Validators.required],
      // lastName: [null, Validators.required],
      // address: [null, Validators.required],
      // address2: null,
      // city: [null, Validators.required],
      // state: [null, Validators.required],
      // postalCode: [null, Validators.compose([
      //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
      // ],
      // shipping: ['free', Validators.required]
    });

    this.activities$ = this.activitiesService.read()
  }

  get activeNow() {
    return this.activitiesService.isActive
  }

  onSubmit() {
    if (!this.activitiesService.isActive) {
      this.activitiesService.start();
    } else {

      this.activitiesService.finish(this.activityForm.value['activity'])
      this.activityForm.reset()
    }
  }

  create(actualActivity: Activities) {
    this.activitiesService.create(actualActivity)
  }

  getErrorMessage(control) {
    if (this.activityForm.get(control).hasError('minlength')) {
      return 'O valor mínimo permitido é de 10 caracteres';
    } else if (this.activityForm.get(control).hasError('required')) {
      return 'Um valor deve ser informado para o campo';
    }
  }
}
