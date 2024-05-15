import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { EncrdecrService } from '../services/encrdecr.service';

@Component({
  selector: 'app-all-vacancy-data',
  templateUrl: './all-vacancy-data.component.html',
  styleUrls: ['./all-vacancy-data.component.scss']
})
export class AllVacancyDataComponent implements OnInit {

  showdetails : any[] = []
  location_custom : any;
  constructor(private vacdata:DashboardService,
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
        this.showdetails = showres.ArrayOfResponse;
        this.showdetails.map((a:any) =>{
          a.location = a.location.replaceAll(',',', ');
         });
      }
    )
  }

  onrefer(id :any){
    localStorage.setItem('referpositionid', this.EncrdecrService.setEncr(id))
    this.route.navigateByUrl('/utilities/add-reference');
  }
  
//   getCustomLocation(e:any)
//   {
      
//      this.location_custom = e;
//      if(e.includes(','))
//      {
//        for(let item of e){
//          if(item == ','){
//            this.location_custom =  e.replaceAll(',',', ');
//          }
//        }
//      }
//      return this.location_custom;
//  }


}
