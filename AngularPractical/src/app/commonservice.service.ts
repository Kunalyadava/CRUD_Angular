import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import { Observable, map } from 'rxjs';
// import
@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor( private http:HttpClient ) { }
  postUser(data:any){
    return this.http.post<any>(`http://localhost:8000/users`,data).
    pipe(map((res:any)=>{
      return res
    }))

  }
  getUser(){
    return this.http.get<any>(`http://localhost:8000/users`).
    pipe(map((res:any)=>{
      return res
    }))
  }

  updateUser(data:any,id:number){
    return this.http.put<any>("http://localhost:8000/users/"+id,data).
    pipe(map((res:any)=>{
      return res
    }))
  }
  delete(id:number){
    return this.http.delete<any>("http://localhost:8000/users/"+id).
    pipe(map((res:any)=>{
      return res
    }))
  }
  }
