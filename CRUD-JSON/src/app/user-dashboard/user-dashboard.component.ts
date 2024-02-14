import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from './user-dashboard.model';
import { CommonservicreService } from '../commonservicre.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  formValue!:FormGroup;
 userModelObj :UserModel=new UserModel()
 userData!:any;
 showAdd!:boolean;
 showUpdate!:boolean;
 searchText: string = '';
// userData: UserModel[] = [];

  constructor( private formbuilder:FormBuilder,private api:CommonservicreService){

  }
  ngOnInit(): void {
   this.formValue=this.formbuilder.group({
    firstName:[''],
    lastName:[''],
    email:[''],
    mobile:[''],
    salary:['']
   })
   this.getUser()
  }
  postUserdetails(){
   this.userModelObj.firstName=this.formValue.value.firstName;
   this.userModelObj.lastName=this.formValue.value.lastName;
   this.userModelObj.email=this.formValue.value.email;
   this.userModelObj.mobile=this.formValue.value.mobile;
   this.userModelObj.salary=this.formValue.value.salary;
   this.userModelObj.id = (this.userData.length + 1).toString();
 
  this.api.postUser(this.userModelObj).subscribe((res:any)=>{
   console.log("post",res);
   alert("UserAddedSuccessfully")
   let ref=document.getElementById('cancel')
   ref?.click();

   this.formValue.reset()
   this.getUser()
  },
  (err:any)=>{
    alert("something went wrong")
    })
 
 }
  getUser(){
  this.api.getUser().subscribe(res=>{
  this.userData=res
  console.log("response",this.userData)
})
  }

  deleteuser(row:any){
    this.api.deleteUser(row.id).subscribe((res:any)=>{
    alert("user Deleted")
    this.getUser()
    })
  }
  clickaddUser(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  onEdit(row:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.userModelObj.id=row.id
   this.formValue.controls['firstName'].setValue(row.firstName);
   this.formValue.controls['lastName'].setValue(row.lastName);
   this.formValue.controls['email'].setValue(row.email);
   this.formValue.controls['mobile'].setValue(row.mobile);
   this.formValue.controls['salary'].setValue(row.salary);
  }
  updateUser(){
    this.userModelObj.firstName=this.formValue.value.firstName;
    this.userModelObj.lastName=this.formValue.value.lastName;
    this.userModelObj.email=this.formValue.value.email;
    this.userModelObj.mobile=this.formValue.value.mobile;
    this.userModelObj.salary=this.formValue.value.salary;
    this.api.UpdateUser(this.userModelObj,this.userModelObj.id).subscribe((res:any)=>{
     alert("updated Successfully") 
     let ref=document.getElementById('cancel')
     ref?.click();
     this.formValue.reset()
     this.getUser()
    })
  }

  get filteredUserData() {
    if (!this.searchText.trim()) {
      return this.userData;
    }
    return this.userData.filter((user: any) =>
      Object.values(user).some((val: any) =>
        val.toString().toLowerCase().includes(this.searchText.toLowerCase())
      )
    );
  }
  logout(){
    localStorage.removeItem('isLoggedIn');
  }
}
