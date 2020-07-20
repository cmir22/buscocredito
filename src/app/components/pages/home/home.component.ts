import { Component, OnInit } from '@angular/core';

import { PostService} from '../../posts/post.service';
import { PostI} from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts: {
    id: string;
    titlePost: string;
    contentPost: string;
    imagePost: string;
  }[] = [
      {
        id: '1',
        titlePost: 'Post1',
        contentPost: `El crédito es un préstamo de dinero que genera un compromiso de devolución futura.
      El crédito es un préstamo de dinero que una parte otorga a otra, con el compromiso de que, en el futuro, quien lo recibe devolverá dicho préstamo en forma gradual (mediante el pago de cuotas) o en un solo pago y con un interés adicional que compensa a quien presta, por todo el tiempo que no tuvo ese dinero.  
      Cuando el crédito es de consumo, éste permite disponer de una cantidad de dinero para la adquisición de bienes de consumo o el pago de servicios.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '2',
        titlePost: 'Post2',
        contentPost: `El crédito es un préstamo de dinero que genera un compromiso de devolución futura.
      El crédito es un préstamo de dinero que una parte otorga a otra, con el compromiso de que, en el futuro, quien lo recibe devolverá dicho préstamo en forma gradual (mediante el pago de cuotas) o en un solo pago y con un interés adicional que compensa a quien presta, por todo el tiempo que no tuvo ese dinero.  
      Cuando el crédito es de consumo, éste permite disponer de una cantidad de dinero para la adquisición de bienes de consumo o el pago de servicios.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '3',
        titlePost: 'Post3',
        contentPost: `El crédito es un préstamo de dinero que genera un compromiso de devolución futura.
      El crédito es un préstamo de dinero que una parte otorga a otra, con el compromiso de que, en el futuro, quien lo recibe devolverá dicho préstamo en forma gradual (mediante el pago de cuotas) o en un solo pago y con un interés adicional que compensa a quien presta, por todo el tiempo que no tuvo ese dinero.  
      Cuando el crédito es de consumo, éste permite disponer de una cantidad de dinero para la adquisición de bienes de consumo o el pago de servicios.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '4',
        titlePost: 'Post4',
        contentPost: `El crédito es un préstamo de dinero que genera un compromiso de devolución futura.
      El crédito es un préstamo de dinero que una parte otorga a otra, con el compromiso de que, en el futuro, quien lo recibe devolverá dicho préstamo en forma gradual (mediante el pago de cuotas) o en un solo pago y con un interés adicional que compensa a quien presta, por todo el tiempo que no tuvo ese dinero.  
      Cuando el crédito es de consumo, éste permite disponer de una cantidad de dinero para la adquisición de bienes de consumo o el pago de servicios.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      }
    ]

    public posts$ : Observable<PostI[]>;


  constructor(private postSvc: PostService) { }

  ngOnInit(): void {
    //this.postSvc.getAllPosts().subscribe(res => console.log('POST',res));
    this.posts$ = this.postSvc.getAllPosts();
  }

}
