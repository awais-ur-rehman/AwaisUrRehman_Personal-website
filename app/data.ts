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
    name: 'SANHA Pakistan — Halaal Certification Platform',
    description:
      'A modern web platform for SANHA Halaal Associates Pakistan, enabling brands to apply for and manage Halaal certification while helping the public verify products and ingredients with transparency.',
    link: 'https://www.sanha.org.pk/',
    video: 'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1755981713/Screen_Recording_2025-08-24_at_1.36.20_AM_p42dto.mov',
    id: 'project1',
  },
  {
    name: 'OculaCare',
    description:
      'OculaCare is a 360° holistic eye healthcare solution, integrating advanced diagnostics and personalized care for optimal vision health.',
    link: 'https://www.linkedin.com/posts/awais-ur-rehman-88615a217_92disrupt-92disrupt-aichallenge2024-activity-7274777064333803520-gH2w?utm_source=share&utm_medium=member_desktop',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1738497188/oculacare_mobile_dabdqf.mp4',
    id: 'project2',
  },
  {
    name: 'ODIN — Social Listening Platform',
    description:
      'ODIN is a powerful social listening and omni-channel engagement platform built for HBL Bank, enabling real-time tracking of customer voice across social media platforms. It features keyword tracking, sentiment analysis, and actionable insights to help the bank understand and respond to customer needs effectively.',
    link: 'https://odin.hbl.com/',
    video: 'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1755982523/Screen_Recording_2025-08-24_at_1.52.49_AM_onj2bl.mov',
    id: 'project3',
  },
  {
    name: 'Alara — Customer Analytics & Workflow Platform',
    description:
      'Alara is an advanced analytics and workflow management platform used by Faysal Bank (FBL) and Bank Alfalah (BAFL). It empowers banks to understand customer needs, visualize analytics, and streamline operations by creating dynamic workflows — ensuring better customer experiences and data-driven decision making.',
    link: 'https://alara.faysalbank.com/',
    video: 'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1755982628/Screen_Recording_2025-08-24_at_1.55.19_AM_yjuzlp.mov',
    id: 'project4',
  },
  {
    name: 'OxyBlue',
    description: 'OxyBlue is a seamless water delivery app that ensures fresh, purified water is always just a tap away, offering real-time tracking and scheduled deliveries.',
    link: 'https://www.linkedin.com/posts/awais-ur-rehman-88615a217_waterdelivery-techinnovation-mobileappdevelopment-activity-7241447778776735744-LXij?utm_source=share&utm_medium=member_desktop',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1738497330/oxyBlue_u7kzro.mp4',
    id: 'project5',
  },
  {
    name: 'Otaku',
    description:
      'Otaku is a beautifully designed anime tracking app built with Flutter, allowing users to explore, track, and organize their favorite anime seamlessly.',
    link: 'https://www.linkedin.com/posts/awais-ur-rehman-88615a217_flutter-animeapp-appdevelopment-activity-7266877454990913538-xvPJ?utm_source=share&utm_medium=member_desktop',
    video:
      'https://res.cloudinary.com/ddxlz9oxs/video/upload/v1738497404/otaku_rz2c3i.mp4',
    id: 'project6',
  },
]

export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    company: 'ISSM Labelling Solutions (Pvt) Ltd',
    title: 'Senior Fullstack Developer',
    start: '2025',
    end: 'Present',
    link: 'https://issm.ai/',
    id: 'work3',
  },
  {
    company: 'Ceven Technologies',
    title: 'Chief Product Officer',
    start: '2024',
    end: 'Present',
    link: 'https://www.ceventech.com/',
    id: 'work2',
  },
  {
    company: 'Freelance',
    title: 'Full Stack Developer',
    start: '2017',
    end: 'Present',
    link: 'https://github.com/',
    id: 'work4',
  },
  {
    company: 'Urban Codez',
    title: 'Frontend Developer',
    start: '2023',
    end: '2023',
    link: 'https://urbancodez.com/',
    id: 'work5',
  },
]

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Why I Started My Own App Agency',
    description:
      'My journey from freelancing to building a cross-platform app agency.',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-1',
  },
  {
    title: 'Lessons from Building Scalable Mobile and Web Apps',
    description:
      'Key takeaways from developing apps for real-world businesses.',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-2',
  },
  {
    title: 'The Future of Cross-Platform Development',
    description:
      'Exploring Flutter, React Native, and the evolution of mobile development.',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
    uid: 'blog-3',
  },
  {
    title: 'My Experience with AI-Powered App Development',
    description:
      'How AI tools are transforming the way I build and optimize applications.',
    link: '/blog/exploring-the-intersection-of-design-ai-and-design-engineering',
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
  { name: 'React Native', icon: 'Atom' },
  { name: 'Python', icon: 'Code' },
  { name: 'Java', icon: 'Code' },
  { name: 'MongoDB', icon: 'Database' },
  { name: 'MySQL', icon: 'Database' },
  { name: 'Firebase', icon: 'Cloud' },
  { name: 'Tailwind CSS', icon: 'Wind' },
  { name: 'Bootstrap', icon: 'Layout' },
  { name: 'REST APIs', icon: 'Server' },
  { name: 'Git', icon: 'GitBranch' },
  { name: 'Figma', icon: 'PenTool' },
  { name: 'VS Code', icon: 'Code' },
  { name: 'Android Studio', icon: 'Smartphone' },
]



