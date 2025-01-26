import { HttpClient } from '@angular/common/http';
import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../Environment/Environment';
import { sign } from 'crypto';


@Injectable({
  providedIn: 'root'
})
export class CartService {



  cartNum:BehaviorSubject<number> =new BehaviorSubject(0)



 
  constructor(private _httpClient:HttpClient) {
   

    // effect(()=>{


    //   localStorage.setItem('cartItems' ,'')

    // })
   }



  addProductToCart(productId:string):Observable<any>
  {

    return this._httpClient.post(`${Environment.baseUrl}/api/v1/cart`,
      {
        "productId": productId
    }
    )
  }


  updateProductQuantity(productId:string, pCount :string):Observable<any>{
    return this._httpClient.put(`${Environment.baseUrl}/api/v1/cart/${productId}`, 
      {
        "count":pCount
    }
    )
  }



  getCart():Observable<any>{
    return this._httpClient.get(`${Environment.baseUrl}/api/v1/cart`)
  }



  removeSpecitem(pId:string):Observable<any>
  {
    return this._httpClient.delete(`${Environment.baseUrl}/api/v1/cart/${pId}`)
  }


  clearCart():Observable<any>{
    return this._httpClient.delete(`${Environment.baseUrl}/api/v1/cart`)
  }
}

