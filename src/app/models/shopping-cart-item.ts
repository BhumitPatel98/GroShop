
import { Product } from 'src/app/models/product';
export class ShoppingCartItem {

    title: string;
    imageUrl: string;
    price: number; 
    product: Product;
    quantity: number;
    //totalPrice: number;
    //items:ShoppingCartItem[];

    // constructor(public product: Product, public quantity: number){}
    // get totalPrice()
    // {
    //     return this.product.price * this.quantity;
    // }
}

