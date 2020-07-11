import { ShoppingCartService } from './shopping-cart.service';
import { AngularFireDatabase} from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, 
              private shoppingCartService: ShoppingCartService ) { }

  storeOrder(order){
    let result = this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrder(){
    return this.db.list('/orders').valueChanges();
  }

  getOrderByUser(userId:string){
    return this.db.list('/orders',ref => 
    ref.orderByChild('userId').equalTo(userId));

  }

  }
