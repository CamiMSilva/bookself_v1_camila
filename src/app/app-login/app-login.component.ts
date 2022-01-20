import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

import { AutentFirebaseService } from './../servicosInterface/autent-firebase.service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent {
  formularioLogin = this.loginBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', Validators.required)
  })

  constructor(
    private loginBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public conteudo:string,
    private toast: HotToastService,
    private rotas: Router,
    private autentFirebaseService: AutentFirebaseService) {}
    get email() {
      return this.formularioLogin.get('email')
    }
    get senha() {
      return this.formularioLogin.get('senha')
    }
    loginFirebase() {
      if (!this.formularioLogin.valid) {
        return;
      }
      const {email, senha}= this.formularioLogin.value
      this.autentFirebaseService.loginUsuario(email, senha)
      .pipe(
        this.toast.observe({
          success: 'login válido, obrigado',
          loading: 'Redirecionando...',
          error: 'Algo deu errado'
        })
      ).subscribe(() =>{
        this.rotas.navigate(['/cdd'])
      })
    }

  onSubmit() {

  }
}
