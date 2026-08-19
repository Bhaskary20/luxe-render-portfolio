export type Tier = "PRIMARY" | "FLUENT" | "WORKING";

export interface Tool {
  name: string;
  stage: string;
  note: string;
}

export const tools: Tool[] = [
  { name: "AutoCAD", stage: "Drafting", note: "2D technical drawings & documentation" },
  { name: "SketchUp", stage: "Modeling", note: "3D massing & spatial studies" },
  { name: "V-Ray", stage: "Rendering", note: "Photoreal lighting & materials" },
  { name: "Enscape", stage: "Rendering", note: "Real-time walkthroughs" },
  { name: "Lumion", stage: "Visualization", note: "Cinematic client presentations" },
  { name: "Photoshop", stage: "Post-Production", note: "Render compositing & retouching" },
  { name: "CorelDRAW", stage: "Graphics", note: "Vector layouts & mood boards" },
  { name: "Canva", stage: "Presentation", note: "Client-facing decks & boards" },
];

export interface CapabilityGroup {
  title: string;
  items: { name: string; tier: Tier }[];
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "Design Software",
    items: [
      { name: "AutoCAD", tier: "PRIMARY" },
      { name: "SketchUp", tier: "PRIMARY" },
      { name: "V-Ray", tier: "FLUENT" },
      { name: "Photoshop", tier: "FLUENT" },
      { name: "Enscape", tier: "FLUENT" },
    ],
  },
  {
    title: "Design Expertise",
    items: [
      { name: "Space Planning", tier: "PRIMARY" },
      { name: "Color Theory", tier: "PRIMARY" },
      { name: "Material Selection", tier: "PRIMARY" },
      { name: "Lighting Design", tier: "FLUENT" },
      { name: "Ergonomic Solutions", tier: "FLUENT" },
    ],
  },
  {
    title: "Professional Practice",
    items: [
      { name: "Client Relations", tier: "PRIMARY" },
      { name: "Project Management", tier: "PRIMARY" },
      { name: "Team Collaboration", tier: "PRIMARY" },
      { name: "Presentation Skills", tier: "FLUENT" },
      { name: "Budget Planning", tier: "FLUENT" },
    ],
  },
];

export const practiceNotes = [
  {
    title: "Design Philosophy",
    points: ["User-centered design approach", "Sustainable design practices", "Innovative space optimization"],
  },
  {
    title: "Project Management",
    points: ["On-time project delivery", "Budget optimization", "Effective client communication"],
  },
];
