import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { __read } from 'tslib';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy{


  logSub!:Subscription

  show:boolean = false

  isLoading:boolean =  false
  errorMsg!:string

  constructor(private _authService:AuthService  , private router:Router){}


  loginForm:FormGroup = new FormGroup({
  email : new FormControl(null  , [Validators.required , Validators.email]),
    password:  new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6}/)]),
  })

  sendData(){

    this.isLoading=true
    this.logSub = this._authService.loginApi(this.loginForm.value).subscribe({
      next: (res) =>{ console.log(res)

        this.isLoading=false

        this.errorMsg = ''
    

        if(localStorage.getItem('nvigateTo') !== null){
          this.router.navigate([localStorage.getItem('nvigateTo')])
        }
      
        else{
          this.router.navigate(['/home'])
        }
         
       
     

        localStorage.setItem('userToken' , res.token)
        this._authService.decodeData()


      },
      error: (err) => {
        // console.log()
        this.errorMsg =err.error.message
        this.isLoading= false
      }
      
    })
    
  }


  ngOnDestroy(): void {
    this.logSub?.unsubscribe()
  }



}
