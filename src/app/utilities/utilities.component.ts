import { Component, OnInit } from '@angular/core';
import { EncrdecrService } from '../services/encrdecr.service';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss']
})
export class UtilitiesComponent implements OnInit {

  constructor(private encrypt:EncrdecrService) { }

  // Role based records
  emp_rec:boolean = true
  sessData: any = sessionStorage.getItem('Zew8HgA&8z2W&r%+')
  
  ngOnInit(): void {
    // let enc = this.encrypt.setEncr(sessData)
    // console.log(enc)
    let decr = this.encrypt.getDecr(this.sessData)
    // console.log(sessData)
    let UserData = JSON.parse(decr);
    if(UserData.role == 0){
      this.emp_rec = true;
    }
    else{
      this.emp_rec = false
    }

  }

}
