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

  /**
   * Incrementa a ID utilizada para gravação das atividades
   */
  nextId(): number {
    return this.lastID++;
  }

  /**
   * Grava uma nova atividade
   * @param activity Atividade a ser gravada
   */
  create(activity: Activities) {
    this.activities.push(activity);
  }

  /**
   * Lê todas as atividades gravadas
   */
  read() {
    return of(this.activities);
  }

  /**
   * Retorna true se a atividade estiver ativa
   */
  public get isActive() {
    return this.activeNow
  }

  /**
   * Muda o status da aplicação para true (se o botão finalizar for clicado) e false (se o botão iniciar for clicado).
   * Utilizado para correta exibição dos estados da aplicação
   */
  changeActivityStatus() {
    this.activeNow = !this.activeNow
  }

  /**
   * Inicia uma nova atividade com a data inicial preenchida e altera o status da aplicação
   */
  start() {
    this.actualActivity = {
      id: null,
      activity: null,
      start: new Date,
      end: null
    }
    this.changeActivityStatus();
  }

  /**
   * Finaliza uma atividade, gravando a atividade e alterando o status da aplicação.
   * @param activityDescription Identificador textual da atividade realizada
   */
  finish(activityDescription: string) {
    this.actualActivity.end = new Date
    this.actualActivity.activity = activityDescription
    this.actualActivity.id = this.nextId()
    this.create(this.actualActivity)
    this.actualActivity = null
    this.changeActivityStatus();
  }

}
