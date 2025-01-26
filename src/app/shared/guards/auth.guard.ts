import { log } from 'console';
import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  let _router = inject(Router) 
  let x = inject(ActivatedRoute) 
  

  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem('userToken')!== null){
      return true
    }
    else{
  
      /////
      // console.log(state.url);  ///product
      localStorage.setItem('nvigateTo' ,state.url )
      
      return _router.navigate(['/login']) 
  
  
    }
  }

  else{
    return false
  }

};
