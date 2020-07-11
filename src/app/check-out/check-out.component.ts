import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { switchMap } from 'rxjs/operators';
import { OrderService } from './../order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

 
  cart: ShoppingCart;
  cartSubscription: Subscription;
  userId: string;
  userSubscription: Subscription;

 constructor(
    private router: Router ,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService,
    private authService:AuthService ) {}
 
 ngOnInit(){
   let cart$ = this.shoppingCartService.getCart();
   this.cartSubscription = cart$.subscribe(cart => this.cart =cart);
  this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

 ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

 placeOrder(shipping){
   console.log(shipping);
   let order = {
     userId: this.userId,
     datePlaced : new Date().getTime(),
     shipping: shipping,
     items: this.cart.items,
     totalPrice:this.cart.totalPrice
       
     
   };

   let result = this.orderService.storeOrder(order);
  
   this.router.navigate(['/order-success', result.key]);
 }

}
