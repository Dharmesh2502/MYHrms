import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor() { }
   gettoken(){  
    return !!sessionStorage.getItem("Zew8HgA&8z2W&r%+");  
    } 
}
