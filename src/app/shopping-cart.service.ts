import { ShoppingCartItem } from './models/shopping-cart-item';
import { AngularFireObject } from 'angularfire2/database';
import { take } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { Product } from './models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
 
  constructor(private db:AngularFireDatabase) { }

  getCart():(Observable<ShoppingCart>){
    let cartId =  this.getOrCreateCartid()
    return this.db.object('/shopping-carts/' + cartId ).valueChanges().pipe(map(x => new ShoppingCart(x)));
  }  

  addToCart(product:Product){
    let cartId=this.getOrCreateCartid();
    let items$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);
    items$.valueChanges().pipe(take(1)).subscribe(item=>{
      console.log(item);
      if(item) items$.set({product:product,quantity:item['quantity']+1});
      else items$.set({ quantity:0 });
      return;
    });
  }

  removeFromCart(product:Product){
    let cartId=this.getOrCreateCartid();
    let items$=this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);
    items$.valueChanges().pipe(take(1)).subscribe(item=>{
      console.log(item);
      if(item) items$.set({product:product,quantity:item['quantity']-1});
      else items$.set({ quantity:1 });
      if(item['quantity']===1){
        console.log("hii");
        this.db.object('/shopping-carts/'+cartId+'/items/'+product.key).remove();
      }
      return ;
    });
    
  }

  clearCart(){
     let cartId = this.getOrCreateCartid();
      this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated:new Date().getTime()
    })
  }

  private  getOrCreateCartid(){
    let cartId=localStorage.getItem('cartId');
    if(cartId) return cartId;
  
    let result= this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
  }

  
}