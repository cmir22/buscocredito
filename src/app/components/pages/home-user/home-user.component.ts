import { Component, OnInit } from '@angular/core';

// PARA SABER CUANDO ESTA AUTENTIFICADO
import { PostService} from '../../posts/post.service';
import { PostI} from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';

interface creditTipe {
  value: string;
  viewValue: string;
}

interface months {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {

  credits: creditTipe[] = [
    {value: 'personal-0', viewValue: 'Personal'},
    {value: 'negocio-1', viewValue: 'Negocio'},
  ];

  month: months[] = [
    {value: 'personal-0', viewValue: '12 Meses'},
    {value: 'negocio-1', viewValue: '24 Meses'},
    {value: 'negocio-1', viewValue: '36 Meses'},
    {value: 'negocio-1', viewValue: '48 Meses'},
  ];


 /* public posts: {
    id: string;
    titlePost: string;
    contentPost: string;
    imagePost: string;
  }[] = [
      {
        id: '1',
        titlePost: 'Cruz Ibarra',
        contentPost: `El crédito es un préstamo de dinero que genera un compromiso de devolución futura.
      El crédito es un préstamo de dinero que una parte otorga a otra, con el compromiso de que, en el futuro, quien lo recibe devolverá dicho préstamo en forma gradual (mediante el pago de cuotas) o en un solo pago y con un interés adicional que compensa a quien presta, por todo el tiempo que no tuvo ese dinero.  
      Cuando el crédito es de consumo, éste permite disponer de una cantidad de dinero para la adquisición de bienes de consumo o el pago de servicios.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '2',
        titlePost: 'Susano Sanchez',
        contentPost: `El crédito es un préstamo de dinero que genera un compromiso de devolución futura.
      El crédito es un préstamo de dinero que una parte otorga a otra, con el compromiso de que, en el futuro, quien lo recibe devolverá dicho préstamo en forma gradual (mediante el pago de cuotas) o en un solo pago y con un interés adicional que compensa a quien presta, por todo el tiempo que no tuvo ese dinero.  
      Cuando el crédito es de consumo, éste permite disponer de una cantidad de dinero para la adquisición de bienes de consumo o el pago de servicios.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '3',
        titlePost: 'Brandon Navarro',
        contentPost: `El crédito es un préstamo de dinero que genera un compromiso de devolución futura.
      El crédito es un préstamo de dinero que una parte otorga a otra, con el compromiso de que, en el futuro, quien lo recibe devolverá dicho préstamo en forma gradual (mediante el pago de cuotas) o en un solo pago y con un interés adicional que compensa a quien presta, por todo el tiempo que no tuvo ese dinero.  
      Cuando el crédito es de consumo, éste permite disponer de una cantidad de dinero para la adquisición de bienes de consumo o el pago de servicios.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      },
      {
        id: '4',
        titlePost: 'Eduardo Collazo',
        contentPost: `El crédito es un préstamo de dinero que genera un compromiso de devolución futura.
      El crédito es un préstamo de dinero que una parte otorga a otra, con el compromiso de que, en el futuro, quien lo recibe devolverá dicho préstamo en forma gradual (mediante el pago de cuotas) o en un solo pago y con un interés adicional que compensa a quien presta, por todo el tiempo que no tuvo ese dinero.  
      Cuando el crédito es de consumo, éste permite disponer de una cantidad de dinero para la adquisición de bienes de consumo o el pago de servicios.`,
        imagePost: 'https://picsum.photos/id/237/200/300'
      }
    ]
*/
    public posts$ : Observable<PostI[]>;
  constructor(private postSvc: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postSvc.getAllPosts();
  }

}
