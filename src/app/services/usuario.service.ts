import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  name: string;
  valido: string;
}

const usuarioLogeado: Usuario = {
  name: 'Ash',
  valido: 'false',
};

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario$ = new BehaviorSubject<Usuario>(usuarioLogeado);

  constructor() {}

  get validarUsuario(): Observable<Usuario> {
    return this.usuario$.asObservable();
  }

  setUser(usuario: Usuario): void {
    this.usuario$.next(usuario);
  }

  validarSesion() {
    const sesion = localStorage.getItem('valido') || '';

    return this.usuario$.value.valido;
  }
}
