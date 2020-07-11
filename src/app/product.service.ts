import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getall(){
    //return this.db.list('/products').valueChanges();
    return this.db.list('/products/') .snapshotChanges() 
    .pipe( map(actions => actions.map(a => ({ key: a.payload.key, ...(a.payload.val() as {}) })) ) ); 
  }

  get( productId){
    return this.db.object('/products/' + productId).valueChanges();
  }

  delete(productId){
 
    return this.db.object('products/' + productId).remove();
  }
}
