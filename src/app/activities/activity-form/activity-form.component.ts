import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Activities, ActivitiesService } from 'src/app/shared/services/activities.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';


@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.css']
})
export class ActivityFormComponent implements OnInit {

  activityForm: FormGroup

  activities$: Observable<Activities[]>

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService,
    public handler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      activity: [null, [Validators.required, Validators.minLength(10)]]
    });

    this.activities$ = this.activitiesService.read()
  }

  /**
   * Obtem o status da aplicação
   */
  get activeNow() {
    return this.activitiesService.isActive
  }

  /**
   * Verifica o status do sistema para iniciar ou finalizar uma atividade
   */
  onSubmit() {
    if (!this.activitiesService.isActive) {
      this.activitiesService.start();
    } else {

      this.activitiesService.finish(this.activityForm.value['activity'])
      this.activityForm.reset()
    }
  }

  /**
     * Retorna uma mensagem de erro com base no validador utilizado no controle do formulário reativo
     * @param control Controle do formulário em que o erro deverá ser verificado
     */
  getErrorMessage(control) {
    this.handler.getErrorMessage(this.activityForm, control)
  }

}
