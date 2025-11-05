import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Guardar
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Obtener
  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Eliminar
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo
  clear(): void {
    localStorage.clear();
  }

  // Métodos específicos
  setToken(token: string): void {
    this.set('auth_token', token);
  }

  getToken(): string | null {
    return this.get('auth_token');
  }

  removeToken(): void {
    this.remove('auth_token');
  }

  setUser(user: any): void {
    this.set('user', user);
  }

  getUser(): any {
    return this.get('user');
  }

  removeUser(): void {
    this.remove('user');
  }
}