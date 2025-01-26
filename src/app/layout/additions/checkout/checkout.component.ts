import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateHeaderName } from 'http';
import { CheckoutService } from '../../../shared/services/checkout/checkout.service';
import { ActivatedRoute } from '@angular/router';
import { log, trace } from 'console';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {


  cartId:string=''
  constructor(private checkoutService:CheckoutService, private activated:ActivatedRoute){}
  ngOnInit(): void {
    this.activated.paramMap.subscribe((res:any)=>{
      this.cartId = res.params.id

      // console.log(this.cartId);
      
    })
  }

  checkoutForm:FormGroup = new FormGroup({
    details: new FormControl(null , [Validators.required]),
    phone : new FormControl(null , [Validators.required]),
    city: new FormControl(null , [Validators.required])
  })




  checkoutApi(){

    // this.checkout.checkOut()

    this.checkoutService.checkOut(this.cartId , this.checkoutForm.value).subscribe({
      next:(res)=>{
        console.log(res.session.url);

        window.open(res.session.url, "_self")
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
