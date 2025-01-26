import { Component } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CartService } from '../../../shared/services/cart.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../shared/services/translation.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  cartItem!:number
  isLogin:boolean = false
  constructor(private flowbiteService: FlowbiteService , private translate:TranslationService,private _AuthService:AuthService , private _router:Router , private _cart:CartService) {}

  ngOnInit(): void {

    this._cart.getCart().subscribe({
      next:(res)=>{
        this._cart.cartNum.next(res.numOfCartItems)
      }
    })
  

    this._cart.cartNum.subscribe((res)=>{
      this.cartItem = res
    })
    // window.console.log('hello');
    
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });

    

   

  this._AuthService.userData.subscribe(()=>{
    if(this._AuthService.userData.getValue() !== null){
      this.isLogin = true
    }
    else{
      this.isLogin = false
    }
  })
  }


  signOut(){


    //remove user token

    localStorage.removeItem('userToken')

    //userData

    this._AuthService.userData.next(null)



    //login

    this._router.navigate(['/login'])

  }



  changeLang(lang:string){
  this.translate.changeLang(lang)
  }
}
