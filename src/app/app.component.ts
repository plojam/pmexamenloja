import { Component } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Producto } from './domain/producto';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  pedido: Array<Producto> = new Array<Producto>();

  public appPages = [
    { title: 'Listado', url: '/listado', icon: 'mail' },
  ];
  constructor(private route: ActivatedRoute, private router:Router) {}

  producto(p:Producto){
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
      }
    }
    this.router.navigate(["/listado"],params)
  }
}
