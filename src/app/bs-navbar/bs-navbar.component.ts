import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { AuthService } from './../auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';



@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

  constructor(private auth: AuthService ,
              private cartService: ShoppingCartService) {
   auth.appUser$.subscribe(appUser => this.appUser = appUser);
    
   }

   logout(){
    this.auth.logout();
}

 
ngOnInit(){

  this.cart$=this.cartService.getCart();
}
}