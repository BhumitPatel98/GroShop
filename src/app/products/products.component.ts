import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy  {
  
  products: any[]; 
  filteredProducts: Product[] = [];
  category: string;
  categories$;
  cart;
  sub: Subscription;
  product: Product;
 
  constructor(
              
              productService: ProductService,
              route: ActivatedRoute, 
              categoryservice: CategoryService,
             private cartService: ShoppingCartService) 
    {
   
    productService
      .getall()
      .pipe(switchMap(products => {
          this.products = products;
          return route.queryParamMap;
      }))
      .subscribe(param => {
        this.category = param.get('category');
  
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
      this.categories$=categoryservice.getCategories();
    }
  
   ngOnInit() {

   this.sub =  ( this.cartService.getCart())
            .subscribe(cart => this.cart=cart);
   
  }

  ngOnDestroy() {

    this.sub.unsubscribe();
  
  }

    
}

