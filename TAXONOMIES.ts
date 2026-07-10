export const CATEGORIES = [
  {
    label: 'Engineering Leadership',
    description:
      'Moving from hands-on coding to leading teams, decision-making, leverage, ownership, engineering culture.',
  },
  {
    label: 'Product Engineering',
    description:
      'Building software with business/product judgment, customer empathy, prioritization, maker experience.',
  },
  {
    label: 'Software Architecture',
    description:
      'System design, boundaries, extensibility, maintainability, refactoring, technical trade-offs.',
  },
  {
    label: 'Developer Experience',
    description:
      'Tooling, workflows, local setup, APIs, SDKs, documentation, CI/CD, reducing friction for developers.',
  },
  {
    label: 'Web Platforms',
    description:
      'WordPress, PHP, JavaScript, TypeScript, browser APIs, frontend/backend web engineering.',
  },
  {
    label: 'AI Systems',
    description:
      'Practical AI products, tool-calling, MCPs, RAG, agents, AI infrastructure, AI as product capability.',
  },
  {
    label: 'Freemius Lessons',
    description:
      'Lessons from building payments, licensing, subscriptions, checkout, dashboards, SDKs, and maker tooling.',
  },
  {
    label: 'Technical Notes',
    description:
      'Short implementation notes, debugging stories, code snippets, gotchas, setup guides.',
  },
  {
    label: 'Career & Craft',
    description:
      'Personal growth as an engineer, taste, judgment, habits, communication, becoming more effective.',
  },
  {
    label: 'Personal Notes',
    description:
      'Broader reflections, writing updates, now-style updates, personal context, non-technical but still thoughtful posts.',
  },
] as const;

export type Category = (typeof CATEGORIES)[number]['label'];

export const CATEGORY_NAMES = CATEGORIES.map(({ label }) => label) as [
  Category,
  ...Category[],
];

export const TAGS = [
  'Career',
  'CI/CD',
  'Customer Empathy',
  'Documentation',
  'ES6',
  'General',
  'GatsbyJS',
  'GitLab',
  'HOC',
  'JavaScript',
  'Jest',
  'JSDOM',
  "Let's Encrypt",
  'Linode',
  'Networking',
  'Personal',
  'PHP',
  'PHPUnit',
  'Product Engineering',
  'React',
  'Social',
  'SSL',
  'Swag',
  'Testing',
  'VS Code',
  'WordPress',
] as const;

export type Tag = (typeof TAGS)[number];
