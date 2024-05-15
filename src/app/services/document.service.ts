import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  headers={
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
  }
  
    addDocument(details : FormData)
    {    
      debugger
      console.log(details);
  
      let url = environment.ServerUrl+"api/Admin/uploaddoc";
      return this.http.post(url,details).pipe();
    }

    showEmpDoc(details : any)
    {    
      debugger
      console.log(details);
      let url = environment.ServerUrl+"api/Reports/ShowEmpDoc";
      return this.http.post(url,details).pipe();
    }

    downloadFile(docFile: any) {
      debugger
        let url = environment.ServerUrl + "api/Reports/DownloadDoc";
        return this.http.post(url, docFile).pipe();
      }

      binddoctype() {
           debugger
          let url = environment.ServerUrl + "api/Reports/bindDocType";
          return this.http.post(url,{},this.headers).pipe();
     }
  

  constructor(private http:HttpClient) { }
}
