import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart{

    // constructor(public items: ShoppingCartItem[]){

    // }

    items: ShoppingCartItem[] = [];
    sum: number;

    

    constructor(data?: Partial<ShoppingCart>)
     {
        Object.assign(this, data);
    }


    // items: ShoppingCartItem[] = [];
   

    // constructor(public itemsMap: {[productId: string]: ShoppingCartItem})
    //  {
       
    //     for ( let productId in itemsMap){
    //         let item = itemsMap[productId];
    //         this.items.push(new ShoppingCartItem(item.product, item.quantity));
    //     }
    // }

    getQuantity(product: Product){
        
        let item =  this.items[product.key];
        return item ? item.quantity : 0;
        }
      

    get productIds(){
    return Object.keys(this.items);
    }
    get totalItemCount(){
        let  count =0;
        for(let productId in this.items)
            count +=this.items[productId].quantity;
        return count;
          
    }


    get totalPrice(){
        this.sum =0;
          for(let productId in this.items)
              this.sum +=this.items[productId].product.price * this.items[productId].quantity;
          return this.sum;

      }
    

}