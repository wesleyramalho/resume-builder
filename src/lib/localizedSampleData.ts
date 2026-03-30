import type { ResumeData } from "@/types/resume";
import { generateId } from "@/lib/utils";
import { TEMPLATES } from "./resumeTemplates";

type PartialSampleData = Partial<ResumeData>;

const PT_BR_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "Alexandre Santos",
    headline: "Engenheiro de Software Sênior",
    summary:
      "Engenheiro full-stack com mais de 6 anos construindo aplicações web escaláveis. Apaixonado por experiência do desenvolvedor, performance e arquitetura limpa.",
    contact: {
      email: "alexandre.santos@email.com",
      phone: "+55 (11) 98765-4321",
      location: "São Paulo, SP",
      linkedin: "linkedin.com/in/alexandresantos",
      website: "alexandresantos.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "Nubank",
        title: "Engenheiro de Software Sênior",
        location: "São Paulo, SP",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "Liderou a migração do dashboard de pagamentos para React 18, melhorando tempos de carregamento em 40%\nProjetou e entregou monitoramento de webhooks em tempo real usado por mais de 50 mil merchants\nMentorou 4 engenheiros juniores através de code review estruturado e sessões de pair programming",
      },
      {
        id: generateId(),
        company: "VTEX",
        title: "Engenheiro de Software",
        location: "Remoto",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "Construiu otimizações no pipeline de deploy reduzindo tempos de build em 30%\nContribuiu para ferramentas open-source usadas por mais de 500 mil desenvolvedores\nImplementou estratégia de cache que reduziu a latência da API em 60%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "USP",
        degree: "Bacharelado",
        field: "Ciência da Computação",
        startDate: "2014-02",
        endDate: "2018-12",
        gpa: "9.2",
        highlights: "Monitor de Estruturas de Dados, Iniciação Científica em IA",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Linguagens", skills: ["TypeScript", "Python", "Go", "SQL"] },
      { id: generateId(), category: "Frameworks", skills: ["React", "Next.js", "Node.js", "FastAPI"] },
      { id: generateId(), category: "Ferramentas", skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Ferramenta CLI Open-Source",
        description: "Construiu uma CLI para scaffolding de projetos Next.js com CI/CD, linting e testes pré-configurados. Mais de 1.2 mil stars no GitHub.",
        url: "github.com/alexandresantos/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "Sofia Oliveira",
    headline: "Analista de Negócios",
    summary:
      "Analista orientada a dados com 5 anos de experiência traduzindo necessidades de negócios em soluções técnicas. Habilidade em modelagem de processos, análise de requisitos e comunicação com stakeholders.",
    contact: {
      email: "sofia.oliveira@email.com",
      phone: "+55 (21) 99876-5432",
      location: "Rio de Janeiro, RJ",
      linkedin: "linkedin.com/in/sofiaoliveira",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Ambev",
        title: "Analista de Negócios Sênior",
        location: "Rio de Janeiro, RJ",
        startDate: "2021-01",
        endDate: null,
        current: true,
        description:
          "Conduziu análise de processos de ponta a ponta para iniciativa de transformação digital que economizou R$ 800 mil/ano\nGerenciou backlog de requisitos para 3 equipes ágeis usando Jira e Confluence\nCriou dashboards executivos em Power BI rastreando 15+ KPIs em todas as unidades de negócio",
      },
      {
        id: generateId(),
        company: "Itaú Unibanco",
        title: "Analista de Negócios",
        location: "São Paulo, SP",
        startDate: "2018-03",
        endDate: "2020-12",
        current: false,
        description:
          "Mapeou fluxos de trabalho operacionais e identificou gargalos, reduzindo tempo de processamento em 25%\nFacilitou workshops com stakeholders para alinhar prioridades de negócios e tecnologia\nEscreveu especificações funcionais para migração de sistema legado",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "PUC-Rio",
        degree: "MBA",
        field: "Gestão de Projetos",
        startDate: "2019-02",
        endDate: "2020-12",
        highlights: "Melhor Projeto de Conclusão",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Análise", skills: ["Modelagem de Processos", "Levantamento de Requisitos", "SQL", "Data Visualization"] },
      { id: generateId(), category: "Ferramentas", skills: ["Tableau", "Power BI", "Jira", "Confluence"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Modelo de Previsão de Churn",
        description: "Desenvolveu modelo preditivo que identificou clientes em risco com 87% de precisão, possibilitando estratégias proativas que reduziram churn em 15%.",
        technologies: ["Python", "Tableau", "SQL"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  minimal: {
    fullName: "Lucas Ferreira",
    headline: "Designer de Produto",
    summary:
      "Designer de produto com 4+ anos criando experiências digitais intuitivas. Focado em design systems, pesquisa com usuários e prototipagem de alta fidelidade.",
    contact: {
      email: "lucas.ferreira@email.com",
      phone: "+55 (11) 91234-5678",
      location: "Curitiba, PR",
      linkedin: "linkedin.com/in/lucasferreira",
      website: "lucasferreira.design",
    },
    experience: [
      {
        id: generateId(),
        company: "iFood",
        title: "Designer de Produto Sênior",
        location: "Remoto",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "Redesenhou o fluxo de checkout do app resultando em aumento de 22% na conversão\nCriou e manteve design system usado por 12 equipes de produto\nConduziu mais de 40 sessões de pesquisa com usuários para validar decisões de design",
      },
      {
        id: generateId(),
        company: "99",
        title: "Designer de Produto",
        location: "São Paulo, SP",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "Projetou a experiência de onboarding para motoristas, reduzindo tempo de cadastro em 35%\nColaborou com engenheiros para implementar animações e micro-interações\nEstabeleceu diretrizes de acessibilidade para todos os produtos digitais",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "UFPR",
        degree: "Bacharelado",
        field: "Design Gráfico",
        startDate: "2015-02",
        endDate: "2019-12",
        highlights: "Projeto premiado em Design de Interfaces",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Design", skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"] },
      { id: generateId(), category: "Pesquisa", skills: ["Testes de Usabilidade", "Entrevistas", "Analytics", "A/B Testing"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Design System Open-Source",
        description: "Criou um design system completo com mais de 50 componentes, documentação interativa e tokens de design. Adotado por 3 startups brasileiras.",
        url: "github.com/lucasferreira/verde-ui",
        technologies: ["Figma", "Storybook", "React"],
        startDate: "2023-01",
        endDate: null,
      },
    ],
  },
  executive: {
    fullName: "Carolina Mendes",
    headline: "Gerente de Recrutamento",
    summary:
      "Profissional de RH com mais de 8 anos de experiência em recrutamento estratégico, desenvolvimento organizacional e gestão de talentos em empresas multinacionais.",
    contact: {
      email: "carolina.mendes@email.com",
      phone: "+55 (11) 97654-3210",
      location: "São Paulo, SP",
      linkedin: "linkedin.com/in/carolinamendes",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Magazine Luiza",
        title: "Gerente de Recrutamento",
        location: "São Paulo, SP",
        startDate: "2020-06",
        endDate: null,
        current: true,
        description:
          "Gerencia equipe de 8 recrutadores responsáveis por mais de 200 contratações anuais\nImplementou sistema ATS que reduziu tempo de contratação em 35%\nDesenvolveu programa de diversidade que aumentou contratações de grupos sub-representados em 45%",
      },
      {
        id: generateId(),
        company: "Globo",
        title: "Analista de RH Sênior",
        location: "Rio de Janeiro, RJ",
        startDate: "2016-03",
        endDate: "2020-05",
        current: false,
        description:
          "Conduziu processos seletivos para posições de tecnologia e produto\nCriou programa de estágio que formou mais de 60 profissionais em 4 anos\nImplementou pesquisa de clima organizacional com 92% de participação",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "FGV",
        degree: "Pós-Graduação",
        field: "Gestão de Pessoas",
        startDate: "2018-02",
        endDate: "2019-12",
        highlights: "Trabalho de conclusão sobre Employer Branding",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "RH", skills: ["Recrutamento", "Employer Branding", "Gestão de Talentos", "Treinamento"] },
      { id: generateId(), category: "Idiomas", skills: ["Português", "Inglês", "Espanhol"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Programa de Employer Branding",
        description: "Liderou projeto de employer branding que renovou páginas de carreira e presença digital, aumentando candidaturas qualificadas em 40%.",
        technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
        startDate: "2023-01",
        endDate: "2023-07",
      },
    ],
  },
  bold: {
    fullName: "Ricardo Almeida",
    headline: "Analista Financeiro",
    summary:
      "Analista financeiro com 6 anos de experiência em modelagem financeira, análise de investimentos e planejamento estratégico em empresas de grande porte.",
    contact: {
      email: "ricardo.almeida@email.com",
      phone: "+55 (11) 96543-2109",
      location: "São Paulo, SP",
      linkedin: "linkedin.com/in/ricardoalmeida",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "BTG Pactual",
        title: "Analista Financeiro Sênior",
        location: "São Paulo, SP",
        startDate: "2021-01",
        endDate: null,
        current: true,
        description:
          "Desenvolveu modelos financeiros para avaliação de empresas em processos de M&A totalizando R$ 2.5 bilhões\nAutomatizou relatórios trimestrais reduzindo tempo de preparação de 5 dias para 4 horas\nApresentou análises de investimento para comitê executivo mensalmente",
      },
      {
        id: generateId(),
        company: "XP Investimentos",
        title: "Analista Financeiro",
        location: "São Paulo, SP",
        startDate: "2018-06",
        endDate: "2020-12",
        current: false,
        description:
          "Analisou oportunidades de investimento em renda fixa e variável\nCriou dashboard de acompanhamento de portfólio para clientes de alta renda\nColaborou com equipe de research na elaboração de relatórios setoriais",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Insper",
        degree: "Bacharelado",
        field: "Administração de Empresas",
        startDate: "2014-02",
        endDate: "2018-12",
        highlights: "CFA Level II Candidate",
      },
      {
        id: generateId(),
        school: "FGV",
        degree: "Especialização",
        field: "Finanças Corporativas",
        startDate: "2019-02",
        endDate: "2020-06",
        highlights: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Finanças", skills: ["Modelagem Financeira", "Valuation", "M&A", "FP&A"] },
      { id: generateId(), category: "Idiomas", skills: ["Português", "Inglês", "Espanhol"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Dashboard de Previsão Trimestral",
        description: "Construiu dashboard automatizado de previsão financeira em Power BI que consolidou dados de 5 departamentos, reduzindo tempo de geração de relatórios de 3 dias para 2 horas.",
        technologies: ["Power BI", "Excel VBA", "SQL Server"],
        startDate: "2023-06",
        endDate: "2023-12",
      },
    ],
  },
  balanced: {
    fullName: "Carlos Pereira",
    headline: "Carpinteiro",
    summary:
      "Carpinteiro experiente com mais de 10 anos em construção residencial e comercial. Especializado em acabamentos finos, móveis planejados e restauração de estruturas em madeira.",
    contact: {
      email: "carlos.pereira@email.com",
      phone: "+55 (41) 98765-4321",
      location: "Curitiba, PR",
      linkedin: "",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Construtora Laguna",
        title: "Carpinteiro Sênior",
        location: "Curitiba, PR",
        startDate: "2019-03",
        endDate: null,
        current: true,
        description:
          "Lidera equipe de 6 carpinteiros em projetos residenciais de alto padrão\nEspecializado em instalação de pisos, esquadrias e acabamentos em madeira maciça\nGarantiu conformidade com normas técnicas e padrões de qualidade em todos os projetos",
      },
      {
        id: generateId(),
        company: "Marcenaria Artesanal",
        title: "Carpinteiro",
        location: "Curitiba, PR",
        startDate: "2013-01",
        endDate: "2019-02",
        current: false,
        description:
          "Projetou e construiu móveis planejados sob medida para mais de 200 clientes\nRestaurou peças de mobiliário antigo preservando técnicas tradicionais\nImplementou controle de qualidade que reduziu retrabalho em 30%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "SENAI",
        degree: "Técnico",
        field: "Marcenaria e Carpintaria",
        startDate: "2011-02",
        endDate: "2012-12",
        highlights: "Melhor Aluno da Turma",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Carpintaria", skills: ["Acabamento Fino", "Restauração", "Leitura de Projetos", "Instalação de Pisos"] },
      { id: generateId(), category: "Gestão", skills: ["Gestão de Equipe", "Supervisão", "Controle de Qualidade"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Reforma de Cozinha Personalizada",
        description: "Projetou e construiu reforma completa de cozinha incluindo marcenaria sob medida, piso em madeira e modificações estruturais. Entregue no prazo e 10% abaixo do orçamento.",
        technologies: ["AutoCAD", "Marcenaria", "Estimativa de Projetos"],
        startDate: "2023-03",
        endDate: "2023-08",
      },
    ],
  },
  clear: {
    fullName: "Mariana Costa",
    headline: "Recepcionista",
    summary:
      "Recepcionista profissional com 5 anos de experiência em atendimento ao cliente, gestão de agendas e suporte administrativo em ambientes corporativos de alto volume.",
    contact: {
      email: "mariana.costa@email.com",
      phone: "+55 (11) 95432-1098",
      location: "São Paulo, SP",
      linkedin: "linkedin.com/in/marianacosta",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "Hospital Albert Einstein",
        title: "Recepcionista Sênior",
        location: "São Paulo, SP",
        startDate: "2021-04",
        endDate: null,
        current: true,
        description:
          "Atende mais de 150 visitantes diariamente com excelência e profissionalismo\nGerencia agendas de 8 salas de reunião e coordena logística de eventos internos\nTreinou 5 novos recepcionistas no sistema de gestão hospitalar",
      },
      {
        id: generateId(),
        company: "WeWork",
        title: "Recepcionista",
        location: "São Paulo, SP",
        startDate: "2018-08",
        endDate: "2021-03",
        current: false,
        description:
          "Gerenciou recepção de coworking com mais de 300 membros ativos\nCoordenou entregas, correspondências e serviços de suporte para inquilinos\nManteve índice de satisfação de 4.9/5.0 em pesquisas trimestrais",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "ETEC",
        degree: "Técnico",
        field: "Administração",
        startDate: "2016-02",
        endDate: "2017-12",
        highlights: "",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Administração", skills: ["Atendimento ao Cliente", "Gestão de Agenda", "Pacote Office", "Telefonia"] },
      { id: generateId(), category: "Idiomas", skills: ["Português", "Inglês", "Italiano", "Espanhol"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Projeto de Digitalização do Escritório",
        description: "Liderou a transição de sistemas de arquivo em papel para digital em 3 departamentos, treinando mais de 25 funcionários e reduzindo tempo de busca de documentos em 70%.",
        technologies: ["Google Workspace", "DocuSign", "Notion"],
        startDate: "2023-02",
        endDate: "2023-06",
      },
    ],
  },
};

const ES_SAMPLE_DATA: Record<string, PartialSampleData> = {
  modern: {
    fullName: "Alejandro García",
    headline: "Ingeniero de Software Senior",
    summary:
      "Ingeniero full-stack con más de 6 años construyendo aplicaciones web escalables. Apasionado por la experiencia del desarrollador, el rendimiento y la arquitectura limpia.",
    contact: {
      email: "alejandro.garcia@email.com",
      phone: "+34 612 345 678",
      location: "Madrid, España",
      linkedin: "linkedin.com/in/alejandrogarcia",
      website: "alejandrogarcia.dev",
    },
    experience: [
      {
        id: generateId(),
        company: "Cabify",
        title: "Ingeniero de Software Senior",
        location: "Madrid, España",
        startDate: "2021-03",
        endDate: null,
        current: true,
        description:
          "Lideró la migración del dashboard de pagos a React 18, mejorando tiempos de carga en un 40%\nDiseñó y entregó monitoreo de webhooks en tiempo real usado por más de 50 mil comercios\nMentorizó a 4 ingenieros junior mediante code review estructurado y sesiones de pair programming",
      },
      {
        id: generateId(),
        company: "Typeform",
        title: "Ingeniero de Software",
        location: "Barcelona, España",
        startDate: "2018-06",
        endDate: "2021-02",
        current: false,
        description:
          "Construyó optimizaciones en el pipeline de despliegue reduciendo tiempos de build en un 30%\nContribuyó a herramientas open-source usadas por más de 500 mil desarrolladores\nImplementó estrategia de caché que redujo la latencia de la API en un 60%",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Universidad Politécnica de Madrid",
        degree: "Grado",
        field: "Ingeniería Informática",
        startDate: "2014-09",
        endDate: "2018-06",
        gpa: "8.7",
        highlights: "Matrícula de Honor en Algoritmos y Estructuras de Datos",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Lenguajes", skills: ["TypeScript", "Python", "Go", "SQL"] },
      { id: generateId(), category: "Frameworks", skills: ["React", "Next.js", "Node.js", "FastAPI"] },
      { id: generateId(), category: "Herramientas", skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Herramienta CLI Open-Source",
        description: "Creó una CLI para scaffolding de proyectos Next.js con CI/CD, linting y testing preconfigurados. Más de 1.2 mil estrellas en GitHub.",
        url: "github.com/alejandrogarcia/create-next-stack",
        technologies: ["TypeScript", "Node.js", "GitHub Actions"],
        startDate: "2022-01",
        endDate: "2022-06",
      },
    ],
  },
  classic: {
    fullName: "María López",
    headline: "Analista de Negocios",
    summary:
      "Analista orientada a datos con 5 años de experiencia traduciendo necesidades de negocio en soluciones técnicas. Experta en modelado de procesos, análisis de requisitos y comunicación con stakeholders.",
    contact: {
      email: "maria.lopez@email.com",
      phone: "+34 623 456 789",
      location: "Barcelona, España",
      linkedin: "linkedin.com/in/marialopez",
      website: "",
    },
    experience: [
      {
        id: generateId(),
        company: "CaixaBank",
        title: "Analista de Negocios Senior",
        location: "Barcelona, España",
        startDate: "2021-01",
        endDate: null,
        current: true,
        description:
          "Condujo análisis de procesos de extremo a extremo para iniciativa de transformación digital que ahorró 800 mil €/año\nGestionó el backlog de requisitos para 3 equipos ágiles usando Jira y Confluence\nCreó dashboards ejecutivos en Power BI rastreando más de 15 KPIs",
      },
      {
        id: generateId(),
        company: "Telefónica",
        title: "Analista de Negocios",
        location: "Madrid, España",
        startDate: "2018-03",
        endDate: "2020-12",
        current: false,
        description:
          "Mapeó flujos de trabajo operativos e identificó cuellos de botella, reduciendo tiempo de procesamiento en un 25%\nFacilitó talleres con stakeholders para alinear prioridades de negocio y tecnología\nRedactó especificaciones funcionales para migración de sistema legado",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "IE Business School",
        degree: "MBA",
        field: "Gestión de Proyectos",
        startDate: "2019-09",
        endDate: "2020-12",
        highlights: "Mejor Proyecto Final",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Análisis", skills: ["Modelado de Procesos", "Requisitos", "SQL", "Data Visualization"] },
      { id: generateId(), category: "Herramientas", skills: ["Tableau", "Power BI", "Jira", "Confluence"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Modelo de Predicción de Churn",
        description: "Desarrolló modelo predictivo que identificó clientes en riesgo con 87% de precisión, permitiendo estrategias proactivas que redujeron churn en un 15%.",
        technologies: ["Python", "Tableau", "SQL"],
        startDate: "2022-03",
        endDate: "2022-09",
      },
    ],
  },
  minimal: {
    fullName: "Pablo Martínez",
    headline: "Diseñador de Producto",
    summary:
      "Diseñador de producto con 4+ años creando experiencias digitales intuitivas. Enfocado en design systems, investigación de usuarios y prototipado de alta fidelidad.",
    contact: {
      email: "pablo.martinez@email.com",
      phone: "+34 634 567 890",
      location: "Valencia, España",
      linkedin: "linkedin.com/in/pablomartinez",
      website: "pablomartinez.design",
    },
    experience: [
      {
        id: generateId(),
        company: "Glovo",
        title: "Diseñador de Producto Senior",
        location: "Barcelona, España",
        startDate: "2022-01",
        endDate: null,
        current: true,
        description:
          "Rediseñó el flujo de checkout de la app resultando en un aumento del 22% en conversión\nCreó y mantuvo design system usado por 12 equipos de producto\nConductó más de 40 sesiones de investigación con usuarios para validar decisiones de diseño",
      },
      {
        id: generateId(),
        company: "Wallapop",
        title: "Diseñador de Producto",
        location: "Barcelona, España",
        startDate: "2019-06",
        endDate: "2021-12",
        current: false,
        description:
          "Diseñó la experiencia de onboarding para vendedores, reduciendo tiempo de registro en un 35%\nColaboró con ingenieros para implementar animaciones y micro-interacciones\nEstableció directrices de accesibilidad para todos los productos digitales",
      },
    ],
    education: [
      {
        id: generateId(),
        school: "Universitat Politècnica de València",
        degree: "Grado",
        field: "Diseño y Tecnologías Creativas",
        startDate: "2015-09",
        endDate: "2019-06",
        highlights: "Premio al Mejor Proyecto de Diseño de Interfaces",
      },
    ],
    skillGroups: [
      { id: generateId(), category: "Diseño", skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"] },
      { id: generateId(), category: "Investigación", skills: ["Tests de Usabilidad", "Entrevistas", "Analytics", "A/B Testing"] },
    ],
    projects: [
      {
        id: generateId(),
        name: "Design System Open-Source",
        description: "Creó un design system completo con más de 50 componentes, documentación interactiva y tokens de diseño. Adoptado por 3 startups españolas.",
        url: "github.com/pablomartinez/verde-ui",
        technologies: ["Figma", "Storybook", "React"],
        startDate: "2023-01",
        endDate: null,
      },
    ],
  },
};

/**
 * Returns localized sample data for a template.
 * Falls back to the template's default English data if no localization exists.
 */
export function getLocalizedSampleData(
  templateId: string,
  locale: string = "en",
): Partial<ResumeData> | undefined {
  const tmpl = TEMPLATES.find((t) => t.id === templateId);
  if (!tmpl?.sampleData) return undefined;

  if (locale === "pt-BR") return PT_BR_SAMPLE_DATA[templateId] ?? tmpl.sampleData;
  if (locale === "es") return ES_SAMPLE_DATA[templateId] ?? tmpl.sampleData;
  return tmpl.sampleData;
}
