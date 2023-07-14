import { Component, OnInit } from '@angular/core';
import { CakeService } from '../service/cake.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orders:any
  constructor(private service:CakeService){

  }
  ngOnInit(): void {
    this.service.listOrder().subscribe(res=>this.orders=res)
    
  }

}
