// import { Component, OnInit } from '@angular/core';
// import { NewempjoinService } from 'src/app/services/newempjoin.service';

// @Component({
//   selector: 'app-resignation-list',
//   templateUrl: './resignation-list.component.html',
//   styleUrls: ['./resignation-list.component.scss']
// })
// export class ResignationListComponent implements OnInit {

//   showresignemplist:any = [];
//   noresign:boolean = false;
//   constructor(private newempjoinservice:NewempjoinService) { }

//   ngOnInit(): void {
//     debugger;
//     let data = {
//       "flag" :"show"
//    }
//    //Author --> Jay patel
//     this.newempjoinservice.show_resginemplist(data).subscribe(
//       (response:any) => {
//         debugger
//         if(response.status == 'success' && response.ArrayOfResponse != null)
//         {
//           this.showresignemplist = response.ArrayOfResponse;
//         }
//         else{
//           this.noresign = true;
//         }
        
//         // console.log(this.showresignemplist);
//     })
//   }
// }

import { Component, OnInit } from '@angular/core';
import { NewempjoinService } from 'src/app/services/newempjoin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resignation-list',
  templateUrl: './resignation-list.component.html',
  styleUrls: ['./resignation-list.component.scss']
})
export class ResignationListComponent implements OnInit {

  showresignemplist:any = [];
  noresign:boolean = false;
  constructor(private newempjoinservice:NewempjoinService) { }

  ngOnInit(): void {
    debugger;
    let data = {
      "flag" :"show"
   }
   this.showdeleteresign(data);
   
  }

  showdeleteresign(flag:any){
    //Author --> Jay patel
    debugger
    this.newempjoinservice.show_resginemplist(flag).subscribe(
      (response:any) => {
        debugger
        if(response.status == 'success' && response.ArrayOfResponse != null)
        {
          this.showresignemplist = response.ArrayOfResponse;
          console.log(this.showresignemplist);
        }
        else{
          this.noresign = true;
          this.showresignemplist = null
        }
        // console.log(this.showresignemplist);
    })
  }

  deleteresign(employeecod:any){
    debugger
   Swal.fire({
    title: 'Do you want to revoke this employee?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      let data = {
        "flag" :"delete",
        "Employee_code":employeecod
     }
      this.showdeleteresign(data);
      Swal.fire({
        icon: 'success',
        text: 'Record deleted successfull',
      })
    } 
  })
  }
}



