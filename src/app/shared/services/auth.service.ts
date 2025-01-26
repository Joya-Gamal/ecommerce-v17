import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Environment } from '../../Environment/Environment';
import { Logindata, Userdata } from '../interfaces/userdata';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _httpClient:HttpClient , private _router:Router) {

    if(typeof localStorage  !=='undefined'){
      if(localStorage.getItem('userToken') !==null){
        this.decodeData()
        _router.navigate([localStorage.getItem('currentPage')])

      }
    }
   }
 
  regesterApi(userData:Userdata):Observable<any>{
    return this._httpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`, userData)
  }

  loginApi(userData:Logindata):Observable<any>{
    return this._httpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`, userData)
  }

  decodeData(){
    let userToken = localStorage.getItem('userToken')

    this.userData.next( jwtDecode(JSON.stringify(userToken)))  
    // console.log(userData);
    
  }




  sendEmailApi(email:string):Observable<any>
  {

    return this._httpClient.post(`${Environment.baseUrl}/api/v1/auth/forgotPasswords`, email)
  }



  sendCodeApi(code:string):Observable<any>
  {

    return this._httpClient.post(`${Environment.baseUrl}/api/v1/auth/verifyResetCode`, code)
  }


  resetDataApi(userData:any):Observable<any>
  {

    return this._httpClient.put(`${Environment.baseUrl}/api/v1/auth/resetPassword`, userData)
  }

}





