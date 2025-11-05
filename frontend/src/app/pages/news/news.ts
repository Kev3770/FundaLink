// src/app/pages/news/news.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { News } from '../../core/interfaces';  

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-gray-50">
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-r from-[#1E4E9A] to-[#2D5FAF] text-white py-20">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold mb-6">Noticias y Actualidad</h1>
            <p class="text-xl text-blue-100">
              Mantente informado sobre eventos, logros y novedades de nuestra comunidad educativa
            </p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      <!-- Filtros y búsqueda -->
      <section class="py-8 bg-white sticky top-[120px] lg:top-[80px] z-40 shadow-sm">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
            <!-- Categorías -->
            <div class="flex flex-wrap gap-2">
              <button 
                *ngFor="let cat of categories"
                (click)="filterByCategory(cat)"
                [class.bg-[#1E4E9A]]="selectedCategory === cat"
                [class.text-white]="selectedCategory === cat"
                [class.bg-gray-100]="selectedCategory !== cat"
                [class.text-gray-700]="selectedCategory !== cat"
                class="px-4 py-2 rounded-lg hover:bg-[#1E4E9A] hover:text-white transition font-medium text-sm"
              >
                {{ cat }}
              </button>
            </div>

            <!-- Contador -->
            <div class="text-gray-600 font-medium text-sm">
              {{ filteredNews.length }} noticias
            </div>
          </div>
        </div>
      </section>

      <!-- Noticia Destacada -->
      <section class="py-8" *ngIf="featuredNews">
        <div class="container mx-auto px-4">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="grid md:grid-cols-2 gap-0">
              <!-- Imagen -->
              <div class="relative h-64 md:h-auto bg-gradient-to-br from-[#1E4E9A] to-[#C79A00] flex items-center justify-center">
                <div class="absolute top-4 left-4 px-4 py-2 bg-[#C79A00] text-white rounded-full text-sm font-bold">
                  ⭐ Destacada
                </div>
                <div class="text-white text-8xl">{{ featuredNews.image }}</div>
              </div>

              <!-- Contenido -->
              <div class="p-8 flex flex-col justify-center">
                <div class="flex items-center gap-3 mb-4">
                  <span class="px-3 py-1 bg-[#1E4E9A]/10 text-[#1E4E9A] rounded-full text-sm font-medium">
                    {{ featuredNews.category }}
                  </span>
                  <span class="text-gray-500 text-sm">{{ featuredNews.publishDate }}</span>
                </div>

                <h2 class="text-3xl font-bold text-gray-800 mb-4">{{ featuredNews.title }}</h2>
                <p class="text-gray-600 mb-6 leading-relaxed">{{ featuredNews.excerpt }}</p>

                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{{ featuredNews.author }}</span>
                  </div>
                  <button 
                    [routerLink]="['/news', featuredNews.id]"
                    class="px-6 py-3 bg-[#1E4E9A] text-white rounded-lg hover:bg-[#1a4282] transition font-bold"
                  >
                    Leer más
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Grid de Noticias -->
      <section class="py-8 pb-16">
        <div class="container mx-auto px-4">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article 
              *ngFor="let article of filteredNews"
              class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <!-- Imagen/Icono -->
              <div class="relative h-48 bg-gradient-to-br from-[#1E4E9A] to-[#2D5FAF] flex items-center justify-center text-white">
                <div class="text-6xl group-hover:scale-110 transition">{{ article.image }}</div>
                <div class="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                  {{ article.category }}
                </div>
              </div>

              <!-- Contenido -->
              <div class="p-6">
                <!-- Meta info -->
                <div class="flex items-center gap-3 mb-3 text-sm text-gray-600">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ article.publishDate }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ article.readTime }}
                  </span>
                </div>

                <!-- Título -->
                <h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[#1E4E9A] transition">
                  {{ article.title }}
                </h3>

                <!-- Excerpt -->
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                  {{ article.excerpt }}
                </p>

                <!-- Footer -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div class="flex items-center gap-2 text-sm text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{{ article.author }}</span>
                  </div>
                  <button 
                    [routerLink]="['/news', article.id]"
                    class="text-[#1E4E9A] hover:text-[#1a4282] font-bold text-sm flex items-center gap-1"
                  >
                    Leer más
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          </div>

          <!-- Mensaje si no hay resultados -->
          <div *ngIf="filteredNews.length === 0" class="text-center py-16">
            <div class="text-6xl mb-4">📭</div>
            <h3 class="text-2xl font-bold text-gray-700 mb-2">No hay noticias en esta categoría</h3>
            <p class="text-gray-600 mb-6">Intenta con otra categoría o explora todas las noticias</p>
            <button 
              (click)="filterByCategory('All')"
              class="px-6 py-3 bg-[#1E4E9A] text-white rounded-lg hover:bg-[#1a4282] transition font-bold"
            >
              Ver todas las noticias
            </button>
          </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="py-16 bg-white">
        <div class="container mx-auto px-4">
          <div class="bg-gradient-to-r from-[#1E4E9A] to-[#2D5FAF] rounded-2xl p-12 text-center text-white">
            <div class="max-w-2xl mx-auto">
              <div class="text-5xl mb-4">📬</div>
              <h2 class="text-3xl font-bold mb-4">Suscríbete a nuestro boletín</h2>
              <p class="text-blue-100 mb-8">
                Recibe las últimas noticias, eventos y novedades directamente en tu correo
              </p>
              <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="tu@email.com"
                  class="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#C79A00]"
                >
                <button class="px-6 py-3 bg-[#C79A00] text-white rounded-lg hover:bg-[#B88A00] transition font-bold whitespace-nowrap">
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class NewsPage {
  selectedCategory = 'All';

  categories = [
    'All',
    'Institutional',
    'Students',
    'Events',
    'Graduations',
    'Partnerships'
  ];

  newsArticles: News[] = [
    {
      id: '1',
      title: 'FUNDAESTÉCNICOS firma convenio con importantes empresas de la región',
      category: 'Partnerships',
      publishDate: '15 Oct 2024',
      author: 'Comunicaciones',
      image: '🤝',
      excerpt: 'La institución amplía su red de aliados estratégicos para garantizar la vinculación laboral de nuestros estudiantes en empresas líderes del sector.',
      readTime: '3 min',
      featured: true,
      content: ''
    },
    {
      id: '2',
      title: 'Graduación de la promoción 2024: 250 nuevos técnicos profesionales',
      category: 'Graduations',
      publishDate: '10 Oct 2024',
      author: 'Dirección Académica',
      image: '🎓',
      excerpt: 'Con gran orgullo celebramos la graduación de 250 estudiantes de diferentes programas técnicos, listos para enfrentar los retos del mercado laboral.',
      readTime: '4 min',
      featured: false,
      content: ''
    },
    {
      id: '3',
      title: 'Nuevo programa de Técnico en Ciberseguridad disponible',
      category: 'Institutional',
      publishDate: '5 Oct 2024',
      author: 'Dirección Académica',
      image: '🔐',
      excerpt: 'Respondiendo a las necesidades del mercado tecnológico, inauguramos nuestro programa de Ciberseguridad con los más altos estándares de calidad.',
      readTime: '5 min',
      featured: false,
      content: ''
    },
    {
      id: '4',
      title: 'Estudiantes destacados reciben becas de excelencia académica',
      category: 'Students',
      publishDate: '28 Sep 2024',
      author: 'Bienestar Institucional',
      image: '⭐',
      excerpt: 'Reconocemos el esfuerzo y dedicación de 20 estudiantes sobresalientes con becas completas para continuar su formación profesional.',
      readTime: '3 min',
      featured: false,
      content: ''
    },
    {
      id: '5',
      title: 'Feria de Empleo 2024: Más de 50 empresas participantes',
      category: 'Events',
      publishDate: '20 Sep 2024',
      author: 'Bolsa de Empleo',
      image: '💼',
      excerpt: 'Nuestra feria anual de empleo conectó a estudiantes y egresados con importantes empresas, generando más de 200 oportunidades laborales.',
      readTime: '4 min',
      featured: false,
      content: ''
    },
    {
      id: '6',
      title: 'Renovación de laboratorios de computación con tecnología de punta',
      category: 'Institutional',
      publishDate: '15 Sep 2024',
      author: 'Infraestructura',
      image: '💻',
      excerpt: 'Invertimos en equipos de última generación para garantizar que nuestros estudiantes aprendan con las herramientas más actuales del mercado.',
      readTime: '3 min',
      featured: false,
      content: ''
    },
    {
      id: '7',
      title: 'Taller internacional de emprendimiento para estudiantes',
      category: 'Events',
      publishDate: '8 Sep 2024',
      author: 'Extensión',
      image: '🚀',
      excerpt: 'Expertos internacionales compartieron conocimientos sobre creación de empresas, innovación y desarrollo de modelos de negocio exitosos.',
      readTime: '5 min',
      featured: false,
      content: ''
    },
    {
      id: '8',
      title: 'Egresados destacados: Historias de éxito profesional',
      category: 'Students',
      publishDate: '1 Sep 2024',
      author: 'Comunicaciones',
      image: '🏆',
      excerpt: 'Conoce las inspiradoras historias de nuestros egresados que hoy ocupan posiciones importantes en empresas nacionales e internacionales.',
      readTime: '6 min',
      featured: false,
      content: ''
    },
    {
      id: '9',
      title: 'Jornada de actualización docente en metodologías pedagógicas',
      category: 'Institutional',
      publishDate: '25 Ago 2024',
      author: 'Desarrollo Docente',
      image: '👨‍🏫',
      excerpt: 'Nuestros docentes participaron en capacitaciones sobre nuevas metodologías de enseñanza y herramientas digitales para el aula.',
      readTime: '4 min',
      featured: false,
      content: ''
    }
  ];

  filteredNews: News[] = [];
  featuredNews: News | null = null;

  ngOnInit() {
    this.featuredNews = this.newsArticles.find(n => n.featured) || null;
    this.filteredNews = this.newsArticles.filter(n => !n.featured);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    const allNews = this.newsArticles.filter(n => !n.featured);
    
    if (category === 'All') {
      this.filteredNews = allNews;
    } else {
      this.filteredNews = allNews.filter(n => n.category === category);
    }
  }
}