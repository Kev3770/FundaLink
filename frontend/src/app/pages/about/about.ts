// src/app/pages/about/about.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-gray-50">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-r from-[#1E4E9A] to-[#2D5FAF] text-white py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
            <p class="text-xl text-blue-100">
              Más de 20 años formando profesionales técnicos con excelencia académica y valores humanos
            </p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      <!-- Historia -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold text-[#1E4E9A] mb-6">Nuestra Historia</h2>
              <div class="space-y-4 text-gray-700">
                <p>
                  FUNDAESTÉCNICOS nació en el año 2003 con la visión de brindar educación técnica de calidad 
                  en Popayán, Cauca. Desde nuestros inicios, hemos sido pioneros en formar profesionales 
                  técnicos capacitados para enfrentar los desafíos del mundo laboral moderno.
                </p>
                <p>
                  A lo largo de estas dos décadas, hemos graduado a más de 3,500 estudiantes en diversas 
                  áreas técnicas, quienes hoy se desempeñan exitosamente en empresas e instituciones tanto 
                  públicas como privadas a nivel regional y nacional.
                </p>
                <p>
                  Nuestra institución ha crecido no solo en infraestructura, sino también en calidad académica, 
                  manteniendo siempre nuestro compromiso con la formación integral de nuestros estudiantes.
                </p>
              </div>
            </div>
            <div class="relative">
              <div class="bg-gradient-to-br from-[#1E4E9A] to-[#C79A00] rounded-2xl h-96 flex items-center justify-center text-white">
                <div class="text-center">
                  <div class="text-6xl font-bold mb-4">20+</div>
                  <div class="text-xl">Años de experiencia</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Misión y Visión -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Misión -->
            <div class="bg-gradient-to-br from-[#1E4E9A] to-[#2D5FAF] rounded-2xl p-8 text-white">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold">Nuestra Misión</h3>
              </div>
              <p class="text-blue-50 leading-relaxed">
                Formar técnicos profesionales integrales con sólidos conocimientos, habilidades y competencias 
                laborales, comprometidos con el desarrollo social, económico y cultural de la región y el país, 
                mediante una educación de calidad fundamentada en valores éticos y humanos.
              </p>
            </div>

            <!-- Visión -->
            <div class="bg-gradient-to-br from-[#C79A00] to-[#B88A00] rounded-2xl p-8 text-white">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 class="text-2xl font-bold">Nuestra Visión</h3>
              </div>
              <p class="text-yellow-50 leading-relaxed">
                Ser reconocidos en 2030 como la institución técnica líder en la región, destacada por la 
                excelencia académica, la formación integral de sus egresados y su contribución al desarrollo 
                sostenible, innovación tecnológica y transformación social de la comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Valores -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-[#1E4E9A] mb-4">Nuestros Valores</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro quehacer educativo y definen nuestra identidad institucional
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let value of values" 
                 class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border-t-4"
                 [ngClass]="'border-[#' + value.color + ']'">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center"
                     [ngClass]="'bg-[#' + value.color + ']/10'">
                  <span class="text-2xl">{{ value.icon }}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-800">{{ value.title }}</h3>
              </div>
              <p class="text-gray-600">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Estadísticas -->
      <section class="py-16 bg-gradient-to-r from-[#1E4E9A] to-[#2D5FAF] text-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-4">Nuestros Logros</h2>
            <p class="text-blue-100 max-w-2xl mx-auto">
              Cifras que demuestran nuestro compromiso con la educación de calidad
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div *ngFor="let stat of stats" class="text-center">
              <div class="text-5xl font-bold text-[#C79A00] mb-2">{{ stat.value }}</div>
              <div class="text-blue-100">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-16">
        <div class="container mx-auto px-4">
          <div class="bg-gradient-to-r from-[#C79A00] to-[#B88A00] rounded-2xl p-12 text-center text-white">
            <h2 class="text-3xl font-bold mb-4">¿Listo para ser parte de nuestra familia?</h2>
            <p class="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
              Únete a más de 3,500 egresados que han transformado sus vidas con nuestra formación técnica
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
              <button routerLink="/programs" class="px-8 py-3 bg-white text-[#C79A00] rounded-lg hover:bg-gray-100 transition font-bold">
                Ver Programas
              </button>
              <button routerLink="/contact" class="px-8 py-3 bg-[#1E4E9A] text-white rounded-lg hover:bg-[#1a4282] transition font-bold">
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class About {
  values = [
    {
      icon: '🎓',
      title: 'Excelencia',
      description: 'Compromiso constante con la calidad académica y la mejora continua en todos nuestros procesos educativos.',
      color: '1E4E9A'
    },
    {
      icon: '🤝',
      title: 'Integridad',
      description: 'Actuamos con honestidad, transparencia y ética en todas nuestras acciones y decisiones institucionales.',
      color: 'C79A00'
    },
    {
      icon: '💡',
      title: 'Innovación',
      description: 'Fomentamos la creatividad y la adopción de nuevas metodologías que mejoren el aprendizaje de nuestros estudiantes.',
      color: '1E4E9A'
    },
    {
      icon: '❤️',
      title: 'Respeto',
      description: 'Valoramos la diversidad y promovemos un ambiente de tolerancia, inclusión y trato digno para toda nuestra comunidad.',
      color: 'C79A00'
    },
    {
      icon: '🌟',
      title: 'Responsabilidad',
      description: 'Asumimos el compromiso de formar profesionales conscientes de su papel en la sociedad y el medio ambiente.',
      color: '1E4E9A'
    },
    {
      icon: '🎯',
      title: 'Compromiso',
      description: 'Dedicación absoluta al desarrollo personal y profesional de cada uno de nuestros estudiantes y colaboradores.',
      color: 'C79A00'
    }
  ];

  stats = [
    { value: '20+', label: 'Años de experiencia' },
    { value: '3,500+', label: 'Egresados' },
    { value: '15+', label: 'Programas técnicos' },
    { value: '95%', label: 'Empleabilidad' }
  ];
}