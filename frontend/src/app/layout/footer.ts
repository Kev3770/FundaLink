// src/app/layout/footer.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-gradient-to-b from-gray-900 to-black text-white mt-20">
      <!-- Contenido principal del footer -->
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- Columna 1: Información institucional -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-[#1E4E9A] to-[#C79A00] rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">FUNDAESTÉCNICOS</h3>
                <p class="text-gray-400 text-xs">Educación con calidad humana</p>
              </div>
            </div>
            <p class="text-gray-400 text-sm mb-4">
              Formando profesionales técnicos con excelencia académica y valores humanos desde hace más de 20 años.
            </p>
            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-[#C79A00] rounded-lg flex items-center justify-center transition" aria-label="Facebook">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-[#C79A00] rounded-lg flex items-center justify-center transition" aria-label="Instagram">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-[#C79A00] rounded-lg flex items-center justify-center transition" aria-label="YouTube">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Columna 2: Enlaces rápidos -->
          <div>
            <h4 class="text-lg font-bold mb-4 text-white">Enlaces Rápidos</h4>
            <ul class="space-y-2">
              <li>
                <a routerLink="/" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Inicio</a>
              </li>
              <li>
                <a routerLink="/nosotros" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Sobre Nosotros</a>
              </li>
              <li>
                <a routerLink="/programas" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Programas Académicos</a>
              </li>
              <li>
                <a routerLink="/noticias" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Noticias</a>
              </li>
              <li>
                <a routerLink="/eventos" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Eventos</a>
              </li>
              <li>
                <a routerLink="/testimonios" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Testimonios</a>
              </li>
              <li>
                <a routerLink="/contacto" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Contacto</a>
              </li>
            </ul>
          </div>

          <!-- Columna 3: Programas destacados -->
          <div>
            <h4 class="text-lg font-bold mb-4 text-white">Programas</h4>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Técnico en Sistemas</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Técnico en Contabilidad</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Técnico en Asistencia Administrativa</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-[#C79A00] transition text-sm">Técnico en Salud Pública</a>
              </li>
              <li>
                <a routerLink="/inscripciones" class="inline-block mt-4 px-4 py-2 bg-[#C79A00] text-white rounded-lg hover:bg-[#B88A00] transition text-sm font-bold">
                  Ver todos los programas
                </a>
              </li>
            </ul>
          </div>

          <!-- Columna 4: Información de contacto -->
          <div>
            <h4 class="text-lg font-bold mb-4 text-white">Contacto</h4>
            <ul class="space-y-3">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#C79A00] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-400">Calle 3 # 5-45</p>
                  <p class="text-sm text-gray-400">Popayán, Cauca</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#C79A00] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <a href="tel:3216383802" class="text-sm text-gray-400 hover:text-[#C79A00] transition">321 638 3802</a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#C79A00] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <a href="mailto:info@fundaestecnicos.edu.co" class="text-sm text-gray-400 hover:text-[#C79A00] transition">info@fundaestecnicos.edu.co</a>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-[#C79A00] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="text-sm text-gray-400">Lunes a Viernes</p>
                  <p class="text-sm text-gray-400">8:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Copyright bar -->
      <div class="border-t border-gray-800">
        <div class="container mx-auto px-4 py-6">
          <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {{ currentYear }} FUNDAESTÉCNICOS. Todos los derechos reservados.</p>
            <div class="flex gap-6">
              <a href="#" class="hover:text-[#C79A00] transition">Política de Privacidad</a>
              <a href="#" class="hover:text-[#C79A00] transition">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class Footer {
  currentYear = new Date().getFullYear();
}