import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { EmpOfMonthService } from 'src/app/services/emp-of-month.service';
import Swal from 'sweetalert2';
declare var $ : any;

@Component({
  selector: 'app-employee-of-month',
  templateUrl: './employee-of-month.component.html',
  styleUrls: ['./employee-of-month.component.scss']
})
export class EmployeeOfMonthComponent implements OnInit {
 emp_data : any;
 arr_data:any;
 imageGalleryData:any;

  constructor(private emp_det : EmpOfMonthService,
    private domSanitizer:DomSanitizer) { }

  ngOnInit(): void {
    let flag = {'flag':'getEOM'};
    this.emp_det.getEmpMonth(flag).subscribe(
      (data : any) => {
          
        this.emp_data = data.ArrayOfResponse;
        // console.log(this.emp_data);

        this.emp_data.map((a:any) =>{
          a.img_path = this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${a.img_path}`)
         });
        //  console.log(this.emp_data)
        // for(let item in this.emp_data){
        //   console.log(this.emp_data[item]);
        // }
      },
      (err : any) => {
        Swal.fire('Error','Something went wrong !!!','error');
        // console.log(err);
      } 
    );
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: [ '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
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
        items: 1
      }
    },
    nav: true
  }

}
