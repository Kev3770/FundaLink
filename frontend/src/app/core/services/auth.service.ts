import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { User, Student, LoginRequest, AuthResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);
  private router = inject(Router);

  // Signals reactivas
  currentUser = signal<User | Student | null>(null);
  isAuthenticated = signal(false);
  isAdmin = signal(false);
  isStudent = signal(false);

  constructor() {
    this.checkAuthStatus();
  }

  // 🔍 Verificar estado de autenticación al iniciar
  private checkAuthStatus(): void {
    const token = this.storageService.getToken();
    const user = this.storageService.getUser();

    if (token && user) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      this.isAdmin.set(this.checkIsAdmin(user));
      this.isStudent.set(this.checkIsStudent(user));
    }
  }

  // 🔑 Login para administradores
  loginAdmin(credentials: LoginRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('usuarios/login', credentials).pipe(
      tap(response => {
        if (response.success) this.handleAuthSuccess(response);
      })
    );
  }

  // 🎓 Login para estudiantes
  loginStudent(credentials: { studentCode: string; accessCode: string }): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('estudiantes/login', credentials).pipe(
      tap(response => {
        if (response.success) this.handleAuthSuccess(response);
      })
    );
  }

  // ⚙️ Manejar autenticación exitosa
  private handleAuthSuccess(response: AuthResponse): void {
    this.storageService.setToken(response.token);
    this.storageService.setUser(response.data);

    this.currentUser.set(response.data);
    this.isAuthenticated.set(true);
    this.isAdmin.set(this.checkIsAdmin(response.data));
    this.isStudent.set(this.checkIsStudent(response.data));
  }

  // 🚪 Logout
  logout(): void {
    this.storageService.removeToken();
    this.storageService.removeUser();

    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.isAdmin.set(false);
    this.isStudent.set(false);

    this.router.navigate(['/']);
  }

  // 🧩 Verificar si es administrador
  private checkIsAdmin(user: User | Student): boolean {
    return 'role' in user && (user.role === 'admin' || user.role === 'superadmin');
  }

  // 🧩 Verificar si es estudiante
  private checkIsStudent(user: User | Student): boolean {
    return 'studentCode' in user;
  }

  // 🔒 Obtener token
  getToken(): string | null {
    return this.storageService.getToken();
  }

  // 👤 Obtener usuario actual
  getCurrentUser(): User | Student | null {
    return this.currentUser();
  }
}
