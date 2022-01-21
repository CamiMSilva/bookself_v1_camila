import { HotToastService } from '@ngneat/hot-toast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { AutentFirebaseService } from './../servicosInterface/autent-firebase.service';
import { Router } from '@angular/router';

export function PasswordMatchValidator(): ValidatorFn {
  return(control: AbstractControl): ValidationErrors | null => {
    const senha = control.get('senha')?.value;
    const confirma = control.get('confirmaSenha')?.value;

    if (senha && confirma && senha !==confirma) {
      return {
        senhaConfirmada: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-app-cadastro',
  templateUrl: './app-cadastro.component.html',
  styleUrls: ['./app-cadastro.component.scss']
})
export class AppCadastroComponent implements OnInit {
  formularioCadastro = this.loginBuilder.group({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required),
    confirmaSenha: new FormControl('', Validators.required)},
  {validators: PasswordMatchValidator()}
  )

  constructor(
    private loginBuilder: FormBuilder,
    private autentFirebaseService: AutentFirebaseService,
    private toast: HotToastService,
    private rotas: Router

  ) { }
  get nome() {
    return this.formularioCadastro.get('nome')
  }
  get email() {
    return this.formularioCadastro.get('email')
  }
  get senha() {
    return this.formularioCadastro.get('senha')
  }
  get confirmaSenha() {
    return this.formularioCadastro.get('confirmaSenha')
  }
  enviaCadastro(){
    if(!this.formularioCadastro.valid) {
      return;
    }
    const {nome, email, senha} = this.formularioCadastro.value;
    this.autentFirebaseService.cadastrarUsuario(nome, email,senha)
    .pipe(
      this.toast.observe({
        success: 'Cadastro feito com sucesso!',
        loading: 'Enviando informações...',
        error: ({message}) => `Houve um problema: #BS${message}`,
      })
    ).subscribe(() => {
      this.rotas.navigate(['/'])
    })
  }

  ngOnInit(): void {
  }

}
