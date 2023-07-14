import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'
import { CakeService } from '../service/cake.service';
import {FormGroup,FormControl} from '@angular/forms'


@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit{
  id:any
  cake:any
  reviewForm=new FormGroup({
    comment:new FormControl(),
    rating:new FormControl() 
  })
  addReview(){
    let formData=this.reviewForm.value
    this.service.addReview(this.id,formData).subscribe(res=>this.ngOnInit())
    
  }

  constructor(private route:ActivatedRoute,private service:CakeService,private router:Router){
   this.id=this.route.snapshot.params['id']
   console.log(this.id)
   
    
  }
  ngOnInit(): void {
    this.service.getCakeDetail(this.id).subscribe(res=>this.cake=res
    )
    
  }
  cartAdd(){
    this.service.addToCart(this.id).subscribe(res=>
      this.router.navigateByUrl("products"))
  }

}
