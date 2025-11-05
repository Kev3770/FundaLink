import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Program } from '../../core/interfaces'; // ajusta la ruta si es necesario

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="pt-28 pb-16 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Título -->
        <h2 class="text-4xl font-bold text-center text-[#1E4E9A] mb-10">
          Nuestros Programas Técnicos
        </h2>

        <!-- Filtros de categoría -->
        <div class="flex flex-wrap justify-center gap-3 mb-10">
          <button
            *ngFor="let category of categories"
            (click)="filterByCategory(category)"
            [class.bg-[#1E4E9A]]="selectedCategory === category"
            [class.text-white]="selectedCategory === category"
            class="px-5 py-2 border border-[#1E4E9A] text-[#1E4E9A] rounded-full hover:bg-[#1E4E9A] hover:text-white transition font-medium"
          >
            {{ category }}
          </button>
        </div>

        <!-- Grid de programas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            *ngFor="let program of filteredPrograms"
            class="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 transition flex flex-col"
          >
            <div class="text-5xl mb-3" [style.color]="'#' + program.color">
              {{ program.icon }}
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-800">
              {{ program.name }}
            </h3>
            <p class="text-gray-600 mb-4">{{ program.description }}</p>

            <ul class="text-sm text-gray-600 space-y-1 mb-4">
              <li><strong>Duración:</strong> {{ program.duration }}</li>
              <li><strong>Modalidad:</strong> {{ program.modality }}</li>
            </ul>

            <div class="border-t pt-3 text-sm text-gray-500">
              <p *ngFor="let feat of program.features">• {{ feat }}</p>
            </div>
          </div>
        </div>

        <!-- Beneficios -->
        <div class="mt-16 text-center">
          <h3 class="text-3xl font-bold text-[#C79A00] mb-6">Beneficios de Estudiar con Nosotros</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div *ngFor="let b of benefits" class="bg-white shadow-md rounded-2xl p-6 hover:-translate-y-2 transition">
              <div class="text-4xl mb-3">{{ b.icon }}</div>
              <h4 class="font-semibold text-lg mb-2">{{ b.title }}</h4>
              <p class="text-gray-600 text-sm">{{ b.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class Programs implements OnInit {
  selectedCategory = 'Todos';

  categories = ['Todos', 'Tecnología', 'Administración', 'Salud', 'Contabilidad'];

  programs: Program[] = [
    {
      id: 1,
      name: 'Técnico en Sistemas',
      category: 'Technology',
      duration: '18 meses',
      modality: 'Hybrid',
      description: 'Aprende programación, redes, bases de datos y desarrollo web. Conviértete en un profesional TI altamente demandado.',
      icon: '💻',
      color: '1E4E9A',
      features: [
        'Programación en Java, Python y JavaScript',
        'Administración de bases de datos',
        'Desarrollo web frontend y backend',
        'Redes y seguridad informática',
        'Certificación internacional'
      ],
      costs: { enrollment: 120000, monthly: 180000 }
    },
    {
      id: 2,
      name: 'Técnico en Contabilidad',
      category: 'Accounting',
      duration: '15 meses',
      modality: 'InPerson',
      description: 'Domina la contabilidad financiera, tributaria y auditoría. Ideal para trabajar en empresas o de forma independiente.',
      icon: '📊',
      color: 'C79A00',
      features: [
        'Contabilidad financiera y de costos',
        'Normas Internacionales NIIF',
        'Software contable (SIIGO, World Office)',
        'Legislación tributaria colombiana',
        'Análisis financiero'
      ],
      costs: { enrollment: 100000, monthly: 150000 }
    },
    {
      id: 3,
      name: 'Técnico en Asistencia Administrativa',
      category: 'Administration',
      duration: '12 meses',
      modality: 'Hybrid',
      description: 'Gestiona procesos administrativos, manejo de documentos y atención al cliente con excelencia profesional.',
      icon: '📋',
      color: '1E4E9A',
      features: [
        'Gestión documental y archivo',
        'Atención al cliente y servicio',
        'Herramientas ofimáticas avanzadas',
        'Comunicación empresarial',
        'Organización de eventos'
      ],
      costs: { enrollment: 110000, monthly: 160000 }
    },
    {
      id: 4,
      name: 'Técnico en Salud Pública',
      category: 'Health',
      duration: '20 meses',
      modality: 'InPerson',
      description: 'Contribuye al bienestar comunitario con conocimientos en promoción de la salud y prevención de enfermedades.',
      icon: '🏥',
      color: 'C79A00',
      features: [
        'Epidemiología y estadística en salud',
        'Programas de vacunación',
        'Educación para la salud',
        'Primeros auxilios básicos',
        'Práctica en centros de salud'
      ],
      costs: { enrollment: 130000, monthly: 190000 }
    },
    {
      id: 5,
      name: 'Técnico en Marketing Digital',
      category: 'Technology',
      duration: '14 meses',
      modality: 'Virtual',
      description: 'Crea estrategias digitales efectivas, maneja redes sociales y genera contenido que impacte.',
      icon: '📱',
      color: '1E4E9A',
      features: [
        'Social Media Management',
        'Google Ads y Facebook Ads',
        'SEO y SEM',
        'Email marketing',
        'Analítica web'
      ],
      costs: { enrollment: 120000, monthly: 170000 }
    },
    {
      id: 6,
      name: 'Técnico en Recursos Humanos',
      category: 'Administration',
      duration: '16 meses',
      modality: 'InPerson',
      description: 'Gestiona el talento humano, reclutamiento, nómina y desarrollo organizacional.',
      icon: '👥',
      color: 'C79A00',
      features: [
        'Reclutamiento y selección',
        'Gestión de nómina',
        'Desarrollo organizacional',
        'Derecho laboral',
        'Bienestar laboral'
      ],
      costs: { enrollment: 110000, monthly: 160000 }
    }
  ];

  benefits = [
    { icon: '🏆', title: 'Certificación Avalada', description: 'Títulos reconocidos por el Ministerio de Educación Nacional' },
    { icon: '👨‍🏫', title: 'Docentes Expertos', description: 'Profesionales con amplia experiencia en el sector real' },
    { icon: '💼', title: 'Bolsa de Empleo', description: 'Acceso a ofertas laborales exclusivas para nuestros egresados' },
    { icon: '🎓', title: 'Educación Flexible', description: 'Horarios adaptados a tu disponibilidad laboral y personal' }
  ];

  filteredPrograms: Program[] = [];

  ngOnInit() {
    this.filteredPrograms = this.programs;
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'Todos') {
      this.filteredPrograms = this.programs;
    } else {
      const map: any = {
        'Tecnología': 'Technology',
        'Administración': 'Administration',
        'Salud': 'Health',
        'Contabilidad': 'Accounting'
      };
      this.filteredPrograms = this.programs.filter(p => p.category === map[category]);
    }
  }
}
