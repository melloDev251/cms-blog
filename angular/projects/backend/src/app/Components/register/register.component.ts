import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { User } from "projects/models/user.interface";
import { ApiService } from "projects/tools/src/lib/api.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  confirmPassword: string = "";

  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required],
        roles: ["Reader"],
      },
      {
        validator: this.confirmPasswordValidator("password", "confirmPassword"),
      }
    );
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    const user: User = {
      id: 0,
      firstname: this.f.firstname.value,
      lastname: this.f.lastname.value,
      email: this.f.email.value,
      password: this.f.password.value,
      roles: this.f.roles.value,
    };

    this.apiService.registerUser(user).subscribe(
      () => {
        this.message.add({
          severity: "info",
          summary: "Success",
          detail: "Registration Successful",
          life: 1500,
        });
        setTimeout(() => {
          this.router.navigateByUrl("/login").then();
        }, 2000);
        console.log("Registration successful");
      },
      (error) => {
        this.message.add({
          severity: "error",
          summary: `Failure Attempt`,
          detail: "Registration Failure",
          life: 3000,
        });
        console.log(error);
      }
    );
  }

  confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
