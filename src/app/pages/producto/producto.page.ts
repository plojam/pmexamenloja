import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/domain/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  pedido: Array<Producto> = new Array<Producto>();
  producto:Producto;

  constructor(private route: ActivatedRoute, private router:Router, private productoService:ProductoService) { 
    route.queryParams.subscribe(params =>{
      this.pedido = params.pedido;
      this.producto = params.producto;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.pedido = this.router.getCurrentNavigation().extras.queryParams.pedido;
        this.producto = this.router.getCurrentNavigation().extras.queryParams.producto;
      };
    })
  }

  ngOnInit() {
    console.log(this.pedido)
  }

  agregar(){
    console.log(this.pedido.length)
    this.pedido.push(this.producto);
    
    console.log(this.pedido)

    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
      }
    }
    this.router.navigate(["/listado"],params)
  }

  volver(){

    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
      }
    }
    this.router.navigate(["/listado"],params)
  }

}
