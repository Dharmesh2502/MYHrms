import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EncrdecrService } from 'src/app/services/encrdecr.service';

@Component({
  selector: 'app-vacancydata',
  templateUrl: './vacancydata.component.html',
  styleUrls: ['./vacancydata.component.scss']
})
export class VacancydataComponent implements OnInit {
  showdetails : any[] = []
  link:boolean=false;
  msg:boolean=false;
  location_custom : any;
  constructor(
    private vacdata:DashboardService,
    private EncrdecrService: EncrdecrService,
    private route : Router
  ) { }

  ngOnInit(): void {
    let showdata = {
      "flag":"showforemployee"
    }
  

    this.vacdata.GetVacdataForEmp(showdata).subscribe(
      (showres:any) => 
      {
        if(showres.ArrayOfResponse != null &&  showres.ArrayOfResponse != undefined)
        {
            if(showres.ArrayOfResponse.length >= 1 && showres.ArrayOfResponse.length <=4)
            {
              this.showdetails = showres.ArrayOfResponse?.slice(0,5);
            }
            else if(showres.ArrayOfResponse.length >= 5)
            {
              this.showdetails = showres.ArrayOfResponse?.slice(0,5);
              this.link = true;
            }
            else
            {
              this.msg=false;
            }
            this.showdetails.map((a:any) =>{
              a.location = a.location.replaceAll(',',', ');
             });
        }
        else
        {
          this.msg=true;
        }
      }
    )

  }

  onrefer(id :any){
    localStorage.setItem('referpositionid', this.EncrdecrService.setEncr(id))
    this.route.navigateByUrl('/utilities/add-reference');
  }

//   getCustomLocation(e:any)
//  {
//     this.location_custom = e;
//     if(e.includes(','))
//     {
//       for(let item of e){
//         if(item == ','){
//           this.location_custom =  e.replaceAll(',',', ');
//         }
//       }
//     }
//     return this.location_custom;
// }

}
