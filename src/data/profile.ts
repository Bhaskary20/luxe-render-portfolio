export const profile = {
  name: "Aachal Rannaware",
  firstName: "Aachal",
  lastName: "Rannaware",
  role: "Interior Designer",
  tagline: "Creating sophisticated spaces that blend functionality with aesthetic excellence.",
  location: "Maharashtra, India",
  locationShort: "Maharashtra, IN",
  timezone: "Asia/Kolkata",
  established: "2022",

  email: "aachalr579@gmail.com",
  phone: "+91 7776832604",
  phoneHref: "tel:+917776832604",
  linkedin: "https://linkedin.com/in/aachal-r-6010bb324",
  siteUrl: "https://aachalrannaware.netlify.app",
  resumeUrl: "/resume.pdf",
  resumeFilename: "Aachal_Rannaware_Resume.pdf",

  manifesto:
    "Great interior design goes beyond aesthetics. It's about creating spaces that resonate with the people who inhabit them.",

  philosophy: [
    "I believe that great interior design goes beyond aesthetics — it's about creating spaces that resonate with the people who inhabit them. Every project begins with understanding the client's lifestyle, preferences, and dreams.",
    "With expertise in space planning, color theory, material selection, and lighting design, I craft environments that are both beautiful and highly functional. My approach combines timeless elegance with contemporary innovation.",
    "From residential homes to commercial spaces, I specialize in creating designs that maximize spatial efficiency while reflecting the unique personality and needs of each client.",
  ],

  keyExpertise: [
    "Space Planning & Layout Design",
    "Color Theory & Material Selection",
    "Lighting Design & Ergonomic Solutions",
    "3D Visualization & Technical Drawings",
    "Project Management & Client Relations",
    "Sustainable Design Practices",
  ],

  stats: [
    { value: "3+", label: "Years Experience" },
    { value: "20+", label: "Happy Clients" },
    { value: "15+", label: "Projects Completed" },
    { value: "9.8", label: "Client Satisfaction", suffix: "/10" },
  ],

  capabilities: [
    "Space Planning",
    "Color Theory",
    "Material Selection",
    "Lighting Design",
    "3D Visualization",
    "Ergonomics",
    "Sustainable Practice",
  ],

  experience: [
    {
      role: "Interior Designer",
      org: "Vastuti Spaces",
      location: "Pune, Maharashtra",
      period: "Current",
      points: [
        "Contributed to multiple residential interior projects, delivering design solutions across traditional, neo-classical, minimalistic, and modern styles.",
        "Designed customized furniture layouts aligned with client requirements, space constraints, and functional needs.",
        "Collaborated with senior designers to translate concepts into detailed drawings and visual representations.",
      ],
    },
    {
      role: "Freelance Interior Designer",
      org: "Self-employed",
      location: "Maharashtra",
      period: "2022 — Present",
      points: [
        "Delivered tailored layouts and décor concepts for 5+ residential spaces, consistently achieving high client satisfaction.",
        "Developed technical drawings, 3D visualizations, and furniture specifications aligned with project budgets and design intent.",
        "Managed end-to-end execution for five residential projects, delivering all assignments under budget at an average client satisfaction rating of 9.8/10.",
      ],
    },
  ],

  education: {
    degree: "Diploma & Degree in Interior Design",
    institution: "Cadence Academy of Fashion and Interior Design",
    location: "Nagpur, Maharashtra, India",
    period: "2022 — 2025",
  },

  certifications: [
    { name: "Interior Styling Essentials", issuer: "Skillshare" },
    { name: "AutoCAD for Interior Designers", issuer: "Udemy" },
  ],
};

export type Profile = typeof profile;
