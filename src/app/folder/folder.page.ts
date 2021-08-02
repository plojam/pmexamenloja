import { Component, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../domain/producto';
import { AngularFireAuth } from '@angular/fire/auth';
import { Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Subscription } from 'rxjs';
import { trace } from '@angular/fire/performance';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  private readonly userDisposable: Subscription|undefined;

  showLoginButton = false;
  showLogoutButton = false;

  pedido: Array<Producto> = new Array<Producto>();

  constructor(private route: ActivatedRoute, private router:Router, public readonly auth: AngularFireAuth, @Inject(PLATFORM_ID) platformId: object) { 
    if (!isPlatformServer(platformId)) {
      this.userDisposable = this.auth.authState.pipe(
        trace('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit() {
    this.folder = this.route.snapshot.paramMap.get('id');
  }

  pedir(){
    let params: NavigationExtras = {
      queryParams:{
        pedido:this.pedido,
      }
    }
    this.router.navigate(["/listado"],params)
  }

  async login() {
    const user = await this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log(user);
    // TODO sign into offline app
  }

}
