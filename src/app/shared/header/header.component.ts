import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {}
  cerrarSesion() {
    this.router.navigate(['/login']);
    localStorage.setItem('sesion', 'false');
  }
}
