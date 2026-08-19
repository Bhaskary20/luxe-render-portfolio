export interface ProcessStep {
  index: string;
  title: string;
  description: string;
  annotation: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Brief & Discovery",
    description:
      "Every project starts with understanding the client's lifestyle, preferences, and dreams — not a mood board. Site measurements, constraints, and how the space actually gets used come first.",
    annotation: "SITE SURVEY — CLIENT BRIEF — CONSTRAINTS",
  },
  {
    index: "02",
    title: "Space Planning",
    description:
      "Circulation, zoning, and furniture layout are resolved before a single finish is chosen. This is where spatial efficiency and ergonomics get decided.",
    annotation: "1:50 — CIRCULATION — CLEARANCES",
  },
  {
    index: "03",
    title: "Material & Colour",
    description:
      "Palette, finishes, and material selection are layered onto the resolved plan — chosen for durability and mood together, never appearance alone.",
    annotation: "OAK — BRASS — LINEN — STONE",
  },
  {
    index: "04",
    title: "3D Visualisation",
    description:
      "The plan is modelled in SketchUp and rendered in V-Ray or Enscape, so the client sees the finished space with accurate light and material behaviour before anything is built.",
    annotation: "SKETCHUP — V-RAY — ENSCAPE",
  },
  {
    index: "05",
    title: "Documentation & Handover",
    description:
      "Full technical drawings and specifications are delivered for seamless execution — sheet sets built for the site team, not just the client presentation.",
    annotation: "SCALE 1:50 — SHEET SET — HANDOVER",
  },
];
