import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { Generos } from './../modelos/generos';
import { GenerosService } from './../service/generos.service';
import { AppDialogosComponent } from 'src/app/app-compartilhado/app-dialogos/app-dialogos.component';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  livrosGenero$: Observable <Generos[]>;
  visaoColunas=['_idGenero', 'nomeGenero', 'decimalGenero']

  constructor(
    private generosService: GenerosService,
    public dialogo: MatDialog
    ) {
    this.livrosGenero$ = generosService.listagemGeneros().pipe(
      catchError(error => {
        this.abrirDialogoErro('Erro ao carregar a tabela: #BS-'+ error.status)
        return of ([])

      })
    )
   }

    abrirDialogoErro(erroMsg: string){
      this.dialogo.open(AppDialogosComponent, {
        data: erroMsg
      })
   }

  ngOnInit(): void {
  }

}
