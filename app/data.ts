type Project = {
  name: string
  description: string
  link: string
  video: string
  id: string
}

type WorkExperience = {
  company: string
  title: string
  start: string
  end: string
  link: string
  id: string
}

type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

type SocialLink = {
  label: string
  link: string
}

type ToolAndTechnology = {
  name: string
  icon: string
}

export const PROJECTS: Project[] = [
  {
    name: 'ODIN — Social Listening Platform',
    description:
      'A social listening and customer engagement platform running in production at UBL and HBL. Microservice backend (Node.js + Python, Redis Pub/Sub, Docker Compose), integrated Meta Business API. Reduced message processing from 1.4 minutes to 0.4 seconds.',
    link: 'https://odin.hbl.com/',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1755982523/Screen_Recording_2025-08-24_at_1.52.49_AM_onj2bl.mov',
    id: 'project1',
  },
  {
    name: 'OculaCare — AI Eye Disease Detection',
    description:
      'Won 1st at COMSATS Industrial Expo 2024 and 2nd at Securiti.ai AI Challenge. Flutter app with custom CNN models, Neo4j graph-based symptom analysis, and RAG treatment recommendations. Validated with ophthalmologists at WATIM Hospital.',
    link: 'https://www.linkedin.com/posts/awais-ur-rehman-88615a217_92disrupt-92disrupt-aichallenge2024-activity-7274777064333803520-gH2w?utm_source=share&utm_medium=member_desktop',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1738497188/oculacare_mobile_dabdqf.mp4',
    id: 'project2',
  },
  {
    name: 'SANHA Pakistan — Halaal Certification Platform',
    description:
      'Complete website and admin portal for SANHA Halaal Associates Pakistan. 50K+ monthly users. Cut page load from 4.2s to 2.3s through image optimization and API batching. JWT auth with role-based dashboards.',
    link: 'https://www.sanha.org.pk/',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1755981713/Screen_Recording_2025-08-24_at_1.36.20_AM_p42dto.mov',
    id: 'project3',
  },
  {
    name: 'Alara — Customer Analytics & Workflow Platform',
    description:
      'An analytics and workflow management platform used by Faysal Bank and Bank Alfalah. Helps banks understand customer behavior through data visualization and build dynamic operational workflows.',
    link: 'https://alara.faysalbank.com/',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1755982628/Screen_Recording_2025-08-24_at_1.55.19_AM_yjuzlp.mov',
    id: 'project4',
  },
  {
    name: 'OxyBlue — Offline-First Water Delivery',
    description:
      'Offline-first water delivery platform built with Flutter and Node.js. Riders work without internet and sync when reconnected. Cut average fulfillment time from 25 to 15 minutes.',
    link: 'https://www.linkedin.com/posts/awais-ur-rehman-88615a217_waterdelivery-techinnovation-mobileappdevelopment-activity-7241447778776735744-LXij?utm_source=share&utm_medium=member_desktop',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1738497330/oxyBlue_u7kzro.mp4',
    id: 'project5',
  },
  {
    name: 'Otaku — Anime Social Network',
    description:
      'A social app for anime fans built with Flutter and Node.js. News feeds, discussion forums, social feed with posts, comments, and likes. Complete client and backend.',
    link: 'https://www.linkedin.com/posts/awais-ur-rehman-88615a217_flutter-animeapp-appdevelopment-activity-7266877454990913538-xvPJ?utm_source=share&utm_medium=member_desktop',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1738497404/otaku_rz2c3i.mp4',
    id: 'project6',
  },
  {
    name: 'Nomadly — Social Platform for Digital Nomads',
    description:
      'An invite-only social app for the vanlife community. Solves safety on the road, loneliness between stops, and decision fatigue. Built with Flutter, Node.js, and WebSockets for real-time messaging.',
    link: 'https://youtu.be/ymUzYKg9eUw?si=F0ro35LxqP6s9Bc_',
    video:
      'https://youtu.be/ymUzYKg9eUw?si=F0ro35LxqP6s9Bc_',
    id: 'project7',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'Bridgeframe',
    title: 'Full Stack Developer',
    start: 'Sep 2025',
    end: 'Present',
    link: 'https://bridgeframe.co/',
    id: 'work1',
  },
  {
    company: 'ISSM Labelling Solutions (Pvt) Ltd',
    title: 'Full Stack Developer',
    start: 'Jan 2025',
    end: 'Sep 2025',
    link: 'https://issm.ai/',
    id: 'work2',
  },
  {
    company: 'Ceven Technologies',
    title: 'Full Stack Lead',
    start: 'Jun 2024',
    end: 'Dec 2024',
    link: 'https://www.ceventech.com/',
    id: 'work3',
  },
  {
    company: 'OxyBlue',
    title: 'Full Stack Developer',
    start: 'Nov 2023',
    end: 'Jun 2024',
    link: '',
    id: 'work4',
  },
  {
    company: 'Urban Codes',
    title: 'Web Development Intern',
    start: 'Mar 2023',
    end: 'Aug 2023',
    link: 'https://urbancodez.com/',
    id: 'work5',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'How I cut message processing from 1.4 minutes to 0.4 seconds',
    description:
      'Optimizing a real-time NLP pipeline for Pakistan\'s largest banks using Redis, Bull queues, and Docker microservices.',
    link: '/blog/how-i-cut-message-processing-from-minutes-to-milliseconds',
    uid: 'blog-1',
  },
  {
    title: 'Building offline-first apps: lessons from a water delivery fleet',
    description:
      'Service workers, local caching, conflict resolution, and why it cut fulfillment time from 25 to 15 minutes.',
    link: '/blog/building-offline-first-apps-lessons-from-oxyblue',
    uid: 'blog-2',
  },
  {
    title: 'What I learned building an AI eye disease detector with real doctors',
    description:
      'CNN models, Neo4j graph search, RAG pipelines, and validating with ophthalmologists at WATIM Hospital.',
    link: '/blog/what-i-learned-building-oculacare',
    uid: 'blog-3',
  },
  {
    title: 'Building AI agents that actually help: MedLens and what I\'m learning',
    description:
      'Real-time first aid AI using Google ADK, Gemini Live, and Vertex AI RAG. What works and what doesn\'t.',
    link: '/blog/building-ai-agents-that-actually-help',
    uid: 'blog-4',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/awais-ur-rehman',
  },
  {
    label: 'Twitter',
    link: '',
  },
  {
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/awais-ur-rehman-88615a217/',
  },
  {
    label: 'Instagram',
    link: 'https://instagram.com/_awais._.jarral_/',
  },
]

export const EMAIL = 'awaisjarral37@gmail.com'

export const TOOLS_AND_TECHNOLOGIES: ToolAndTechnology[] = [
  { name: 'JavaScript', icon: 'FileCode2' },
  { name: 'TypeScript', icon: 'FileCode2' },
  { name: 'React', icon: 'Atom' },
  { name: 'Next.js', icon: 'Layers' },
  { name: 'Flutter', icon: 'Smartphone' },
  { name: 'Python', icon: 'Code' },
  { name: 'Node.js', icon: 'Server' },
  { name: 'Tailwind CSS', icon: 'Wind' },
  { name: 'MongoDB', icon: 'Database' },
  { name: 'MySQL', icon: 'Database' },
  { name: 'Firebase', icon: 'Cloud' },
  { name: 'Neo4j', icon: 'Database' },
  { name: 'Redis', icon: 'Database' },
  { name: 'Docker', icon: 'Package' },
  { name: 'Docker Compose', icon: 'Layers' },
  { name: 'Git', icon: 'GitBranch' },
  { name: 'GCP', icon: 'Cloud' },
  { name: 'Nginx', icon: 'Server' },
  { name: 'Figma', icon: 'PenTool' },
  { name: 'VS Code', icon: 'Code' },
]
