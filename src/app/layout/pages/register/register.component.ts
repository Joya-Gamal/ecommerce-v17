import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { run } from 'node:test';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  isLoading:boolean =  false
  errorMsg!:string

  constructor(private _authService:AuthService  , private router:Router){}

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email : new FormControl(null  , [Validators.required , Validators.email]),
    phone:  new FormControl(null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password:  new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6}/)]),
    rePassword:  new FormControl(null, [Validators.required , Validators.pattern(/^[A-Z][a-zA-Z0-9]{6}/)])
  }, this.verifyRepassword)

  sendData(){

    this.isLoading=true
    this._authService.regesterApi(this.registerForm.value).subscribe({
      next: (res) =>{ console.log(res)

        this.isLoading=false

        this.errorMsg = ''
        this.router.navigate(['/login'])


      },
      error: (err) => {
        // console.log()
        this.errorMsg =err.error.message
        this.isLoading= false
      }
      
    })
    
  }


  verifyRepassword(form:any){

    if(form.get('password').value ==form.get('rePassword').value ){
      return null
    }
    else{
      return {'noMatch': true}
    }
  }
}
