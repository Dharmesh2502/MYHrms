import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  customOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['<div class="nav-arrow-left"><i class="bi bi-arrow-left"></i></div>','<div class="nav-arrow-right"><i class="bi bi-arrow-right"></i></div>'],
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
  
  constructor(private apicall:DashboardService,private domSanitizer:DomSanitizer) { }
  imageGalleryData:any;

  ngOnInit(): void {
    this.bindSlider();
  }

  bindSlider(){
    let data = {
      "flag":"get"
    }
    this.apicall.getEventGallery(data).subscribe(
      (data:any)=>{
        if(data.status=='success'){
         this.imageGalleryData = data.ArrayOfResponse;
         this.imageGalleryData.map((a:any) =>{
          a.base64string = this.domSanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64,${a.base64string}`)
         });
        
        }
      },
      err=>{
        console.log(err)
      }
    );
  }
}
