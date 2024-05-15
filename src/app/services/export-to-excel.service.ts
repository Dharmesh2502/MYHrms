import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ExportToExcelService {
  EmpLeaveDetails: any=[];

  constructor() { }

GetExportToExcelData(Info:any, fileName:string){
  let parsedDate = moment(new Date().toLocaleDateString(), "MM/DD/YYYY");
  let outputDate = parsedDate.format("DD-MM-YYYY");
  import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(Info);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, fileName+'_'+outputDate);
  });
}

saveAsExcelFile(buffer: any, fileName: string) {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
}

}


