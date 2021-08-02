import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/domain/producto';
import { ProductoService } from '../../services/producto.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  pedido: Array<Producto> = new Array<Producto>();

  constructor(private route: ActivatedRoute, private router:Router, private productoService:ProductoService, private callNumber: CallNumber) { 
    route.queryParams.subscribe(params =>{
      this.pedido = params.pedido;
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.pedido = this.router.getCurrentNavigation().extras.queryParams.pedido;
      };
    })
  }

  ngOnInit() {
  }

  eliminar(p:Producto){
    this.pedido.forEach((element,index)=>{
      if(element.nombre==p.nombre) this.pedido.splice(index,1);
    });
  }

  volver(){

    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
      }
    }
    this.router.navigate(["/listado"],params)
  }

  llamar(){
    this.callNumber.callNumber("0996521478", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

}
