import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { afterNextRender, afterRender, Component, computed, effect, Inject, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { BrandsComponent } from "../brands/brands.component";
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BrandsComponent, CarouselModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


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
    nav: true,
    rtl: true
  }




}
