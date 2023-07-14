import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Subject,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  baseUrl=`http://127.0.0.1:8000/api`
  headers=new HttpHeaders({
    'content-type':'application/json'
  })

  private _reloadrequired=new Subject<void>()
 get reloadRequired(){
  return this._reloadrequired
 }

  constructor(private http:HttpClient) { }

  createAccount(data:any){
    return this.http.post(`${this.baseUrl}/register/`,data,{headers:this.headers})
  }

  authorize(data:any){
    return this.http.post(`${this.baseUrl}/token/`,data)
  }
  getAllCakes(){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    return this.http.get(`${this.baseUrl}/cakes/`,{"headers":header})
  }
  getCakeDetail(id:any){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    return this.http.get(`${this.baseUrl}/cakes/${id}/`,{"headers":header})
  }
  addToCart(id:any){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    
    return this.http.post(`${this.baseUrl}/cakes/${id}/add_to_cart/`,null,{"headers":header}).pipe(
      tap(()=>this.reloadRequired.next())
    )
  }
  listCart(){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    return this.http.get(`${this.baseUrl}/carts/`,{"headers":header})
  }
  placeOrder(id:any,data:any){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    return this.http.post(`${this.baseUrl}/cakes/${id}/place_order/`,data,{"headers":header})
  }
  listOrder(){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    return this.http.get(`${this.baseUrl}/orders/`,{"headers":header})
    
  }
  addReview(id:any,data:any){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    return this.http.post(`${this.baseUrl}/cakes/${id}/add_review/`,data,{"headers":header})
  }
  isAuthenticated(){
    return 'token' in localStorage
  }
  listCategories(){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    return this.http.get(`${this.baseUrl}/cakes/categories/`,{"headers":header})

  }
  filterProductsByCategory(cat:any){
    let header=new HttpHeaders({
      'content-type':'application/json',
      'Authorization':localStorage.getItem('token')??''
    })
    return this.http.get(`${this.baseUrl}/cakes/?category=${cat}`,{"headers":header})

  }


}
