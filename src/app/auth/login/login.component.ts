import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  selectedUsuario$ = this.usuarioService.usuario$;

  public loginForm = this.fb.group({
    name: ['ash', Validators.required],
    password: ['123456', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private canActived: AuthGuard
  ) {}

  login() {
    if (
      this.loginForm.value.name === 'ash' &&
      this.loginForm.value.password === '123456'
    ) {
      this.usuarioService.usuario$.getValue().name = this.loginForm.value.name;
      this.usuarioService.usuario$.getValue().valido = 'true';
      localStorage.setItem('sesion', this.usuarioService.usuario$.value.valido);

      this.router.navigate(['/dashboard']);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Credenciales invalidas',
        icon: 'error',
        confirmButtonText: 'regresar',
      });
      this.usuarioService.usuario$.getValue().name = this.loginForm.value.name;
      this.usuarioService.usuario$.getValue().valido = 'false';
    }
  }

  ngOnInit(): void {}
}
