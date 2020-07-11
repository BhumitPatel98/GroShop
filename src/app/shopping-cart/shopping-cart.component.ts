import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  constructor(private ShoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.cart$ = this.ShoppingCartService.getCart();
  }

  clearCart(){
    this.ShoppingCartService.clearCart();
  }

}
