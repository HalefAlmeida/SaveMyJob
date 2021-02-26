import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  /**
   * Retorna uma mensagem de erro com base no validador utilizado no controle do formulário reativo
   * @param control Controle do formulário em que o erro deverá ser verificado
   */
  getErrorMessage(form: FormGroup, control: string) {
    if (form.get(control).hasError('email')) {
      return 'Um email válido deve ser informado';
    } else if (form.get(control).hasError('minlength')) {
      return 'O valor mínimo permitido é de 10 caracteres';
    } else if (form.get(control).hasError('required')) {
      return 'Um valor deve ser informado para o campo';
    }


    if (form.get(control).hasError('minlength')) {
      return 'O valor mínimo permitido é de 10 caracteres';
    } else if (form.get(control).hasError('maxlength')) {
      return 'O valor máximo permitido é de 20 caracteres';
    } else if (form.get(control).hasError('required')) {
      return 'Um valor deve ser informado para o campo';
    };

    return form.get(control).hasError('email') ? 'O valor informado não é um e-mail válido' : '';
  }
}
