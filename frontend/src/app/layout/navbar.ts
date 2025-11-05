// src/app/layout/navbar.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <!-- Navbar fijo -->
    <nav class="bg-white shadow-md fixed w-full top-0 z-50">
      <!-- Top bar con info de contacto -->
      <div class="bg-[#1E4E9A] text-white py-2">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center text-sm">
            <div class="flex gap-4">
              <a href="tel:3216383802" class="flex items-center gap-1 hover:text-[#C79A00] transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                321 638 3802
              </a>
              <span class="hidden md:flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Calle 3 # 5-45, Popayán
              </span>
            </div>
            <div class="flex gap-3">
              <a href="#" class="hover:text-[#C79A00] transition" aria-label="Facebook">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="hover:text-[#C79A00] transition" aria-label="Instagram">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Main navbar -->
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-20">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-[#1E4E9A] to-[#C79A00] rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">F</span>
            </div>
            <div class="hidden md:block">
              <h1 class="text-[#1E4E9A] font-bold text-lg leading-tight">FUNDAESTÉCNICOS</h1>
              <p class="text-gray-600 text-xs">Educación con calidad humana</p>
            </div>
          </a>

          <!-- Menu desktop -->
          <div class="hidden lg:flex items-center gap-1">
            <a 
              *ngFor="let item of menuItems"
              [routerLink]="item.path"
              routerLinkActive="text-[#1E4E9A] bg-blue-50"
              [routerLinkActiveOptions]="{exact: item.path === '/'}"
              class="px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-[#1E4E9A] transition font-medium text-gray-700"
            >
              {{ item.label }}
            </a>
          </div>

          <!-- Botones de acción -->
          <div class="hidden lg:flex items-center gap-3">
            <button 
              routerLink="/auth/login"
              class="px-4 py-2 text-[#1E4E9A] hover:bg-blue-50 rounded-lg transition font-medium"
            >
              Ingresar
            </button>
            <button 
              routerLink="/enrollment"
              class="px-6 py-2 bg-[#C79A00] text-white rounded-lg hover:bg-[#B88A00] transition font-bold shadow-md"
            >
              Matricúlate
            </button>
          </div>

          <!-- Hamburger menu button -->
          <button 
            (click)="toggleMenu()"
            class="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            aria-label="Toggle menu"
          >
            <svg 
              *ngIf="!isMenuOpen" 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              *ngIf="isMenuOpen" 
              class="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div 
        *ngIf="isMenuOpen"
        class="lg:hidden border-t border-gray-200 bg-white"
      >
        <div class="container mx-auto px-4 py-4 space-y-2">
          <a 
            *ngFor="let item of menuItems"
            [routerLink]="item.path"
            (click)="closeMenu()"
            routerLinkActive="text-[#1E4E9A] bg-blue-50"
            [routerLinkActiveOptions]="{exact: item.path === '/'}"
            class="block px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-[#1E4E9A] transition font-medium text-gray-700"
          >
            {{ item.label }}
          </a>
          <div class="pt-4 space-y-2 border-t border-gray-200">
            <button 
              routerLink="/auth/login"
              (click)="closeMenu()"
              class="w-full px-4 py-3 text-[#1E4E9A] bg-blue-50 rounded-lg transition font-medium"
            >
              Ingresar
            </button>
            <button 
              routerLink="/enrollment"
              (click)="closeMenu()"
              class="w-full px-4 py-3 bg-[#C79A00] text-white rounded-lg hover:bg-[#B88A00] transition font-bold shadow-md"
            >
              Matricúlate Ahora
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Spacer para el navbar fijo -->
    <div class="h-[120px] lg:h-[80px]"></div>
  `
})
export class Navbar {
  isMenuOpen = false;

  menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Nosotros', path: '/about' },
    { label: 'Programas', path: '/programs' },
    { label: 'Noticias', path: '/news' },
    { label: 'Eventos', path: '/events' },
    { label: 'Testimonios', path: '/testimonials' },
    { label: 'Contacto', path: '/contact' }
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}