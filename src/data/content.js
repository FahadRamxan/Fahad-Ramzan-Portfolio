// Single source of truth for all portfolio content.
// Compiled from Fahad Ramzan's resume (July 2026).

export const profile = {
  name: 'Fahad Ramzan',
  firstName: 'Fahad',
  // Rotating roles shown in the hero
  roles: [
    'AI Engineer',
    'AI Automation & Agent Developer',
    'Voice AI Developer',
    'Data Scientist',
  ],
  tagline:
    'I build end-to-end AI systems — from autonomous agents and real-time voice AI to predictive models and analytics dashboards — that turn data into measurable business impact.',
  summary:
    'AI Engineer passionate about solving diverse challenges across computer vision, deep learning, data analytics, and intelligent automation. I ship production-grade solutions — autonomous agents, real-time voice platforms, RAG systems, and interactive dashboards — with a growth mindset and a bias for measurable outcomes.',
  location: 'Islamabad, Pakistan',
  availability: 'Open to AI / ML opportunities',
  email: 'fahadramxan01@gmail.com',
  phone: '+92 314-5428368',
  phoneHref: '+923145428368',
  photo: 'fahad-photo.webp',
  photoFallback: 'fahad-photo-640.png',
  resume: 'Fahad_Ramzan_Resume.pdf',
  githubUsername: 'FahadRamxan',
  socials: {
    github: 'https://github.com/FahadRamxan',
    linkedin: 'https://linkedin.com/in/fahad-ramxan',
    instagram: 'https://instagram.com/fahad.ramxan',
  },
}

export const stats = [
  { value: 13, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: '+', label: 'Years Hands-On' },
  { value: 6, suffix: '', label: 'Certifications' },
  { value: 3, suffix: '', label: 'Languages' },
]

export const experience = [
  {
    role: 'AI Automation & Agent Developer',
    company: 'Brandilyst',
    note: 'German startup · Stealth Mode',
    location: 'Remote, Germany',
    period: 'Aug 2025 – Jun 2026',
    points: [
      'Design and deploy context-aware AI agents, automated workflows, and data pipelines with analytics dashboards for SMB clients.',
      'Integrate APIs, CRMs, databases, and cloud services with robust testing, monitoring, and error handling.',
      'Prototype and adopt emerging AI tooling to boost efficiency and business value.',
    ],
    stack: ['AI Agents', 'n8n', 'APIs', 'CRM', 'Dashboards'],
  },
  {
    role: 'Data Scientist',
    company: 'Rage Solutions',
    note: 'Part-time',
    location: 'Islamabad, PK',
    period: 'Jul 2024 – Present',
    current: true,
    points: [
      'Trained LLMs using RLHF and RLEF methods, implementing and refining AI models across multiple domains.',
      'Collaborated with interdisciplinary teams on AI research projects and practical applications.',
    ],
    stack: ['LLMs', 'RLHF', 'RLEF', 'Research'],
  },
  {
    role: 'AI Engineer (Internship)',
    company: 'AISoftDevs',
    location: 'Remote, Islamabad, PK',
    period: 'Aug 2025 – Sep 2025',
    points: [
      'Built and deployed AI-powered web apps and browser extensions, including a Prompt-to-JSON Enhancer and an AI Content-to-PDF Enhancer with fact-validation pipelines.',
      'Developed an Automated AI Posting Agent ingesting live data (stock market / news) and publishing intelligent posts to social platforms.',
    ],
    stack: ['LLMs', 'Web Apps', 'Extensions', 'Automation'],
  },
  {
    role: 'Machine Learning Intern',
    company: 'Center of Excellence — Artificial Intelligence',
    location: 'Islamabad, PK',
    period: 'Jul 2023 – Sep 2023',
    points: [
      'Contributed to AI research projects, implementing and refining models.',
      'Collaborated with interdisciplinary teams on practical AI applications.',
    ],
    stack: ['Machine Learning', 'Research'],
  },
]

export const skillGroups = [
  {
    title: 'Languages & Automation',
    icon: 'Code2',
    skills: ['Python', 'C++', 'C', 'SQL', 'n8n', 'make.com'],
  },
  {
    title: 'ML & Deep Learning',
    icon: 'BrainCircuit',
    skills: [
      'TensorFlow',
      'PyTorch',
      'Keras',
      'Scikit-learn',
      'MLflow',
      'Hugging Face',
      'LoRA / QLoRA / PEFT',
      'RLHF / RLEF',
    ],
  },
  {
    title: 'Agentic AI & LLMs',
    icon: 'Bot',
    skills: [
      'RAG',
      'Multi-Agent Orchestration',
      'Voice AI (TTS / ASR)',
      'Qdrant / Vector DBs',
      'OpenAI',
      'Claude',
      'Eleven Labs',
    ],
  },
  {
    title: 'Data & Analytics',
    icon: 'BarChart3',
    skills: [
      'Power BI',
      'Excel',
      'NumPy',
      'Pandas',
      'Statistical Analysis',
      'Feature Engineering',
      'Data Visualization',
    ],
  },
  {
    title: 'Computer Vision',
    icon: 'ScanEye',
    skills: [
      'OpenCV',
      'YOLO / Ultralytics',
      'Vision Transformers',
      'Meta SAM-2',
      'Digital Image Processing',
    ],
  },
  {
    title: 'Backend & DevOps',
    icon: 'Server',
    skills: [
      'FastAPI',
      'Node.js',
      'PostgreSQL',
      'Kafka',
      'Docker',
      'Kubernetes',
      'Git / DVC',
      'Prometheus / Grafana',
    ],
  },
]

export const projectCategories = [
  'All',
  'AI & Automation',
  'Voice AI',
  'Machine Learning',
  'Computer Vision',
  'Data Analytics',
]

export const projects = [
  {
    title: 'RaabtaAI',
    subtitle: 'Real-Time Voice AI & Omnichannel Automation Platform',
    category: 'Voice AI',
    year: '2026',
    role: 'Full-Stack AI / Systems Engineering',
    featured: true,
    description:
      'Production-grade real-time AI voice agent platform handling end-to-end phone and chat interactions with an in-house VoIP, ASR, LLM, and TTS stack.',
    highlights: [
      'Sub-300 ms barge-in latency for natural, interruptible bilingual (English & Gulf Arabic) conversations.',
      'Multi-tenant architecture with PostgreSQL row-level security (100+ tables) and cross-call vector memory.',
      'Multi-agent orchestration with intent classification, RAG retrieval, and tool integrations for bookings & CRM.',
      '17,000+ live end-to-end tests with full observability (Prometheus, Grafana, OpenTelemetry) and mTLS/Vault/JWT hardening.',
    ],
    stack: ['Node.js', 'Python', 'Kafka', 'Kubernetes', 'PostgreSQL', 'Qdrant'],
  },
  {
    title: 'Einfach Fahrschule',
    subtitle: 'Multi-Tenant Driving-School Chatbot',
    category: 'AI & Automation',
    year: '2026',
    role: 'Full-Stack AI / Backend Developer',
    featured: true,
    description:
      'Path-based multi-tenant FastAPI chat platform serving multiple driving schools from one codebase, with per-school routes, prompts, RAG collections, and embeddable widgets.',
    highlights: [
      'LLM intent classifier with structured outputs that splits messages into atomic sub-queries routed to specialized agents.',
      'RAG with OpenAI embeddings and per-tenant Qdrant collections indexing academy PDFs.',
      'PostgreSQL session persistence, sentiment & escalation tracking, rate limiting, and GDPR-conscious handling.',
      'Containerized with Docker Compose (app + Postgres, healthchecks) and documented deployment runbooks.',
    ],
    stack: ['Python', 'FastAPI', 'OpenAI', 'Qdrant', 'PostgreSQL', 'Docker'],
  },
  {
    title: 'Fahrschule Academy Drive In',
    subtitle: 'Omnichannel AI Automation',
    category: 'AI & Automation',
    year: '2025',
    role: 'AI Automation & Agent Developer',
    featured: true,
    description:
      'n8n-orchestrated omnichannel assistant — website chatbot, voice agent, email & WhatsApp bots — automating leads, bookings, and FAQs with CRM integration and analytics.',
    highlights: [
      'RAG-based multilingual Voice AI agent (Eleven Labs + Claude) for autonomous German/English phone handling with human escalation.',
      'Proactive 24-hour reminder workflows across SMS, WhatsApp, and email to cut no-shows.',
      'Autonomous multilingual chatbots for website and WhatsApp with GDPR compliance.',
    ],
    stack: ['n8n', 'Claude', 'Voice AI', 'WhatsApp', 'Eleven Labs', 'CRM'],
  },
  {
    title: 'AtliQ Business Intelligence',
    subtitle: 'Analytics Portfolio',
    category: 'Data Analytics',
    year: '2025',
    role: 'Data Analyst',
    featured: true,
    description:
      'Interactive Power BI dashboards spanning HR attendance, hospitality revenue optimization, and sports analytics, enabling data-driven decisions across industries.',
    highlights: [
      'Modeled occupancy, ADR, and RevPAR for hospitality revenue optimization.',
      'Led BI requirement workshops with MD and revenue managers to define metrics.',
      'Scraped, cleaned, and transformed data with Python (pandas), Excel, and Bright Data for drill-down dashboards.',
    ],
    stack: ['Power BI', 'Python', 'Pandas', 'Excel', 'Bright Data'],
  },
  {
    title: 'Wheat Insight',
    subtitle: 'Final Year Project — Crop Analytics',
    category: 'Computer Vision',
    year: '2024',
    role: 'Deep Learning / ML Engineer',
    featured: true,
    description:
      'Integrated React + Flask web platform for accurate wheat-spike quantification and disease detection from UAV imagery.',
    highlights: [
      'YOLOv8-OBB for wheat-spike counting and Vision Transformers for multi-severity yellow-rust classification.',
      'Streamlined deployment pipeline for real-time analytics and stakeholder reporting.',
      'Runner-Up, Best FYP Idea — AI-Inno-Fest (COE-AI).',
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'Ultralytics', 'React', 'Flask'],
  },
  {
    title: 'LLM Fine-Tuning',
    subtitle: 'Parameter-Efficient Methods',
    category: 'Machine Learning',
    year: '2025',
    role: 'ML / LLM Engineer',
    featured: true,
    description:
      'Fine-tuned large language models using LoRA and QLoRA on a custom small dataset with parameter-efficient (PEFT) strategies.',
    highlights: [
      'Optimized model performance under limited data and compute constraints.',
      'Evaluated improvements on domain-specific tasks, demonstrating effective knowledge transfer.',
    ],
    stack: ['Python', 'Hugging Face', 'LoRA', 'QLoRA', 'PEFT'],
  },
  {
    title: 'Jetour KSA',
    subtitle: 'Personalized Voice Agent',
    category: 'Voice AI',
    year: '2025',
    role: 'Voice AI Developer',
    description:
      'Localized voice agent with CRM and IVR integration automating lead qualification and intelligent routing for an automotive client.',
    highlights: [
      'Automated lead qualification and intelligent call routing.',
      'CRM + IVR integration tuned for a localized Gulf market.',
    ],
    stack: ['TTS / ASR', 'IVR', 'CRM'],
  },
  {
    title: 'LinkedIn Automation',
    subtitle: 'AI-Generated Content Pipeline',
    category: 'AI & Automation',
    year: '2025',
    role: 'Automation Engineer',
    description:
      'n8n automation pipeline integrating OpenAI image generation to autonomously create, design, and schedule LinkedIn posts.',
    highlights: [
      'Autonomous content generation with OpenAI DALL·E imagery.',
      'End-to-end scheduling and publishing via the LinkedIn API.',
    ],
    stack: ['n8n', 'OpenAI DALL·E', 'LinkedIn API'],
  },
  {
    title: 'Automated Invoice System',
    subtitle: 'Business Automation',
    category: 'AI & Automation',
    year: '2025',
    role: 'Automation Engineer',
    description:
      'Automated invoice workflow using Apps Script with dynamic Google Docs templates for one-click generation and distribution.',
    highlights: [
      'Dynamic Google Docs templates driven by Google Sheets data.',
      'One-click generation and automated distribution.',
    ],
    stack: ['Google Sheets', 'Google Docs', 'Apps Script'],
  },
  {
    title: 'Contactless Fingerprint Scanner',
    subtitle: 'Image Processing',
    category: 'Computer Vision',
    year: '2024',
    role: 'Computer Vision Engineer',
    description:
      'Non-contact fingerprint capture leveraging Meta SAM-2 to segment fingers from the background, with ridge enhancement for high-fidelity recognition.',
    highlights: [
      'Meta SAM-2 segmentation isolating fingers for contactless capture.',
      'Advanced image processing to enhance ridge patterns.',
    ],
    stack: ['Python', 'Meta SAM-2', 'OpenCV'],
  },
  {
    title: 'Air Hockey Puck Tracking',
    subtitle: 'Real-Time Detection',
    category: 'Computer Vision',
    year: '2024',
    role: 'Deep Learning Engineer',
    description:
      'Evaluated deep-learning architectures (TrackNet, YOLO) for real-time puck detection in video streams under varying lighting.',
    highlights: [
      'Fine-tuned models with RoboFlow preprocessing for robust detection.',
      'Visualized tracking metrics and movement patterns to guide iteration.',
    ],
    stack: ['Python', 'TensorFlow', 'Ultralytics', 'RoboFlow'],
  },
  {
    title: 'Kidney Stone Detection',
    subtitle: 'Medical Image Processing',
    category: 'Computer Vision',
    year: '2024',
    role: 'Medical Imaging Engineer',
    description:
      'Segmented kidney stones from ultrasound images using thresholding and contour-based methods with anomaly detection.',
    highlights: [
      'Instance segmentation to identify micro-calculi and potential infections.',
      'Contour-based methods tuned for noisy ultrasound imagery.',
    ],
    stack: ['Python', 'OpenCV'],
  },
  {
    title: 'Uber Supply–Demand Gap',
    subtitle: 'Predictive Analytics',
    category: 'Machine Learning',
    year: '2023',
    role: 'AI / ML Engineer',
    description:
      'Analyzed temporal and spatial patterns to quantify supply–demand imbalances across cities and forecast short-term demand.',
    highlights: [
      'Classification and regression for short-term demand forecasting.',
      'Predictive insights informing dynamic pricing and fleet allocation.',
    ],
    stack: ['Python', 'Scikit-learn', 'statsmodels'],
  },
]

export const education = [
  {
    school: 'National University of Computer & Emerging Sciences (NUCES) — FAST',
    degree: 'B.S. in Computer Science',
    location: 'Islamabad, PK',
    period: 'Sep 2020 – Jul 2024',
    note: "Dean's Honor List — 7th & 8th semester",
  },
  {
    school: 'Beaconhouse School System',
    degree: 'O / A Levels',
    location: 'Islamabad, PK',
    period: 'Jul 2015 – Jun 2020',
  },
]

export const certifications = [
  {
    name: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI · Andrew Ng',
    date: 'Sep 2023',
  },
  {
    name: 'Python for Data Science, AI & Development',
    issuer: 'IBM',
    date: 'Sep 2023',
  },
  { name: 'Google AI Essentials', issuer: 'Google', date: 'Jul 2024' },
  {
    name: 'Generative AI for Everyone',
    issuer: 'DeepLearning.AI',
    date: 'Jul 2024',
  },
  {
    name: 'Preparing Data for Analysis with Excel',
    issuer: 'Microsoft',
    date: 'Jan 2025',
  },
  {
    name: 'Harnessing the Power of Data with Power BI',
    issuer: 'Microsoft',
    date: 'Jan 2025',
  },
]

export const achievements = [
  { icon: 'Award', text: "Dean's Honor List — 7th & 8th semester" },
  { icon: 'Users', text: 'Management Team Member — FAST Young Leaders Society' },
  { icon: 'Trophy', text: 'Runner-Up, Best FYP Idea — AI-Inno-Fest (COE-AI)' },
  { icon: 'Languages', text: 'IELTS Academic — Band 7' },
]

export const languages = [
  { name: 'English', level: 'Full Professional', pct: 90 },
  { name: 'Urdu', level: 'Native', pct: 100 },
  { name: 'Punjabi', level: 'Native', pct: 100 },
]

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'credentials', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
