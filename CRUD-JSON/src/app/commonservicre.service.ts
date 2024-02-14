import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {map} from "rxjs/operators"
@Injectable({
  providedIn: 'root'
})
export class CommonservicreService {

  constructor(private Http: HttpClient ) { }

  postUser(data:any){
    return this.Http.post<any>("http://localhost:3000/users",data)
    .pipe(map((res:any)=>{
      return res
    }))
  }
  
  getUser(){
    return this.Http.get<any>("http://localhost:3000/users")
    .pipe(map((res:any)=>{
      return res
    }))
  }
  deleteUser(id:number) {
  return this.Http.delete<any>("http://localhost:3000/users/"+id)
  .pipe(map((res:any)=>{
    return res
  }))
}
UpdateUser(data:any,id: number){
  return this.Http.put<any>("http://localhost:3000/users/"+id,data)
  .pipe(map((res:any)=>{
    return res
  }))
}

// UpdateUser(data:any,id:number){
//   return this.Http.put<any>(`http://localhost:3000/users/${id}`, data)
//   .pipe(map((res:any)=>{
//     return res
//   }))
// }
signup(data:any){
  return this.Http.post<any>("http://localhost:3000/signupUser",data)
  .pipe(map((res:any)=>{
    return res
  }))
}
login(){
  return this.Http.get<any>("http://localhost:3000/signupUser")
  .pipe(map((res:any)=>{
    return res
  }))
}
}
