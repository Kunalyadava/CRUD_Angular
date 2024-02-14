import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonservicreService } from '../commonservicre.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;
  constructor(private formbuilder:FormBuilder,private api:CommonservicreService,private router:Router,private Http: HttpClient ){
    // this.loginForm=this.formbuilder.group({
    //   email:[''],
    //   password:['']
    // })
  }
      ngOnInit(): void {
      this.loginForm=this.formbuilder.group({
      email:['',[Validators.required, Validators.email]],
      password:['', [Validators.required]]
    })
      }
      // login() {
      //   this.Http.get<any>("http://localhost:3000/signupUser").subscribe(
      //     (res: any) => {
      //       console.log("ressss",res)
      //       const user = res.find((a: any) => {
      //         return a.email === this.loginForm.value.email &&
      //                a.password === this.loginForm.value.password;
      //       });
      //       if (user) {
      //         alert("Login successful");
      //         this.loginForm.reset();
      //         debugger
      //         this.router.navigate(['/dashboard']);
      //       } else {
      //         alert("User not found");
      //       }
      //     },
      //     err => {
      //       console.error('Error occurred:', err);
      //       alert('Something went wrong');
      //     }
      //   );
      // }
  login(){
  if(this.loginForm.valid){
    this.api.login().subscribe((res:any)=>{
    const user=res.find((a:any)=>{
      return a.email===this.loginForm.value.email&&
      a.password===this.loginForm.value.password
    })
    if(user){
      alert("login successful")
      localStorage.setItem('isLoggedIn', 'true');
      this.loginForm.reset();
      this.router.navigate(['/dashboard']);
    }else{
      alert("user not found")
    }
  },(err:any)=>{
    alert('something went wrong')
  })
}
  }
}


