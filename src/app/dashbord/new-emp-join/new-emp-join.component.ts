import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NewempjoinService } from 'src/app/services/newempjoin.service';

@Component({
  selector: 'app-new-emp-join',
  templateUrl: './new-emp-join.component.html',
  styleUrls: ['./new-emp-join.component.scss']
})
export class NewEmpJoinComponent implements OnInit {

  //Author --> Jay Patel
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  newempjoindata : any;
  maindiv:boolean = false;

  constructor(private newempjoinservice:NewempjoinService,
    private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    //If Arrayofresponse is null then No employee join with in 7 days 

    this.newempjoinservice.Postang_registrtion().subscribe(
      (define:any) => {
          
        if(define.status == 'success' && define.message == "Data Found")
        {
          this.maindiv = true;
          this.newempjoindata = define.ArrayOfResponse;
          this.newempjoindata.map((arr:any) =>{
            // arr.DOJ = arr.DOJ.split(' ')
            arr.Image = this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${arr.Image}`);
          })
          // console.log(this.newempjoindata);
        }
        else{
          debugger
          this.maindiv = false
          console.log(this.newempjoindata)
        }
      },
      (err:any) => {
        // console.log(err);
      }
    )
  }
}

