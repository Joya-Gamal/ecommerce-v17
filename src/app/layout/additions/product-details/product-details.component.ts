import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{




  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }



  myProduct!:Product
  constructor(private _ProductService:ProductService, private _activateRoute:ActivatedRoute)
{

}
  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe((res:any)=>{
      // console.log(res.params.pId);

      this._ProductService.getSpecproduct(res.params.pId).subscribe({
        next:(res)=>{
          console.log(res);

          this.myProduct= res.data
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      
    })


    // this._ProductService.getSpecproduct()
  }



}
