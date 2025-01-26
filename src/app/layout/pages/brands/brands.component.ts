import { Component, input, Input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

  // @Input() fromParent:string= ''
  // hamada:InputSignal<string>= input.required()

  fromParent:InputSignal<string>= input('')

  ngOnInit(){

    if(typeof localStorage !== 'undefined' ){

      localStorage.setItem('currentPage' , '/brands')
    }

  }

}
