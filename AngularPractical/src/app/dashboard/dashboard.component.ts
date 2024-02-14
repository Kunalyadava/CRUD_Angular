import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usermodel } from './dashboard-user.model';
import { CommonserviceService } from '../commonservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formvalue!:FormGroup
  Usermodelobj: Usermodel =new Usermodel()
  userdata!:any
  show!:boolean
  hide!:boolean
  constructor( private formbuilder:FormBuilder, private api:CommonserviceService){
    this.formvalue=this.formbuilder.group({
      name:['',[Validators.required]],
      price:['',[Validators.required]],
      description:['',[Validators.required]],
      quantity:['',[Validators.required]]


    })
  }
  ngOnInit(): void {
    this.getUser()
    // throw new Error('Method not implemented.');
  }
  postUser(){
    if(this.formvalue.valid){
    this.Usermodelobj.name=this.formvalue.value.name;
    this.Usermodelobj.price=this.formvalue.value.price;
    this.Usermodelobj.description=this.formvalue.value.description;
    this.Usermodelobj.quantity=this.formvalue.value.quantity;
    this.Usermodelobj.id=(this.userdata.length+1).toString()
    this.api.postUser(this.Usermodelobj).subscribe((res:any)=>{
      console.log("addedUser",res)
      alert("user added")
      this.formvalue.reset()
      let ref=document.getElementById('close')
      ref?.click()
      this.getUser()
      
    },
    (err:any)=>{
    alert("something went wrong")
    })
  }
}

  getUser(){
    this.api.getUser().subscribe((res:any)=>{
      this.userdata=res
      console.log("getalluser",res)
    })
  }

  deleteUser(rows:any){
    this.api.delete(rows.id).subscribe((res:any)=>{
      // console.log("detedddd")
      alert("user deleted successfully")
      this.getUser()
    })
  }
  onEdit(rows:any){
    this.show=false
    this.hide=true
    this.Usermodelobj.id=rows.id;
this.formvalue.controls["name"].setValue(rows.name);
this.formvalue.controls["description"].setValue(rows.description);
this.formvalue.controls["price"].setValue(rows.price);
this.formvalue.controls["quantity"].setValue(rows.quantity);
  }
  updateUser(){
    this.Usermodelobj.name=this.formvalue.value.name;
    this.Usermodelobj.price=this.formvalue.value.price;
    this.Usermodelobj.description=this.formvalue.value.description;
    this.Usermodelobj.quantity=this.formvalue.value.quantity;
    this.api.updateUser(this.Usermodelobj,this.Usermodelobj.id).subscribe((res:any)=>{
      console.log("user updated",res)
      alert("user updated")
      this.formvalue.reset()
      let ref=document.getElementById('close')
      ref?.click()
      this.getUser()
    })
  }
clickadded(){
  this.formvalue.reset();
  this.show=true
  this.hide=false
}
}
