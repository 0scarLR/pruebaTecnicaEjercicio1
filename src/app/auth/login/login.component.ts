import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;

  public loginForm = this.fb.group({
    name: ['ash', Validators.required],
    password: ['123456', Validators.required],
  });

  constructor(private router: Router, private fb: FormBuilder) {}
  login() {
    if (
      this.loginForm.value.name === 'ash' &&
      this.loginForm.value.password === '123456'
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Credenciales invalidas',
        icon: 'error',
        confirmButtonText: 'regresar',
      });
    }
  }

  ngOnInit(): void {}
}
