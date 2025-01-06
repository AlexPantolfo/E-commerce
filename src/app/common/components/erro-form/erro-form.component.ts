import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-erro-form',
  imports: [CommonModule],
  templateUrl: './erro-form.component.html',
  styleUrls: ['./erro-form.component.scss']
})
export class ErroFormComponent {

  @Input() campo: any;

  erroMensagem() {
    if (!!(this.campo.status === "INVALID") && this.campo.touched) {
      if (this.campo.hasError('required')) {
        return 'Campo obrigatório';
      } else if (this.campo.hasError('camposNaoIguais')) {
        return 'As senhas devem ser iguais';
      }

      if (this.campo.hasError('emailInvalido')) {
        return 'Formato de e-mail inválido';
      }

      else return ''
    }
    else return ''
  }

}
