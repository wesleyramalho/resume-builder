"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server.ts
var server_exports = {};
__export(server_exports, {
  PDF_FONT: () => PDF_FONT,
  ResumePDFDocument: () => ResumePDFDocument,
  TEMPLATES: () => TEMPLATES,
  contactSchema: () => contactSchema,
  createEmptyResumeData: () => createEmptyResumeData,
  educationEntrySchema: () => educationEntrySchema,
  experienceEntrySchema: () => experienceEntrySchema,
  formatMonthYear: () => formatMonthYear,
  generateId: () => generateId,
  generateResumePDF: () => generateResumePDF,
  getResumeStyle: () => getResumeStyle,
  getTemplate: () => getTemplate,
  hexWithAlpha: () => hexWithAlpha,
  personalInfoSchema: () => personalInfoSchema,
  projectEntrySchema: () => projectEntrySchema,
  skillGroupSchema: () => skillGroupSchema
});
module.exports = __toCommonJS(server_exports);

// src/lib/utils.ts
function generateId() {
  return typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2, 11);
}
function formatMonthYear(ym, locale = "en-US", presentLabel = "Present") {
  if (!ym) return presentLabel;
  const [year, month] = ym.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
}

// src/lib/resumeTemplates.ts
var TEMPLATES = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean layout with blue accents. Pre-filled for a software engineer.",
    style: {
      accentColor: "#2563eb",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "line"
    },
    previewPhoto: "/photos/modern.jpg",
    sampleData: {
      fullName: "Alex Chen",
      headline: "Senior Software Engineer",
      summary: "Full-stack engineer with 6+ years building scalable web applications. Passionate about developer experience, performance, and clean architecture.",
      contact: {
        email: "alex.chen@email.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/alexchen",
        website: "alexchen.dev"
      },
      experience: [
        {
          id: generateId(),
          company: "Stripe",
          title: "Senior Software Engineer",
          location: "San Francisco, CA",
          startDate: "2021-03",
          endDate: null,
          current: true,
          description: "Led migration of payments dashboard to React 18, improving load times by 40%\nDesigned and shipped real-time webhook monitoring used by 50K+ merchants\nMentored 4 junior engineers through structured code review and pairing sessions"
        },
        {
          id: generateId(),
          company: "Vercel",
          title: "Software Engineer",
          location: "Remote",
          startDate: "2018-06",
          endDate: "2021-02",
          current: false,
          description: "Built Next.js deployment pipeline optimizations reducing build times by 30%\nContributed to open-source tooling used by 500K+ developers\nImplemented edge caching strategy that cut API latency by 60%"
        },
        {
          id: generateId(),
          company: "Mosaic Labs",
          title: "Junior Software Engineer",
          location: "San Francisco, CA",
          startDate: "2017-05",
          endDate: "2018-05",
          current: false,
          description: "Developed internal tooling for CI/CD pipelines using Python and Bash\nBuilt RESTful APIs serving 10K+ daily requests with Node.js and Express\nParticipated in on-call rotation and resolved production incidents within SLA"
        }
      ],
      education: [
        {
          id: generateId(),
          school: "UC Berkeley",
          degree: "B.S.",
          field: "Computer Science",
          startDate: "2014-08",
          endDate: "2018-05",
          gpa: "3.8",
          highlights: "Dean's List, Teaching Assistant for CS 61B"
        },
        {
          id: generateId(),
          school: "AWS",
          degree: "Certification",
          field: "AWS Solutions Architect Associate",
          startDate: "2020-01",
          endDate: "2020-03",
          highlights: "Scored 920/1000"
        }
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Languages",
          skills: ["TypeScript", "Python", "Go", "SQL"]
        },
        {
          id: generateId(),
          category: "Frameworks",
          skills: ["React", "Next.js", "Node.js", "FastAPI"]
        },
        {
          id: generateId(),
          category: "Tools",
          skills: ["PostgreSQL", "Redis", "Docker", "AWS", "GitHub Actions"]
        }
      ],
      projects: [
        {
          id: generateId(),
          name: "Open-Source CLI Tool",
          description: "Built a developer CLI for scaffolding Next.js projects with pre-configured CI/CD, linting, and testing setups. 1.2K+ GitHub stars.",
          url: "github.com/alexchen/create-next-stack",
          technologies: ["TypeScript", "Node.js", "GitHub Actions"],
          startDate: "2022-01",
          endDate: "2022-06"
        }
      ]
    }
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional centered layout, text-only. Pre-filled for a business analyst.",
    style: {
      accentColor: "#111827",
      headerLayout: "centered",
      showPhoto: false,
      sectionDivider: "none"
    },
    sampleData: {
      fullName: "Sarah Mitchell",
      headline: "Business Analyst",
      summary: "Data-driven business analyst with 5 years of experience translating complex datasets into actionable strategies. Skilled at stakeholder management and cross-functional collaboration.",
      contact: {
        email: "sarah.mitchell@email.com",
        phone: "+1 (555) 876-5432",
        location: "New York, NY",
        linkedin: "linkedin.com/in/sarahmitchell",
        website: ""
      },
      experience: [
        {
          id: generateId(),
          company: "Goldman Sachs",
          title: "Business Analyst",
          location: "New York, NY",
          startDate: "2020-09",
          endDate: null,
          current: true,
          description: "Developed financial models that informed $2B+ in investment decisions\nLed requirements gathering for a new client reporting platform serving 200+ advisors\nReduced quarterly reporting cycle time by 35% through process automation"
        },
        {
          id: generateId(),
          company: "Deloitte",
          title: "Junior Analyst",
          location: "New York, NY",
          startDate: "2018-07",
          endDate: "2020-08",
          current: false,
          description: "Conducted market analysis for Fortune 500 clients across 3 industries\nCreated dashboards in Tableau adopted by 15+ consulting teams\nSupported due diligence on M&A transactions totaling $500M"
        },
        {
          id: generateId(),
          company: "Accenture",
          title: "Analyst Intern",
          location: "Boston, MA",
          startDate: "2017-06",
          endDate: "2018-06",
          current: false,
          description: "Assisted senior consultants with data collection and analysis for retail clients\nBuilt financial models in Excel to forecast quarterly revenue trends\nPresented findings to client stakeholders in weekly status meetings"
        }
      ],
      education: [
        {
          id: generateId(),
          school: "NYU Stern School of Business",
          degree: "B.S.",
          field: "Finance & Data Science",
          startDate: "2014-09",
          endDate: "2018-05",
          gpa: "3.7",
          highlights: "Magna Cum Laude, Finance Club President"
        },
        {
          id: generateId(),
          school: "CFA Institute",
          degree: "Certification",
          field: "CFA Level I",
          startDate: "2019-01",
          endDate: "2019-06",
          highlights: "Passed on first attempt"
        }
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Analysis",
          skills: ["Financial Modeling", "SQL", "Python", "Excel"]
        },
        {
          id: generateId(),
          category: "Tools",
          skills: ["Tableau", "Power BI", "Jira", "Confluence"]
        }
      ],
      projects: [
        {
          id: generateId(),
          name: "Customer Churn Prediction Model",
          description: "Developed a predictive analytics model that identified at-risk customers with 87% accuracy, enabling proactive retention strategies that reduced churn by 15%.",
          technologies: ["Python", "Tableau", "SQL"],
          startDate: "2022-03",
          endDate: "2022-09"
        }
      ]
    }
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Sleek and minimal with green accents. Pre-filled for a designer.",
    style: {
      accentColor: "#059669",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "none"
    },
    previewPhoto: "/photos/minimal.jpg",
    sampleData: {
      fullName: "Jordan Rivera",
      headline: "Product Designer",
      summary: "Product designer crafting intuitive digital experiences for 4+ years. Focused on design systems, accessibility, and bridging the gap between design and engineering.",
      contact: {
        email: "jordan@designstudio.co",
        phone: "",
        location: "Austin, TX",
        linkedin: "linkedin.com/in/jordanrivera",
        website: "jordanrivera.design"
      },
      experience: [
        {
          id: generateId(),
          company: "Figma",
          title: "Product Designer",
          location: "Remote",
          startDate: "2022-01",
          endDate: null,
          current: true,
          description: "Designed component library used across 8 product teams\nLed redesign of collaboration features increasing daily active usage by 25%\nEstablished accessibility guidelines adopted company-wide"
        },
        {
          id: generateId(),
          company: "Spotify",
          title: "UI/UX Designer",
          location: "New York, NY",
          startDate: "2019-06",
          endDate: "2021-12",
          current: false,
          description: "Redesigned playlist creation flow reducing drop-off rate by 18%\nConducted 40+ user research sessions to validate design decisions\nBuilt and maintained Spotify's internal design system documentation"
        },
        {
          id: generateId(),
          company: "Dribbble Studio",
          title: "Junior Designer",
          location: "Austin, TX",
          startDate: "2018-06",
          endDate: "2019-05",
          current: false,
          description: "Created visual assets and UI mockups for 10+ client projects\nAssisted lead designer in building brand identity kits for startups\nDesigned responsive landing pages that increased client conversions by 12%"
        }
      ],
      education: [
        {
          id: generateId(),
          school: "Rhode Island School of Design",
          degree: "BFA",
          field: "Graphic Design",
          startDate: "2015-09",
          endDate: "2019-05",
          highlights: "President's Honor List"
        },
        {
          id: generateId(),
          school: "Google",
          degree: "Certification",
          field: "UX Design Professional Certificate",
          startDate: "2020-03",
          endDate: "2020-08",
          highlights: "Completed with honors"
        }
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Design",
          skills: ["Figma", "Sketch", "Adobe CC", "Prototyping"]
        },
        {
          id: generateId(),
          category: "Development",
          skills: ["HTML/CSS", "React", "Tailwind CSS", "Storybook"]
        }
      ],
      projects: [
        {
          id: generateId(),
          name: "DesignTokens.io",
          description: "Open-source tool for generating and syncing design tokens between Figma and code. 2K+ GitHub stars.",
          url: "github.com/jordanrivera/designtokens",
          technologies: ["React", "TypeScript", "Figma Plugin API"],
          startDate: "2023-03",
          endDate: null
        }
      ]
    }
  },
  {
    id: "executive",
    name: "Executive",
    description: "Navy sidebar for executive and corporate roles.",
    style: {
      accentColor: "#1e3a5f",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "line",
      sidebarColor: "#1e3a5f"
    },
    previewPhoto: "/photos/executive.jpg",
    sampleData: {
      fullName: "Charlotte Warren",
      headline: "Recruitment Officer",
      summary: "A self-driven, results-oriented Recruitment & HR Specialist with extensive experience in providing a full range of HR, Recruitment and Talent Management guidance. Balancing strategic planning with practical delivery to a diverse range of clients.",
      contact: {
        email: "charlotte@email.com",
        phone: "+1 (555) 202-0759",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/charlottewarren",
        website: ""
      },
      experience: [
        {
          id: generateId(),
          company: "Haskins Corp",
          title: "Recruitment Officer",
          location: "Paris",
          startDate: "2013-07",
          endDate: null,
          current: true,
          description: "Responsible for full recruitment lifecycle of employees across 8 locations\nAttend progress meetings with key clients, monitoring performance and results\nReduced cost to hire by 22% through strategic sourcing initiatives"
        },
        {
          id: generateId(),
          company: "DPG Recruitment",
          title: "Trainer & Consultant",
          location: "New York",
          startDate: "2010-01",
          endDate: "2013-07",
          current: false,
          description: "Oversaw online recruitment system projects meeting strategic objectives\nManaged client portfolios, undertaking business analysis and building relationships\nTrained 50+ junior recruiters on best practices and compliance"
        },
        {
          id: generateId(),
          company: "Randstad",
          title: "HR Coordinator",
          location: "Boston, MA",
          startDate: "2008-08",
          endDate: "2009-12",
          current: false,
          description: "Coordinated onboarding processes for 100+ new hires annually\nMaintained employee records and ensured compliance with labor regulations\nAssisted in organizing career fairs and campus recruitment events"
        }
      ],
      education: [
        {
          id: generateId(),
          school: "CUNY",
          degree: "M.S.",
          field: "HR Strategic Management",
          startDate: "2005-09",
          endDate: "2008-07",
          highlights: "Graduated with distinction"
        },
        {
          id: generateId(),
          school: "SHRM",
          degree: "Certification",
          field: "SHRM Certified Professional (SHRM-CP)",
          startDate: "2011-01",
          endDate: "2011-06",
          highlights: ""
        }
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "HR",
          skills: [
            "Recruitment",
            "HR Management",
            "Employee Relations",
            "Talent Acquisition"
          ]
        },
        {
          id: generateId(),
          category: "Languages",
          skills: ["English", "French", "Spanish"]
        }
      ],
      projects: [
        {
          id: generateId(),
          name: "Employer Branding Initiative",
          description: "Led a company-wide employer branding project that revamped career pages and social presence, increasing qualified applications by 40% within 6 months.",
          technologies: ["LinkedIn Recruiter", "Greenhouse", "Canva"],
          startDate: "2023-01",
          endDate: "2023-07"
        }
      ]
    }
  },
  {
    id: "bold",
    name: "Bold",
    description: "Deep red header banner. Strong and confident.",
    style: {
      accentColor: "#b91c1c",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "line",
      headerBgColor: "#b91c1c",
      photoPosition: "top-right"
    },
    previewPhoto: "/photos/bold.jpg",
    sampleData: {
      fullName: "Herman Walton",
      headline: "Financial Analyst",
      summary: "Experienced and driven financial analyst with an impressive background in managing multi-million dollar budgets while providing analysis and account support within product development departments. Experience creating quarterly accounts based on trends and forecasted expenses.",
      contact: {
        email: "herman.walton@email.com",
        phone: "+1 (412) 479-6342",
        location: "New York, NY",
        linkedin: "linkedin.com/in/hermanwalton",
        website: ""
      },
      experience: [
        {
          id: generateId(),
          company: "GEO Corp",
          title: "Financial Analyst",
          location: "New York, NY",
          startDate: "2012-01",
          endDate: null,
          current: true,
          description: "Created budgets and ensured that labor and material costs were decreased by 15%\nGenerated financial statements including cash flow charts and balance sheets\nCreated analysis and performance reports for management teams to review"
        },
        {
          id: generateId(),
          company: "Sisco Enterprises",
          title: "Financial Analyst",
          location: "Seattle, WA",
          startDate: "2008-02",
          endDate: "2012-12",
          current: false,
          description: "Provided reports, ad-hoc analysis, annual operations plan budgets and revenue forecasts\nAnalysed supplier contracts and advised in negotiations bringing budgets down by 6%\nCreated weekly labor finance reports and presented results to management"
        },
        {
          id: generateId(),
          company: "PricewaterhouseCoopers",
          title: "Junior Financial Analyst",
          location: "Phoenix, AZ",
          startDate: "2006-11",
          endDate: "2008-01",
          current: false,
          description: "Assisted senior analysts in preparing quarterly financial reports and variance analyses\nReconciled accounts and maintained accurate records for audit readiness\nSupported budgeting process for 3 mid-size corporate clients"
        }
      ],
      education: [
        {
          id: generateId(),
          school: "University of Arizona",
          degree: "M.S.",
          field: "Computer Engineering",
          startDate: "2004-08",
          endDate: "2006-10",
          highlights: "Graduated with High Honors"
        },
        {
          id: generateId(),
          school: "University of Arizona",
          degree: "B.S.",
          field: "Computer Engineering",
          startDate: "2000-08",
          endDate: "2004-10",
          highlights: "Graduated with High Honors"
        }
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Technical",
          skills: [
            "Solution Strategies",
            "Analytical Thinker",
            "Market Assessment",
            "Trend Analysis"
          ]
        },
        {
          id: generateId(),
          category: "Soft Skills",
          skills: [
            "Effective Team Leader",
            "Collaboration",
            "Customer-centric Selling",
            "Networking"
          ]
        }
      ],
      projects: [
        {
          id: generateId(),
          name: "Quarterly Forecast Dashboard",
          description: "Built an automated financial forecasting dashboard in Power BI that consolidated data from 5 departments, reducing report generation time from 3 days to 2 hours.",
          technologies: ["Power BI", "Excel VBA", "SQL Server"],
          startDate: "2023-06",
          endDate: "2023-12"
        }
      ]
    }
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "Dark sidebar accent with centered photo. Great for trades and hands-on roles.",
    style: {
      accentColor: "#1e293b",
      headerLayout: "centered",
      showPhoto: true,
      sectionDivider: "line",
      headerBgColor: "#1e293b",
      photoPosition: "top-center"
    },
    previewPhoto: "/photos/balanced.jpg",
    sampleData: {
      fullName: "Gregory Walls",
      headline: "Carpenter",
      summary: "Skilled and passionate Carpenter with 10+ years of experience in residential and commercial building. Positive reputation for quality work, timely construction, and finishing projects at or below estimated budget.",
      contact: {
        email: "gregory.walls@email.com",
        phone: "(203) 724-8485",
        location: "Bethel, CT",
        linkedin: "linkedin.com/in/gregorywalls",
        website: ""
      },
      experience: [
        {
          id: generateId(),
          company: "Timothy Glover Carpentry Inc.",
          title: "Carpenter",
          location: "Bethel",
          startDate: "2011-03",
          endDate: null,
          current: true,
          description: "Provided clients with supreme customer service and worked collaboratively to achieve construction needs\nRenovated 20 kitchens, installing top of the line cabinetry and plumbing fixtures\nBuilt 10 exterior decks and walkways ensuring each structure met code"
        },
        {
          id: generateId(),
          company: "Ringwood Inc.",
          title: "Carpenter",
          location: "Brookfield",
          startDate: "2007-02",
          endDate: "2011-02",
          current: false,
          description: "Worked one-on-one with clients to assess their needs and desires before beginning construction\nCreated clear blueprints and financial budgets for each project\nSpecialized in construction of bridge supports"
        },
        {
          id: generateId(),
          company: "Danbury Construction Co.",
          title: "Apprentice Carpenter",
          location: "Danbury, CT",
          startDate: "2005-06",
          endDate: "2007-01",
          current: false,
          description: "Assisted journeyman carpenters with framing, roofing, and finish work on residential projects\nLearned safe operation of power tools, table saws, and nail guns\nHelped maintain organized and clean job sites in compliance with OSHA standards"
        }
      ],
      education: [
        {
          id: generateId(),
          school: "Charter Oak State College",
          degree: "Apprenticeship",
          field: "Carpentry",
          startDate: "2005-08",
          endDate: "2007-05",
          highlights: ""
        },
        {
          id: generateId(),
          school: "OSHA Training Institute",
          degree: "Certification",
          field: "OSHA 30-Hour Construction Safety",
          startDate: "2008-03",
          endDate: "2008-04",
          highlights: ""
        }
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Technical",
          skills: [
            "Mechanical Skills",
            "Critical Thinking",
            "Hand-Eye Coordination",
            "Power Tools"
          ]
        },
        {
          id: generateId(),
          category: "Management",
          skills: ["Time Management", "Supervision", "Quality Control"]
        }
      ],
      projects: [
        {
          id: generateId(),
          name: "Custom Kitchen Renovation",
          description: "Designed and built a full kitchen renovation including custom cabinetry, hardwood flooring, and structural modifications. Completed on time and 10% under budget.",
          technologies: ["AutoCAD", "Woodworking", "Project Estimation"],
          startDate: "2023-03",
          endDate: "2023-08"
        }
      ]
    }
  },
  {
    id: "clear",
    name: "Clear",
    description: "Teal header banner with right-aligned photo. Clean and modern.",
    style: {
      accentColor: "#0f766e",
      headerLayout: "standard",
      showPhoto: true,
      sectionDivider: "line",
      headerBgColor: "#0f766e",
      photoPosition: "top-right"
    },
    previewPhoto: "/photos/clear.jpg",
    sampleData: {
      fullName: "Patricia Giordano",
      headline: "Receptionist",
      summary: "Hardworking and experienced Receptionist with several years of experience serving as a supportive and integral employee in high volume client settings. Experienced in creating schedules, making appointments, and providing clients with optimal customer service.",
      contact: {
        email: "patricia.g@email.com",
        phone: "(530) 732-2544",
        location: "San Francisco, CA",
        linkedin: "linkedin.com/in/patriciagiordano",
        website: ""
      },
      experience: [
        {
          id: generateId(),
          company: "Luxury Hotel Group",
          title: "Front Desk Receptionist",
          location: "San Francisco, CA",
          startDate: "2014-10",
          endDate: null,
          current: true,
          description: "Greeted guests and managed check-in/check-out procedures for 200+ room property\nManaged phone calls, mail distribution, and appointment scheduling\nCoordinated with housekeeping and maintenance to ensure guest satisfaction"
        },
        {
          id: generateId(),
          company: "Little Star Day Spa",
          title: "Receptionist",
          location: "Los Angeles, CA",
          startDate: "2010-06",
          endDate: "2014-10",
          current: false,
          description: "Answered phone calls, greeted clients, and handled all front desk responsibilities\nHandled spa orders, mail, and some accounting responsibilities\nProvided clients with information on services, technology, and products offered"
        },
        {
          id: generateId(),
          company: "West Valley Medical Center",
          title: "Front Desk Clerk",
          location: "Los Angeles, CA",
          startDate: "2008-09",
          endDate: "2010-05",
          current: false,
          description: "Managed patient check-in and check-out procedures for busy medical office\nScheduled appointments and maintained accurate patient records in EHR system\nProcessed insurance verifications and co-payments for 80+ patients daily"
        }
      ],
      education: [
        {
          id: generateId(),
          school: "Pierce College",
          degree: "Associate",
          field: "Communications",
          startDate: "2008-08",
          endDate: "2010-05",
          highlights: ""
        },
        {
          id: generateId(),
          school: "International Association of Administrative Professionals",
          degree: "Certification",
          field: "Certified Administrative Professional (CAP)",
          startDate: "2012-01",
          endDate: "2012-06",
          highlights: ""
        }
      ],
      skillGroups: [
        {
          id: generateId(),
          category: "Skills",
          skills: [
            "Communication",
            "Multitasking",
            "Scheduling",
            "Office Technology",
            "Bookkeeping"
          ]
        },
        {
          id: generateId(),
          category: "Languages",
          skills: ["English", "Italian", "French", "Spanish"]
        }
      ],
      projects: [
        {
          id: generateId(),
          name: "Office Digitization Project",
          description: "Led the transition from paper-based to digital filing systems across 3 departments, training 25+ staff members and reducing document retrieval time by 70%.",
          technologies: ["Google Workspace", "DocuSign", "Notion"],
          startDate: "2023-02",
          endDate: "2023-06"
        }
      ]
    }
  }
];
function getTemplate(id) {
  return TEMPLATES.find((t) => t.id === id);
}
function getResumeStyle(templateId) {
  var _a, _b, _c, _d;
  const tmpl = templateId ? getTemplate(templateId) : void 0;
  return {
    accentColor: (_a = tmpl == null ? void 0 : tmpl.style.accentColor) != null ? _a : "#111827",
    sectionDivider: (_b = tmpl == null ? void 0 : tmpl.style.sectionDivider) != null ? _b : "line",
    headerBgColor: tmpl == null ? void 0 : tmpl.style.headerBgColor,
    headerLayout: (_c = tmpl == null ? void 0 : tmpl.style.headerLayout) != null ? _c : "standard",
    photoPosition: (_d = tmpl == null ? void 0 : tmpl.style.photoPosition) != null ? _d : "top-left",
    sidebarColor: tmpl == null ? void 0 : tmpl.style.sidebarColor
  };
}
function hexWithAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const br = Math.round(r * alpha + 255 * (1 - alpha));
  const bg = Math.round(g * alpha + 255 * (1 - alpha));
  const bb = Math.round(b * alpha + 255 * (1 - alpha));
  return `#${br.toString(16).padStart(2, "0")}${bg.toString(16).padStart(2, "0")}${bb.toString(16).padStart(2, "0")}`;
}

// src/lib/resumeDefaults.ts
function createEmptyResumeData() {
  return {
    fullName: "",
    headline: "",
    summary: "",
    contact: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: ""
    },
    experience: [],
    education: [],
    skillGroups: [],
    projects: [],
    sections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true
    },
    sectionOrder: ["summary", "experience", "education", "skills", "projects"]
  };
}

// src/lib/schemas.ts
var import_zod = require("zod");
var optionalEmail = import_zod.z.string().max(255, "tooLong").refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
  message: "invalidEmail"
});
var optionalUrl = import_zod.z.string().max(200, "tooLong").refine(
  (val) => val === "" || /^https?:\/\/.+/.test(val) || /^[\w-]+(\.[\w-]+)+/.test(val),
  { message: "invalidUrl" }
);
var contactSchema = import_zod.z.object({
  email: optionalEmail,
  phone: import_zod.z.string().max(30, "tooLong"),
  location: import_zod.z.string().max(100, "tooLong"),
  linkedin: import_zod.z.string().max(200, "tooLong"),
  website: optionalUrl
});
var personalInfoSchema = import_zod.z.object({
  fullName: import_zod.z.string().max(100, "tooLong"),
  headline: import_zod.z.string().max(150, "tooLong"),
  contact: contactSchema
});
var experienceEntrySchema = import_zod.z.object({
  id: import_zod.z.string(),
  company: import_zod.z.string().max(100, "tooLong"),
  title: import_zod.z.string().max(100, "tooLong"),
  location: import_zod.z.string().max(100, "tooLong"),
  startDate: import_zod.z.string(),
  endDate: import_zod.z.string().nullable(),
  current: import_zod.z.boolean(),
  description: import_zod.z.string().max(3e3, "tooLong")
});
var educationEntrySchema = import_zod.z.object({
  id: import_zod.z.string(),
  school: import_zod.z.string().max(100, "tooLong"),
  degree: import_zod.z.string().max(100, "tooLong"),
  field: import_zod.z.string().max(100, "tooLong"),
  startDate: import_zod.z.string(),
  endDate: import_zod.z.string().nullable(),
  gpa: import_zod.z.string().max(10, "tooLong").optional(),
  highlights: import_zod.z.string().max(2e3, "tooLong")
});
var skillGroupSchema = import_zod.z.object({
  id: import_zod.z.string(),
  category: import_zod.z.string().max(50, "tooLong"),
  skills: import_zod.z.array(import_zod.z.string().max(50, "tooLong"))
});
var projectEntrySchema = import_zod.z.object({
  id: import_zod.z.string(),
  name: import_zod.z.string().max(100, "tooLong"),
  description: import_zod.z.string().max(3e3, "tooLong"),
  url: optionalUrl.optional(),
  technologies: import_zod.z.array(import_zod.z.string().max(50, "tooLong")),
  startDate: import_zod.z.string(),
  endDate: import_zod.z.string().nullable()
});

// src/lib/pdf.ts
var import_renderer2 = require("@react-pdf/renderer");

// src/components/ResumePDFDocument.tsx
var import_renderer = require("@react-pdf/renderer");
var import_server = require("@mypdfcv/i18n/server");
var import_jsx_runtime = require("react/jsx-runtime");
var PDF_FONT = "Helvetica";
function getT(locale, messages) {
  const msgs = messages != null ? messages : (0, import_server.getMessages)(locale);
  return (ns, key) => {
    var _a;
    const nsObj = msgs[ns];
    return (_a = nsObj == null ? void 0 : nsObj[key]) != null ? _a : key;
  };
}
import_renderer.Font.registerHyphenationCallback((word) => [word]);
function buildStyles(tmpl) {
  const { accentColor: accent, sectionDivider: divider, headerBgColor } = tmpl;
  const hasBg = !!headerBgColor;
  const isCentered = tmpl.photoPosition === "top-center" || tmpl.headerLayout === "centered";
  const nameColor = hasBg ? "#ffffff" : accent;
  const headlineColor = hasBg ? "rgba(255,255,255,0.7)" : "#6b7280";
  const contactColor = hasBg ? "rgba(255,255,255,0.6)" : "#9ca3af";
  return import_renderer.StyleSheet.create({
    page: {
      fontFamily: PDF_FONT,
      fontSize: 9,
      color: "#1a1a1a",
      paddingHorizontal: 48,
      paddingVertical: 40,
      backgroundColor: "#ffffff"
    },
    header: __spreadValues(__spreadValues({
      fontFamily: PDF_FONT,
      borderBottomWidth: hasBg ? 0 : 0.5,
      borderBottomColor: hexWithAlpha(accent, 0.25),
      paddingBottom: 10,
      marginBottom: 10
    }, hasBg ? {
      backgroundColor: headerBgColor,
      marginHorizontal: -48,
      marginTop: -40,
      paddingHorizontal: 48,
      paddingTop: 30,
      paddingBottom: 20
    } : {}), isCentered ? { alignItems: "center" } : {}),
    name: __spreadValues({
      fontSize: 16,
      fontFamily: PDF_FONT,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: nameColor,
      marginBottom: 8
    }, isCentered ? { textAlign: "center" } : {}),
    headline: __spreadValues({
      fontSize: 8,
      fontFamily: PDF_FONT,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: headlineColor,
      marginTop: 2,
      marginBottom: 4
    }, isCentered ? { textAlign: "center" } : {}),
    contactRow: __spreadValues({
      flexDirection: "row",
      fontFamily: PDF_FONT,
      flexWrap: "wrap",
      gap: 8,
      marginTop: 4
    }, isCentered ? { justifyContent: "center" } : {}),
    contactText: {
      fontFamily: PDF_FONT,
      fontSize: 7.5,
      color: contactColor
    },
    section: {
      fontFamily: PDF_FONT,
      marginBottom: 10
    },
    sectionTitle: {
      fontSize: 7,
      fontFamily: PDF_FONT,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 1.5,
      color: hexWithAlpha(accent, 0.4),
      borderBottomWidth: divider === "line" ? 0.5 : 0,
      borderBottomColor: hexWithAlpha(accent, 0.15),
      paddingBottom: 3,
      marginBottom: 6
    },
    summaryText: {
      fontFamily: PDF_FONT,
      fontSize: 9,
      color: "#4b5563",
      lineHeight: 1.5
    },
    expItem: {
      fontFamily: PDF_FONT,
      marginBottom: 8
    },
    expHeader: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    expCompany: {
      fontSize: 9,
      fontFamily: PDF_FONT,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      color: accent
    },
    expTitle: {
      fontFamily: PDF_FONT,
      fontSize: 8,
      color: "#6b7280",
      marginTop: 1
    },
    expDate: {
      fontFamily: PDF_FONT,
      fontSize: 7.5,
      color: "#9ca3af",
      textAlign: "right"
    },
    bullet: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      gap: 4,
      marginTop: 2
    },
    bulletDot: {
      fontFamily: PDF_FONT,
      fontSize: 9,
      color: "#d1d5db",
      marginTop: 0.5
    },
    bulletText: {
      fontFamily: PDF_FONT,
      fontSize: 8.5,
      color: "#374151",
      flex: 1,
      lineHeight: 1.4
    },
    eduItem: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 6
    },
    eduSchool: {
      fontFamily: PDF_FONT,
      fontSize: 9,
      fontWeight: 700,
      color: accent
    },
    eduDegree: {
      fontFamily: PDF_FONT,
      fontSize: 8,
      color: "#6b7280",
      marginTop: 1
    },
    skillsRow: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
      marginTop: 2
    },
    skillTag: {
      fontFamily: PDF_FONT,
      fontSize: 7.5,
      borderWidth: 0.5,
      borderColor: hexWithAlpha(accent, 0.2),
      color: "#6b7280",
      paddingHorizontal: 4,
      paddingVertical: 1.5
    },
    skillCategory: {
      fontFamily: PDF_FONT,
      fontSize: 7.5,
      color: "#9ca3af",
      marginRight: 4,
      marginTop: 2,
      textTransform: "uppercase",
      letterSpacing: 0.5
    },
    skillGroupRow: {
      fontFamily: PDF_FONT,
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 3
    }
  });
}
var DEFAULT_SECTION_ORDER = [
  "experience",
  "education",
  "skills",
  "projects",
  "summary"
];
function SummarySection({ data, s, t }) {
  if (!data.sections.summary || !data.summary) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.section, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.sectionTitle, children: t("resume", "profile") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.summaryText, children: data.summary })
  ] });
}
function ExperienceSection({ data, s, localeTag, presentLabel, t }) {
  if (!data.sections.experience || data.experience.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.section, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.sectionTitle, children: t("resume", "professionalExperience") }),
    data.experience.map((exp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.expItem, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.expHeader, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.expCompany, children: exp.company }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.expTitle, children: [
            exp.title,
            exp.location ? ` \xB7 ${exp.location}` : ""
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.expDate, children: [
          formatMonthYear(exp.startDate, localeTag, presentLabel),
          " \u2013",
          " ",
          exp.current ? presentLabel : formatMonthYear(exp.endDate, localeTag, presentLabel)
        ] })
      ] }),
      exp.description ? exp.description.split("\n").filter(Boolean).map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.bullet, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.bulletDot, children: "\u2022" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.bulletText, children: line })
      ] }, i)) : null
    ] }, exp.id))
  ] });
}
function EducationSection({ data, s, localeTag, presentLabel, t }) {
  if (!data.sections.education || data.education.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.section, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.sectionTitle, children: t("resume", "education") }),
    data.education.map((edu) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: { marginBottom: 6 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_renderer.View,
        {
          style: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.eduSchool, children: edu.school }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.eduDegree, children: [
                [edu.degree, edu.field].filter(Boolean).join(" \xB7 "),
                edu.gpa ? ` \xB7 GPA ${edu.gpa}` : ""
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.expDate, children: [
              formatMonthYear(edu.startDate, localeTag, presentLabel),
              " \u2013 ",
              formatMonthYear(edu.endDate, localeTag, presentLabel)
            ] })
          ]
        }
      ),
      edu.highlights ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: { fontFamily: PDF_FONT, fontSize: 7.5, color: "#6b7280", marginTop: 2, fontStyle: "italic" }, children: edu.highlights }) : null
    ] }, edu.id))
  ] });
}
function SkillsSection({ data, s, t }) {
  if (!data.sections.skills || data.skillGroups.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.section, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.sectionTitle, children: t("resume", "technicalSkills") }),
    data.skillGroups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.skillGroupRow, children: [
      group.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.skillCategory, children: group.category }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.View, { style: s.skillsRow, children: group.skills.map((skill, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.skillTag, children: skill }, i)) })
    ] }, group.id))
  ] });
}
function ProjectsSection({ data, s, localeTag, presentLabel, t }) {
  if (!data.sections.projects || data.projects.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.section, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.sectionTitle, children: t("resume", "projects") }),
    data.projects.map((proj, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: [s.expItem, i > 0 ? { marginTop: 8 } : {}], children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: s.expHeader, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.expCompany, children: proj.name }),
          proj.technologies.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.expTitle, children: proj.technologies.join(" \xB7 ") }) : null,
          proj.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: [s.expTitle, { color: "#9ca3af" }], children: proj.url }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Text, { style: s.expDate, children: [
          formatMonthYear(proj.startDate, localeTag, presentLabel),
          " \u2013",
          " ",
          formatMonthYear(proj.endDate, localeTag, presentLabel)
        ] })
      ] }),
      proj.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.bulletText, children: proj.description }) : null
    ] }, proj.id))
  ] });
}
function ResumePDFDocument({ resume, locale = "en", messages }) {
  var _a;
  const { data } = resume;
  const tmpl = getResumeStyle(resume.templateId);
  const s = buildStyles(tmpl);
  const t = getT(locale, messages);
  const localeTag = locale === "pt-BR" ? "pt-BR" : "en-US";
  const presentLabel = t("resume", "present");
  const order = ((_a = data.sectionOrder) == null ? void 0 : _a.length) ? data.sectionOrder : DEFAULT_SECTION_ORDER;
  const contactParts = [
    data.contact.location,
    data.contact.email,
    data.contact.phone,
    data.contact.linkedin,
    data.contact.website
  ].filter(Boolean);
  const hasSidebar = !!tmpl.sidebarColor;
  const headerBlock = !hasSidebar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_renderer.View,
    {
      style: [
        s.header,
        {
          flexDirection: tmpl.photoPosition === "top-center" || tmpl.headerLayout === "centered" ? "column" : "row",
          alignItems: tmpl.photoPosition === "top-center" || tmpl.headerLayout === "centered" ? "center" : "flex-start"
        }
      ],
      children: [
        data.photo && tmpl.photoPosition !== "top-right" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_renderer.Image,
          {
            src: data.photo,
            style: __spreadValues(__spreadValues({
              width: 32,
              height: 32,
              borderRadius: 16
            }, tmpl.photoPosition === "top-center" || tmpl.headerLayout === "centered" ? { marginBottom: 10 } : { marginRight: 10 }), tmpl.headerBgColor ? { borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" } : {})
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_renderer.View,
          {
            style: __spreadValues({}, tmpl.photoPosition === "top-center" || tmpl.headerLayout === "centered" ? { width: "100%" } : { flex: 1 }),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.name, children: data.fullName }),
              data.headline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.headline, children: data.headline }) : null,
              contactParts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.View, { style: s.contactRow, children: contactParts.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Text, { style: s.contactText, children: c }, i)) })
            ]
          }
        ),
        data.photo && tmpl.photoPosition === "top-right" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_renderer.Image,
          {
            src: data.photo,
            style: __spreadValues({
              width: 32,
              height: 32,
              borderRadius: 16,
              marginLeft: 10
            }, tmpl.headerBgColor ? { borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" } : {})
          }
        ) : null
      ]
    }
  ) : null;
  const sectionProps = { data, s, localeTag, presentLabel, t };
  const sectionsBlock = order.map((sectionId) => {
    if (sectionId === "summary")
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummarySection, __spreadValues({}, sectionProps), sectionId);
    if (sectionId === "experience")
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExperienceSection, __spreadValues({}, sectionProps), sectionId);
    if (sectionId === "education")
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EducationSection, __spreadValues({}, sectionProps), sectionId);
    if (sectionId === "skills" && !hasSidebar)
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsSection, __spreadValues({}, sectionProps), sectionId);
    if (sectionId === "projects")
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsSection, __spreadValues({}, sectionProps), sectionId);
    return null;
  });
  if (hasSidebar) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Document, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_renderer.Page,
      {
        size: "A4",
        style: [
          s.page,
          { paddingHorizontal: 0, paddingVertical: 0, flexDirection: "row" }
        ],
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_renderer.View,
            {
              style: {
                width: "30%",
                backgroundColor: tmpl.sidebarColor,
                padding: 20,
                alignItems: "center"
              },
              children: [
                data.photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_renderer.Image,
                  {
                    src: data.photo,
                    style: {
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      marginBottom: 8,
                      borderWidth: 2,
                      borderColor: "rgba(255,255,255,0.3)"
                    }
                  }
                ) : null,
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_renderer.Text,
                  {
                    style: {
                      fontFamily: PDF_FONT,
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#ffffff",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      textAlign: "center"
                    },
                    children: data.fullName
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_renderer.Text,
                  {
                    style: {
                      fontFamily: PDF_FONT,
                      fontSize: 7,
                      color: "rgba(255,255,255,0.7)",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      marginTop: 2,
                      textAlign: "center"
                    },
                    children: data.headline
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.View, { style: { marginTop: 10, gap: 2 }, children: [
                  data.contact.location,
                  data.contact.email,
                  data.contact.phone,
                  data.contact.linkedin,
                  data.contact.website
                ].filter(Boolean).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_renderer.Text,
                  {
                    style: {
                      fontFamily: PDF_FONT,
                      fontSize: 6.5,
                      color: "rgba(255,255,255,0.6)",
                      textAlign: "center"
                    },
                    children: item
                  },
                  i
                )) }),
                data.skillGroups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: { marginTop: 12, width: "100%" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    import_renderer.Text,
                    {
                      style: {
                        fontFamily: PDF_FONT,
                        fontSize: 6,
                        color: "rgba(255,255,255,0.5)",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 4
                      },
                      children: t("resume", "skills")
                    }
                  ),
                  data.skillGroups.map((group, gi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.View, { style: { marginBottom: 4, width: "100%" }, children: [
                    group.category ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_renderer.Text,
                      {
                        style: {
                          fontFamily: PDF_FONT,
                          fontSize: 5.5,
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                          marginBottom: 1
                        },
                        children: group.category
                      }
                    ) : null,
                    group.skills.map((skill, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_renderer.Text,
                      {
                        style: {
                          fontFamily: PDF_FONT,
                          fontSize: 6.5,
                          color: "rgba(255,255,255,0.8)",
                          marginBottom: 2
                        },
                        children: skill
                      },
                      i
                    ))
                  ] }, gi))
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.View, { style: { flex: 1, paddingHorizontal: 24, paddingVertical: 40 }, children: sectionsBlock })
        ]
      }
    ) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_renderer.Document, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_renderer.Page, { size: "A4", style: s.page, children: [
    headerBlock,
    sectionsBlock
  ] }) });
}

// src/lib/pdf.ts
var import_react = __toESM(require("react"), 1);
async function generateResumePDF(resume, locale = "en", messages) {
  const element = import_react.default.createElement(ResumePDFDocument, {
    resume,
    locale,
    messages
  });
  const buffer = await (0, import_renderer2.renderToBuffer)(element);
  return Buffer.from(buffer);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PDF_FONT,
  ResumePDFDocument,
  TEMPLATES,
  contactSchema,
  createEmptyResumeData,
  educationEntrySchema,
  experienceEntrySchema,
  formatMonthYear,
  generateId,
  generateResumePDF,
  getResumeStyle,
  getTemplate,
  hexWithAlpha,
  personalInfoSchema,
  projectEntrySchema,
  skillGroupSchema
});
//# sourceMappingURL=server.cjs.map