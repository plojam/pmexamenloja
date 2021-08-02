import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../domain/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss'],
})
export class ListadoPage implements OnInit {

  productos:any;
  pedido: Array<Producto> = new Array<Producto>();

  constructor(private route: ActivatedRoute, private router:Router, private productoServece: ProductoService) { 
    route.queryParams.subscribe(params =>{
      this.pedido = params.pedido
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.pedido = this.router.getCurrentNavigation().extras.queryParams.pedido;
      };
    })
  }

  ngOnInit() {
    this.productos = this.productoServece.getContactos();
  }

  producto(p:Producto){
    console.log(this.pedido.length)
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
        producto:p,
      }
    }
    this.router.navigate(["/producto"],params)
  }

  pedir(){
    console.log(this.pedido.length)
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
      }
    }
    this.router.navigate(["/carrito"],params)
  }

}
