import { ValidatorFn, FormControl, Validators, Form, FormGroup, AbstractControl, FormGroupDirective, NgForm, ControlContainer, ValidationErrors, FormArray } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class GenericValidator {
  constructor() { }

  /**
   * Funcao de validacao customizada para o
   * campo de e-mail da secao de Endereco
   * **/
  static validacaoEmail(control: AbstractControl) {

    if (control.value) {

      let blackListEmails = [
        "test@test.com",
        "test@test.com.br",
        "teste@teste.com",
        "teste@teste.com.br",
      ];

      if (!blackListEmails.includes(control.value)) {

        const regexEmailValido = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // const regexEmailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/;
        if (!regexEmailValido.test(control.value)) {
          return { 'emailInvalido': true }
        }

      } else {
        return { 'emailInvalido': true }
      }

    }

    return null;

  }

  static validacaoTelResOuCelular(control: AbstractControl) {

    if (control.value) {
      let tel: string = control.value;
      if (tel.length <= 10) {
        if (!control.value.match("((10)|([1-9][1-9]))[2-5][0-9]{3}[0-9]{4}")) {
          return { 'telefoneInvalido': true }
        }
      } else {
        if (!control.value.match("((10)|([1-9][1-9]))9[1-9][0-9]{3}[0-9]{4}")) {
          return { 'telefoneInvalido': true }
        }
      }


    }

    return null;

  }

  // Valida um arquivo baseado no tipo MIME, não na extensão, dele.
  static validacaoTipoArquivo(mime: String[]): any {
    return function (control: FormControl) {
      const file = control.value;
      if (!file?.size) return null;

      if (!mime.includes(file?.type)) {
        console.log(file);
        console.log(mime + ";" + file?.type);
        console.log(mime == file?.type);
        return { 'tipoArquivoInvalido': true }
      }
      return null;
    }
  }


  static camposIguaisValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      const controlValue = control.value;
      const matchingControlValue = matchingControl.value;

      if (controlValue !== matchingControlValue) {
        matchingControl.setErrors({ 'camposNaoIguais': true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }
}
