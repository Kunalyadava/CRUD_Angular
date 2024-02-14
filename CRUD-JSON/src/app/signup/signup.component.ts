import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonservicreService } from '../commonservicre.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
public signupForm!:FormGroup
  constructor( private formbuilder:FormBuilder,private api:CommonservicreService,private router:Router,private Http: HttpClient){
this.signupForm=this.formbuilder.group({
  fullName:[''],
  email:['',[Validators.required, Validators.email]],
  password:['', [Validators.required]],
  mobile:['',[Validators.required, Validators.maxLength(10)]]
})
  }
  ngOnInit(): void {
    
  
  }
signup(){
  if(this.signupForm.valid){
    this.api.signup(this.signupForm.value).subscribe((res:any)=>{
      alert("signup successfully")
      this.signupForm.reset()
      this.router.navigate(['/login'])
    },err=>{
      alert("something went wrong")
    })
  }

}

// signup(){
//   // if(this.signupForm.valid){
//     this.Http.post<any>("http://localhost:3000/signupUser",this.signupForm.value).subscribe((res:any)=>{
//       alert("signup successfully")
//       this.signupForm.reset()
//       this.router.navigate(['login'])
//     },(err:any)=>{
//       alert("something went wrong")
//     })
//   }
}