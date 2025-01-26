import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../../shared/interfaces/cart';
import { CartService } from './../../../shared/services/cart.service';
import { Component } from '@angular/core';
import { error } from 'console';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  myCart!:Cart
  constructor(private _cartService :CartService, private toastr: ToastrService){}
  ngOnInit(){

    if(typeof localStorage !== 'undefined' ){

      localStorage.setItem('currentPage' , '/cart')
    }

    this._cartService.getCart().subscribe({
      next:(res)=>{
        console.log(res);

        this.myCart= res
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })



    

  }

 
  updateQuantity(pId:string, pCount:number){
    this._cartService.updateProductQuantity(pId , pCount.toString()).subscribe({
      next:(res)=>{
      console.log(res);

      this.myCart = res

      this.toastr.success("cart updated");
      
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(pId:string)
{
  this._cartService.removeSpecitem(pId).subscribe({
    next:(res)=>{
      console.log(res);

      this.myCart = res
      this.toastr.error("item deleted");


      this._cartService.cartNum.next(res.numOfCartItems)
      
    },
    error:(err)=>{
      console.log(err);
      
      
    }
  })
  }

  clearCart(){
    this._cartService.clearCart().subscribe({
      next:(res)=>{
        console.log(res);

        if(res.message =='success'){
          this.myCart = {} as Cart

          this._cartService.cartNum.next(0)
        }
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

}
