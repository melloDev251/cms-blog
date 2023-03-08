import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'projects/models/user.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  users: User = {
    firstname: '',
    lastname: '',
    email: '',
    profilePic: '',
    roles: '',
    id: -1
  };
  constructor(
    private apiService: ApiService,
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registrationUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
  }
}
