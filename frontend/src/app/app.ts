import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50 font-sans">
      <!-- Header global -->
      <header class="bg-[#1E4E9A] text-white py-4 shadow-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto flex items-center justify-between px-6">
          <h1 class="text-xl font-bold tracking-wide">🎓 FUNDALink</h1>
          <nav class="space-x-4 hidden sm:block">
            <a routerLink="/" routerLinkActive="text-yellow-400" class="hover:text-yellow-300 transition">Inicio</a>
            <a routerLink="/noticias" routerLinkActive="text-yellow-400" class="hover:text-yellow-300 transition">Noticias</a>
            <a routerLink="/eventos" routerLinkActive="text-yellow-400" class="hover:text-yellow-300 transition">Eventos</a>
            <a routerLink="/programas" routerLinkActive="text-yellow-400" class="hover:text-yellow-300 transition">Programas</a>
          </nav>
        </div>
      </header>

      <!-- Contenido dinámico (páginas) -->
      <main class="flex-1">
        <router-outlet />
      </main>

      <!-- Footer global -->
      <footer class="bg-[#1E4E9A] text-white py-4 mt-auto text-center text-sm opacity-90">
        © 2025 FUNDALink | Educación con Calidad Humana
      </footer>
    </div>
  `,
})
export class App {}
