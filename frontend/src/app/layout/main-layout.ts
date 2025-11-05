// src/app/layout/main-layout.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar';
import { Footer } from './footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Navbar -->
      <app-navbar></app-navbar>
      
      <!-- Contenido principal -->
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      
      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `
})
export class MainLayout {}