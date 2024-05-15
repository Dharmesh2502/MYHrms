import { Component, OnInit } from '@angular/core';
import { ExportToExcelService } from 'src/app/services/export-to-excel.service';
import { MisReportService } from 'src/app/services/mis-report.service';
import Swal from 'sweetalert2';
import 'select2'
declare var $:any;

@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.scss']
})
export class MisReportComponent implements OnInit {

  depart: any
  module: any
  showmod: boolean = false

  // Reports
  showRepor_tbl: boolean = false
  Report: any
  HideByMod: boolean = true

  // Values
  depart_ID: number = 0
  mod_ID: number = 0


  constructor(private mis_service: MisReportService,private execl:ExportToExcelService) { }

  ngOnInit(): void {
    this.mis_service.fetch_depart({ flag: "Department" }).subscribe(
      (data: any) => {
        this.depart = data["ArrayOfResponse"]
      },
      err => {
        // console.log(err)
        Swal.fire({
          title:"Error!",
          icon:"error",
          text:"There is an Error!"
        })
      }
    )
    $(document).ready(() =>{
      $(".departddl").select2({
        minimumResultsForSearch: -1
      }).on("change",(e:any) => {this.changeDepart(e.target.value)})
    })
      
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  changeDepart(e: any) {
    debugger
    this.depart_ID = e
    // this.showReport(e,this.mod_ID)
    if (e != "--select--") {
      $(document).ready(() =>{
        $(".modddl").select2({
          minimumResultsForSearch: -1
        }).on("change",(e:any) => {this.changeMod(e.target.value)})
      })
      this.showmod = true
      this.HideByMod = true
      this.mis_service.fetch_depart({ flag: "Module", dpt_id: this.depart_ID }).subscribe(
        (data: any) => {
          this.module =  data["ArrayOfResponse"];
          // console.log(this.module)
          this.mis_service.fetch_Reports({ dpt_id: this.depart_ID, flag: "dept" }).subscribe(
            (data: any) => {
              this.showRepor_tbl = true
              this.Report = data;
              // console.log(this.Report)
            }
          )
        },
        err => {
          Swal.fire({
            title:"Error!",
            icon:"error",
            text:"There is an Error!"
          })
        }
      )
    }
    else {
      this.showmod = false
      this.HideByMod = true
      this.showRepor_tbl = false;
      this.Report = []
    }
  }

  changeMod(e: any) {
    debugger
    this.mod_ID = e
    // this.showReport(this.depart_ID,e)
    if (e != "--select--") {
      this.mis_service.fetch_Reports({ dpt_id: this.depart_ID, md_id: this.mod_ID, flag: "module" }).subscribe(
        (data: any) => {
          debugger
          this.Report = data;
          this.Report.map((elm: any) => ({ mod_name: elm.mod_name, emp_name: elm.emp_name, rating: elm.ratings }))
          this.HideByMod = false
          this.showRepor_tbl = true
          // console.log(this.Report)

        },
        err => {
          // console.log(err)
          Swal.fire({
            title:"Error!",
            icon:"error",
            text:"There is an Error!"
          })
        }
      )
    }
    else {
      this.HideByMod = true
      this.showRepor_tbl = false
      this.changeDepart(this.depart_ID)
    }
  }

  ExportReport(){
    this.execl.GetExportToExcelData(this.Report,`mis-report - ${new Date().toLocaleString()}`)
  }
  
}
