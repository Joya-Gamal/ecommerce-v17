


export interface Logindata {

    email:string,
    password:string,

}
export interface Userdata extends Logindata {

   
    name:string,
    rePassword:string, 
    phone:string
}


