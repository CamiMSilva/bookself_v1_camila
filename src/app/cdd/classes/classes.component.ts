import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  livrosGenero: any[]=[];
  visaoColunas=['_idGenero', 'nomeGenero', 'decimalGenero']

  constructor() { }

  ngOnInit(): void {
  }

}
