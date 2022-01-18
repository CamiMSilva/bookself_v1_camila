import { MenuNavegador } from './../modelosInterface/menu-navegador';
import { NavegacaoService } from './../servicosInterface/navegacao.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, catchError, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.scss']
})
export class NavegacaoComponent {
  //Itens do menu principal
  tituloNav = 'BookShelf V1'
  usuario= {username:'Victor Icoma' , icone: 'remember_me'}
  //Itens da barra superior
  tituloBarra = '[Sua Estante Virtual]'
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

  constructor(private breakpointObserver: BreakpointObserver,
    private navegacaoService: NavegacaoService) {
    this.itensMenu$ = navegacaoService.listagemMenu()
    .pipe(
      catchError(error => {
        return of ([])
      })
    )
  }
}
