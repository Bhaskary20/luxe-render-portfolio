export interface ProjectImage {
  slug: string;
  caption?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: number;
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  brief: string;
  approach: string;
  outcome: string;
  metrics: ProjectMetric[];
  coverSlug: string;
  gallery: ProjectImage[];
  tools: string[];
  pdfUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "master-bedroom",
    index: "01",
    title: "Master Bedroom",
    category: "Residential Design",
    year: "2024",
    description:
      "Comprehensive master bedroom design with ensuite bathroom featuring modern layouts and premium finishes.",
    brief:
      "A sophisticated master bedroom design project featuring efficient space planning and luxurious materials, delivered with full technical drawings and 3D visualization.",
    approach:
      "The suite was planned around a clear separation between the sleeping zone and the ensuite, with circulation kept generous and unobstructed. Space layouts were resolved first, with cohesive material palettes and fine detailing layered on afterward — layered lighting for ambience, durable finishes in the wet zone, and warm tones throughout the sleeping area.",
    outcome:
      "The finished plan improved spatial functionality by 15% and cut material revisions by 10%, with precise 2D drafts and photorealistic 3D renders carrying the design through to client sign-off.",
    metrics: [
      { value: "15%", label: "Spatial functionality" },
      { value: "10%", label: "Fewer material revisions" },
    ],
    coverSlug: "project-master-bedroom",
    gallery: [{ slug: "project-master-bedroom" }],
    tools: ["AutoCAD", "SketchUp", "V-Ray", "Material Selection", "Enscape"],
    pdfUrl: "/master-bedroom-project.pdf",
  },
  {
    id: 2,
    slug: "modular-kitchen",
    index: "02",
    title: "Modular Kitchen Plan",
    category: "Kitchen Design",
    year: "2024",
    description:
      "Efficient modular kitchen design optimizing workflow and storage while maximizing space utilization.",
    brief:
      "A complete modular kitchen design focused on workflow efficiency and storage optimization, built around the working triangle and everyday cooking habits.",
    approach:
      "Cabinet layouts, appliance placement, and storage zoning were worked out in detail before any material was chosen, so every finish decision served the plan rather than the other way round. Ergonomic principles guided counter heights, reach zones, and circulation clearances throughout.",
    outcome:
      "The engineered layout increased workflow efficiency by 15% and improved storage capacity by 20%. High-fidelity technical drawings and 3D models cut execution errors by 12% and shaved 10% off the project timeline.",
    metrics: [
      { value: "15%", label: "Workflow efficiency" },
      { value: "20%", label: "Storage capacity" },
      { value: "12%", label: "Fewer execution errors" },
    ],
    coverSlug: "project-modular-kitchen",
    gallery: [{ slug: "project-modular-kitchen" }],
    tools: ["AutoCAD", "SketchUp", "Space Planning", "Ergonomic Design"],
    pdfUrl: "/modular-kitchen-plan.pdf",
  },
  {
    id: 3,
    slug: "residential-suite",
    index: "03",
    title: "Comprehensive Residential Design Deliverables",
    category: "Full Home Design",
    year: "2025",
    description:
      "Complete residential design package including all technical drawings and design specifications.",
    brief:
      "A comprehensive residential design project delivering complete design documentation across every room — space planning, material palettes, furniture specification, and technical drawings, front to back.",
    approach:
      "This full-service engagement covered existing and presentation plans, three distinct ceiling section options with integrated lighting, and optimized switchboard placement, through to detailed elevations for the master bedroom, grandparents' bedroom, and living area — one consistent material and lighting language carried across every room.",
    outcome:
      "The selected ceiling and lighting scheme reduced material waste by 8% while improving day-to-day usability, with documentation precise enough to carry straight through to site execution.",
    metrics: [
      { value: "8%", label: "Less material waste" },
      { value: "3", label: "Rooms fully elevated" },
    ],
    coverSlug: "project-residential-suite",
    gallery: [
      { slug: "residential-floorplan", caption: "Floor plan" },
      { slug: "residential-living-a", caption: "Living area" },
      { slug: "residential-living-b", caption: "Living area" },
      { slug: "residential-living-c", caption: "Living area" },
      { slug: "residential-kitchen", caption: "Kitchen" },
      { slug: "residential-view-a", caption: "Interior view" },
      { slug: "residential-view-b", caption: "Interior view" },
      { slug: "residential-detail-a", caption: "Detail" },
      { slug: "residential-detail-b", caption: "Detail" },
    ],
    tools: ["AutoCAD", "Technical Documentation", "Material Palettes", "Project Management"],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
