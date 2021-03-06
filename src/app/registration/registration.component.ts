import { Component, OnInit } from '@angular/core';
import {User} from "../../entities/User";
import {UserService} from "../services/UserService";
import {Hasher} from "../services/auth/hasher.service";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {MdSnackBar} from "@angular/material";
import {Bundle} from "../../entities/Bundle";
import {Address} from "../../entities/Address";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newUser : User = new User();

  confirmationPassword : string = "";

  isRegistering = false;

  captcha : boolean = false;

  constructor(private userService : UserService, private router : Router, private authService : AuthService, private snack : MdSnackBar) { }

  ngOnInit() {
    this.newUser.password = "";
    this.newUser.email = "";
    this.newUser.firstname = "";
    this.newUser.lastname = "";
  }

  onSubmit(){
    let isValid = this.validate();

    if(isValid){

      this.isRegistering = true;

      this.userService.addUser(this.newUser).subscribe(user=>{
        if(user != null){
          user.cart = [];
          user.wishlist = [];
          user.address = new Address();
          this.authService.setUser(user);
          this.router.navigate(['/home']);
          this.snack.open("Welcome " + user.firstname + '!', null, {duration : 2000});
        } else {
          this.isRegistering = false;
          this.newUser.password = "";
          this.confirmationPassword = "";
        }
      })
    }
  }

  private validate() {
    if(this.newUser.firstname.trim() == ''){
      this.snack.open("Firstname is required", null, {duration : 2000});
      return false;
    }
    if(this.newUser.lastname.trim() == ''){
      this.snack.open("Lastname is required", null, {duration : 2000});
      return false;
    }
    if(this.newUser.email.trim() == ''){
      this.snack.open("Email is required", null, {duration : 2000});
      return false;
    }
    if(!(this.newUser.email.indexOf('@') >= 0)){
      this.snack.open("Email must contain symbol '@'", null, {duration : 2000});
      return false;
    }
    if((this.newUser.email.indexOf('@') >= 0) && (!(this.newUser.email.split('@')[1].indexOf('.') >= 0))){
      this.snack.open("Email must contain an extension", null, {duration : 2000});
      return false;
    }
    if(this.newUser.password.length <= 5) {
      this.snack.open("Password must be at least 6 character long", null, {duration: 2000});
      return false;
    }
    if(this.newUser.password != this.confirmationPassword) {
      this.snack.open("Passwords does not match !", null, {duration: 2000});
      return false;
    }
    if(this.captcha == false) {
      this.snack.open("Please let us now if you are human !", null, {duration: 2000});
      return false;
    }
    return true;
  }

  resolved(captchaResponse: string) {
    this.captcha = true;
  }
}
