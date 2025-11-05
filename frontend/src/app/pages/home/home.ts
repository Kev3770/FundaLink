import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Principal con overlay -->
    <section class="relative bg-gradient-to-br from-[#1E4E9A] via-[#2563B8] to-[#C79A00] text-white overflow-hidden">
      <!-- Patrón de fondo -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
      </div>

      <div class="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Logo badge -->
          <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6 shadow-2xl">
            <span class="text-4xl font-bold text-[#1E4E9A]">F</span>
          </div>

          <!-- Título principal -->
          <h1 class="text-4xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            HAZ TUS SUEÑOS<br>
            <span class="text-[#C79A00]">REALIDAD !!!</span>
          </h1>

          <!-- Subtítulo -->
          <p class="text-xl md:text-2xl font-medium mb-6 text-gray-100">
            EDUCACIÓN CON CALIDAD HUMANA
          </p>

          <!-- Badges informativos -->
          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <div class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <span class="text-sm font-semibold">🏆 Líderes a Nivel Nacional</span>
            </div>
            <div class="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <span class="text-sm font-semibold">📜 Licencia de Funcionamiento</span>
            </div>
          </div>

          <!-- Call to action -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              routerLink="/inscripciones"
              class="bg-white text-[#1E4E9A] font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-gray-100 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              ¡MATRICÚLATE AHORA!
            </button>
            
            <button
              routerLink="/programas"
              class="bg-[#C79A00] text-white font-bold px-8 py-4 rounded-lg shadow-xl hover:bg-[#B88A00] transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Ver Programas
            </button>
          </div>

          <!-- Información destacada -->
          <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p class="text-sm text-gray-200 mb-1">Inscripción</p>
              <p class="text-2xl font-bold text-[#C79A00]">$90,000</p>
              <p class="text-xs text-gray-300">Con una inscripción ingresan 2 estudiantes</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p class="text-sm text-gray-200 mb-1">Matrícula</p>
              <p class="text-2xl font-bold text-[#C79A00]">$0</p>
              <p class="text-xs text-gray-300">¡Promoción especial!</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Onda decorativa -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="#F9FAFB"/>
        </svg>
      </div>
    </section>

    <!-- Programa destacado -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="bg-gradient-to-r from-[#1E4E9A] to-[#2563B8] rounded-2xl shadow-2xl overflow-hidden">
          <div class="grid md:grid-cols-2 gap-0">
            <!-- Contenido -->
            <div class="p-8 md:p-12 text-white flex flex-col justify-center">
              <h3 class="text-3xl md:text-4xl font-bold mb-4">
                TÉCNICO EN INVESTIGACIÓN<br>
                JUDICIAL Y CRIMINALÍSTICA
              </h3>
              <div class="space-y-3 mb-6">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-[#C79A00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Líderes a nivel nacional</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-[#C79A00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Duración: 1 año y medio</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-[#C79A00]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span>Capacitación técnica avanzada</span>
                </div>
              </div>
              <div class="flex gap-4">
                <button class="bg-[#C79A00] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B88A00] transition-all">
                  Más información
                </button>
                <a href="tel:3216383802" class="bg-white text-[#1E4E9A] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all">
                  📞 321 638 3802
                </a>
              </div>
            </div>

            <!-- Imagen placeholder -->
            <div class="bg-gradient-to-br from-[#2563B8] to-[#1E4E9A] p-12 flex items-center justify-center">
              <div class="text-center">
                <svg class="w-48 h-48 mx-auto text-white/20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <p class="text-white/40 mt-4">Imagen de estudiantes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Módulos principales -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h3 class="text-3xl md:text-4xl font-extrabold text-[#1E4E9A] mb-3">
            Explora Nuestros Módulos
          </h3>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Descubre todo lo que FUNDAESTÉCNICOS tiene para ofrecerte
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            *ngFor="let mod of modules"
            class="group bg-white border-t-4 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
            [ngClass]="mod.border"
          >
            <div 
              class="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl transition-transform group-hover:scale-110"
              [ngClass]="mod.bgColor"
            >
              {{ mod.icon }}
            </div>
            <h4 class="font-bold text-xl mb-2" [ngClass]="mod.color">
              {{ mod.title }}
            </h4>
            <p class="text-gray-600">{{ mod.description }}</p>
            <button 
              [routerLink]="mod.link"
              class="mt-4 text-sm font-semibold hover:underline"
              [ngClass]="mod.color"
            >
              Ver más →
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de contacto rápido -->
    <section class="py-16 bg-gradient-to-r from-[#C79A00] to-[#E5AC00]">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center text-white">
          <h3 class="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para comenzar tu carrera?
          </h3>
          <p class="text-xl mb-8 text-gray-100">
            Estamos ubicados en el centro histórico de Popayán
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div class="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="font-semibold">Calle 3 # 5-45</span>
            </div>
            <a 
              href="tel:3216383802"
              class="flex items-center gap-2 bg-white text-[#1E4E9A] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              321 638 3802
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats counter -->
    <section class="py-16 bg-[#1E4E9A] text-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-[#C79A00] mb-2">15+</div>
            <div class="text-sm md:text-base text-gray-200">Años de experiencia</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-[#C79A00] mb-2">5000+</div>
            <div class="text-sm md:text-base text-gray-200">Estudiantes graduados</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-[#C79A00] mb-2">10+</div>
            <div class="text-sm md:text-base text-gray-200">Programas técnicos</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold text-[#C79A00] mb-2">95%</div>
            <div class="text-sm md:text-base text-gray-200">Tasa de empleabilidad</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: []
})
export class Home {
  modules = [
    {
      title: 'Noticias',
      icon: '📰',
      color: 'text-[#1E4E9A]',
      border: 'border-[#1E4E9A]',
      bgColor: 'bg-blue-50',
      description: 'Mantente informado con las últimas noticias institucionales',
      link: '/noticias'
    },
    {
      title: 'Eventos',
      icon: '📅',
      color: 'text-[#C79A00]',
      border: 'border-[#C79A00]',
      bgColor: 'bg-yellow-50',
      description: 'Participa en nuestras actividades y eventos académicos',
      link: '/eventos'
    },
    {
      title: 'Programas',
      icon: '📘',
      color: 'text-[#D90429]',
      border: 'border-[#D90429]',
      bgColor: 'bg-red-50',
      description: 'Descubre nuestra oferta educativa técnica',
      link: '/programas'
    },
  ];
}