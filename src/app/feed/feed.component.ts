import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent {
  /** Based on the screen size, switch from standard to one column per row */
  usuario = {username:'Victor Icoma' , icone: 'remember_me'}
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'O melhor livro de janeiro', img:'../../assets/imagens/1.png', cols: 1, rows: 1 },
          { title: 'Dicas dos leitores', img:'../../assets/imagens/2.png', cols: 1, rows: 1 },
          { title: 'Os mais comentados da semana', img:'../../assets/imagens/3.png', cols: 1, rows: 1 },
          { title: 'Indicação do time BookShelf', img:'../../assets/imagens/4.png', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'O melhor livro de janeiro', img:'../../assets/imagens/1.png', cols: 2, rows: 1 },
        { title: 'Dicas dos leitores', img:'../../assets/imagens/2.png', cols: 1, rows: 1 },
        { title: 'Os mais comentados da semana', img:'../../assets/imagens/3.png', cols: 1, rows: 2 },
        { title: 'Indicação do time BookShelf', img:'../../assets/imagens/4.png', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
