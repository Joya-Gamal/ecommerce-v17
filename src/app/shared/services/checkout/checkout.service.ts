import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../Environment/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  myToken:any = {"token" : localStorage.getItem("userToken")}
  constructor(private _httpClient:HttpClient) { }


  checkOut(cartId:string, userData:any):Observable<any>{
    return this._httpClient.post(`${Environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${Environment.localUrl}`,
      {
        "shippingAddress":userData
    },
    {
      headers : this.myToken
    }

    )
  }
}
