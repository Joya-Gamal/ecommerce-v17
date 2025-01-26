import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  ngOnInit(){

    if(typeof localStorage !== 'undefined' ){

      localStorage.setItem('currentPage' , '/categories')
    }

  }
}
