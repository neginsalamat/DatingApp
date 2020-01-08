import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";
import { LowerCasePipe } from "@angular/common";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
      photoUrl => (this.photoUrl = photoUrl)
    );
  }

  login() {
    console.log("inside login method");
    this.authService.login(this.model).subscribe(
      next => {
        // console.log("logged in successfully");
        this.alertify.success("logged in successfully");
      },
      error => {
        // console.log(error);
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(["./members"]);
      }
    );
  }

  loggedIn() {
    // const token = localStorage.getItem("token");
    // return !!token;
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    //console.log("logged out");
    this.alertify.message("logged out");
    this.router.navigate(["./home"]);
  }
}
