//Author => Dinesh
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DashboardService } from '../services/dashboard.service';
  declare var $ :any;
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  constructor(private dashboard:DashboardService){}
  noticearr : any = []
  ngOnInit(): void {
    const json = {
      flag : 'getnotice'
    }
    this.dashboard.ImportantNotice(json).subscribe(
      (data: any) => {
        this.noticearr = data.ArrayOfResponse;
        if(this.noticearr.length > 0){
          // let notice  = ''
          // this.noticearr.forEach((element: any) => {
          //     notice = notice + element.notice
          // });

          //important notice popup
          // Swal.fire({
          //   title: 'Important Notice',
          //   icon: 'info',
          //   html:  notice  ,
          //   showConfirmButton: false,
          //   showCloseButton: true,          
          // })
          $('#importantNotice').modal('show');
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
