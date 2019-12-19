import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

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
    //console.log("logged out");
    this.alertify.message("logged out");
  }
}
