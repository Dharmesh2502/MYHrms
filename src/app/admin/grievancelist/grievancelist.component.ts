import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncrdecrService } from 'src/app/services/encrdecr.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-grievancelist',
  templateUrl: './grievancelist.component.html',
  styleUrls: ['./grievancelist.component.scss'],
})
export class GrievancelistComponent implements OnInit {
  grievancearr: any = [];
  constructor(private Utilities: UtilitiesService, private router: Router,private EncrdecrService:EncrdecrService) {}
  isData = true;

  ngOnInit(): void {
    //parameter of my sp_grievance_form
    const json = {
      flag: 'get',
    };

    //geting all grievance forms
    this.Utilities.GrievanceForm(json).subscribe(
      (data: any) => {
        if ((data.status = 'SUCCESS')) {
          this.grievancearr = data.ArrayOfResponse;
          if (this.grievancearr.length === 0) {
            //add bydefault field to show there is no data avalaible
            this.grievancearr = [{ Employee_Name: 'No data available' }];
            //remove view button
            this.isData = false;
          }
        }
      },
      (err: any) => {
        console.log(err);
        //handel error of api by adding default data 
        this.grievancearr = [{ Employee_Name: 'No data available'}];
        //remove view button
        this.isData = false;
      }
    );
  }

  onView(victim_id: number) {
    localStorage.setItem('GrievanceFormId', '' + this.EncrdecrService.setEncr(JSON.stringify(victim_id)));
    this.router.navigateByUrl('/utilities/grievanceform');
  }
}
