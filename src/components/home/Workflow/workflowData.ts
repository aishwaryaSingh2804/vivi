// src/components/home/Workflow/workflowData.ts

export interface WorkflowStage {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  demoClip: "prompt" | "essentials" | "script" | "assets" | "vibe" | "editor" | "publish";
  accent: string;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: "idea",
    number: "01",
    title: "Idea",
    eyebrow: "IMAGINE",
    headline: "It all starts with an idea.",
    description:
      "Describe what you want to create in your own words. Visl turns your initial thought into the starting point for a complete video.",
    demoClip: "prompt",
    accent: "#5146e5",
  },
  {
    id: "setup",
    number: "02",
    title: "Setup",
    eyebrow: "DEFINE",
    headline: "Give your story a personality.",
    description:
      "Choose the format, duration, language, creative direction and visual style that shape the DNA of your video.",
    demoClip: "essentials",
    accent: "#635bff",
  },
  {
    id: "script",
    number: "03",
    title: "Script",
    eyebrow: "WRITE",
    headline: "Build the story, scene by scene.",
    description:
      "Review and refine the script, from scene descriptions and dialogue to narration, pacing and story structure.",
    demoClip: "script",
    accent: "#756cf0",
  },
  {
    id: "assets",
    number: "04",
    title: "Assets",
    eyebrow: "CREATE",
    headline: "Bring your story world to life.",
    description:
      "Explore the characters, locations, props and voices that make up your story, with a consistent visual identity.",
    demoClip: "assets",
    accent: "#6c63ff",
  },
  {
    id: "vibe-edit",
    number: "05",
    title: "Vibe Edit",
    eyebrow: "REFINE",
    headline: "Direct your video through conversation.",
    description:
      "Tell Visl what you want to change. Use natural language to guide edits and shape the result until it feels right.",
    demoClip: "vibe",
    accent: "#5548e8",
  },
  {
    id: "publish",
    number: "06",
    title: "Publish",
    eyebrow: "SHARE",
    headline: "Your story is ready to share.",
    description:
      "Review the rendered master, choose where to share it, publish to your selected channels or download the finished video.",
    demoClip: "publish",
    accent: "#4638d8",
  },
];
