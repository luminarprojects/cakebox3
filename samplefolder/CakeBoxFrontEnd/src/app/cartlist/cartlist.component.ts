import { Component, OnInit } from '@angular/core';
import { CakeService } from '../service/cake.service';

@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css']
})
export class CartlistComponent implements OnInit{
  carts:any

  constructor(private service:CakeService){

  }
  ngOnInit(): void {
    this.service.listCart().subscribe(res=>this.carts=res
    )
    
  }

}
