// src/components/home/Workflow/workflowData.ts

export interface WorkflowStage {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  accent: string;
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: "setup",
    number: "01",
    title: "Setup",
    eyebrow: "DEFINE",
    headline: "Give your story a personality.",
    description:
      "Start by defining the creative DNA of your video — format, duration, language, tone and visual style.",
    image: "/workflow/setup.jpeg",
    accent: "#5146e5",
  },

  {
    id: "story",
    number: "02",
    title: "Story",
    eyebrow: "IMAGINE",
    headline: "Turn an idea into a story.",
    description:
      "vivi takes your idea and shapes it into a story with characters, moments and a clear narrative direction.",
    image: "/workflow/story.jpeg",
    accent: "#635bff",
  },

  {
    id: "script",
    number: "03",
    title: "Script",
    eyebrow: "WRITE",
    headline: "Build the story, scene by scene.",
    description:
      "Your concept becomes a structured script with dialogue, action and cinematic beats ready for production.",
    image: "/workflow/script.jpeg",
    accent: "#756cf0",
  },

  {
    id: "assets",
    number: "04",
    title: "Assets",
    eyebrow: "CREATE",
    headline: "Bring every character to life.",
    description:
      "vivi creates the visual ingredients your story needs while keeping characters and worlds consistent.",
    image: "/workflow/assets.jpeg",
    accent: "#6c63ff",
  },

  {
    id: "editor",
    number: "05",
    title: "Editor",
    eyebrow: "REFINE",
    headline: "Shape the final experience.",
    description:
      "Review your scenes, make changes and guide the video until every moment feels exactly right.",
    image: "/workflow/editor.jpeg",
    accent: "#5548e8",
  },

  {
    id: "publish",
    number: "06",
    title: "Publish",
    eyebrow: "SHARE",
    headline: "Your idea is ready for the screen.",
    description:
      "Bring everything together into one finished story — ready to share with the world.",
    image: "/workflow/publish.jpeg",
    accent: "#4638d8",
  },
];