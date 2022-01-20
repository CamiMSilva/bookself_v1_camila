import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { AppLoginComponent } from './../app-login/app-login.component';
import { MenuNavegador } from './../modelosInterface/menu-navegador';
import { AutentFirebaseService } from './../servicosInterface/autent-firebase.service';
import { NavegacaoService } from './../servicosInterface/navegacao.service';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent {
  usuario$ = this.autentFirebaseService.usuarioLogado$
  //Itens do menu principal
  tituloNav = 'BookShelf V1'

  //Itens de ícones e imagens de navegação
  iconeGeral = '../../assets/imagens/ShelfBook.png'
  lIcone='80'
  aIcone='80'
  //Controle das rotas do menu
  itensMenu$: Observable <MenuNavegador[]>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private navegacaoService: NavegacaoService,
    private telaLogin: MatDialog,
    private rotas: Router,
    private autentFirebaseService: AutentFirebaseService
    ) {
    this.itensMenu$ = navegacaoService.listagemMenu()
    .pipe(
      catchError(error => {
        return of ([])
      })
    )
  }
  abrirLogin(errorMsg: string) {
      this.telaLogin.open(AppLoginComponent, {
        data: errorMsg
      })
  }
  sairUsuario(){
    this.autentFirebaseService.sairLogin().subscribe(() => {
      this.rotas.navigate([''])
    })
  }
}
