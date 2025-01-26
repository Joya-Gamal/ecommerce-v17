import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';

import { RegisterComponent } from './layout/pages/register/register.component';
import { ProductsComponent } from './layout/pages/products/products.component';


import { CartComponent } from './layout/pages/cart/cart.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { authGuard } from './shared/guards/auth.guard';
import { ForgetpasswordComponent } from './layout/additions/forgetpassword/forgetpassword.component';
import { ProductDetailsComponent } from './layout/additions/product-details/product-details.component';
import { CheckoutComponent } from './layout/additions/checkout/checkout.component';

export const routes: Routes = [
    {path:"", redirectTo:"home" , pathMatch:"full"},
    {path:"home" , component:HomeComponent, canActivate:[authGuard], title:"home"},
    {path:"login" , loadComponent: ()=> import('./layout/pages/login/login.component').then((c)=> c.LoginComponent), title:"login"},
    {path:"register" , component:RegisterComponent , title:'register'},
    {path:"product" , component:ProductsComponent, canActivate:[authGuard] , title:"product"},
    {path:"brands" ,loadComponent: () => import('./layout/pages/brands/brands.component').then((c)=> c.BrandsComponent), canActivate:[authGuard] , title:"brands" },
    {path:"categories" ,loadComponent: ()=> import('./layout/pages/categories/categories.component').then((c)=> c.CategoriesComponent), canActivate:[authGuard], title:"categories"},
    {path:"cart" , component:CartComponent, canActivate:[authGuard] , title:"cart"},
    {path:'forgetPassword' , component:ForgetpasswordComponent, title:"forgetPassworrd"},
    {path:'productdetails/:pId', component:ProductDetailsComponent, canActivate:[authGuard], title:"productDetails"},
    {path:'checkout/:id', component:CheckoutComponent, canActivate:[authGuard], title:"checkout"},

    {path:"setting" , loadChildren: ()=> import('./settings/settings.module').then((c)=> c.SettingsModule)},
    {path:"**" , component:NotFoundComponent}

];
