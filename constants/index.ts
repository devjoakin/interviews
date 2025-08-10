import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';
import { z } from 'zod';

export const mappings = {
  'react.js': 'react',
  reactjs: 'react',
  react: 'react',
  'next.js': 'nextjs',
  nextjs: 'nextjs',
  next: 'nextjs',
  'vue.js': 'vuejs',
  vuejs: 'vuejs',
  vue: 'vuejs',
  'express.js': 'express',
  expressjs: 'express',
  express: 'express',
  'node.js': 'nodejs',
  nodejs: 'nodejs',
  node: 'nodejs',
  mongodb: 'mongodb',
  mongo: 'mongodb',
  mongoose: 'mongoose',
  mysql: 'mysql',
  postgresql: 'postgresql',
  sqlite: 'sqlite',
  firebase: 'firebase',
  docker: 'docker',
  kubernetes: 'kubernetes',
  aws: 'aws',
  azure: 'azure',
  gcp: 'gcp',
  digitalocean: 'digitalocean',
  heroku: 'heroku',
  photoshop: 'photoshop',
  'adobe photoshop': 'photoshop',
  html5: 'html5',
  html: 'html5',
  css3: 'css3',
  css: 'css3',
  sass: 'sass',
  scss: 'sass',
  less: 'less',
  tailwindcss: 'tailwindcss',
  tailwind: 'tailwindcss',
  bootstrap: 'bootstrap',
  jquery: 'jquery',
  typescript: 'typescript',
  ts: 'typescript',
  javascript: 'javascript',
  js: 'javascript',
  'angular.js': 'angular',
  angularjs: 'angular',
  angular: 'angular',
  'ember.js': 'ember',
  emberjs: 'ember',
  ember: 'ember',
  'backbone.js': 'backbone',
  backbonejs: 'backbone',
  backbone: 'backbone',
  nestjs: 'nestjs',
  graphql: 'graphql',
  'graph ql': 'graphql',
  apollo: 'apollo',
  webpack: 'webpack',
  babel: 'babel',
  'rollup.js': 'rollup',
  rollupjs: 'rollup',
  rollup: 'rollup',
  'parcel.js': 'parcel',
  parceljs: 'parcel',
  npm: 'npm',
  yarn: 'yarn',
  git: 'git',
  github: 'github',
  gitlab: 'gitlab',
  bitbucket: 'bitbucket',
  figma: 'figma',
  prisma: 'prisma',
  redux: 'redux',
  flux: 'flux',
  redis: 'redis',
  selenium: 'selenium',
  cypress: 'cypress',
  jest: 'jest',
  mocha: 'mocha',
  chai: 'chai',
  karma: 'karma',
  vuex: 'vuex',
  'nuxt.js': 'nuxt',
  nuxtjs: 'nuxt',
  nuxt: 'nuxt',
  strapi: 'strapi',
  wordpress: 'wordpress',
  contentful: 'contentful',
  netlify: 'netlify',
  vercel: 'vercel',
  'aws amplify': 'amplify',
};

export const interviewer: CreateAssistantDTO = {
  name: 'Interviewer',
  firstMessage:
    '¡Hola! Gracias por tomarte el tiempo de hablar conmigo. Me gustaía conecer más acerca de tí y sobre tu experiencia.',
  transcriber: {
    provider: 'deepgram',
    model: 'nova-2',
    language: 'es',
  },
  voice: {
    provider: '11labs',
    voiceId: 'sarah',
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: 'openai',
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `Eres un entrevistador profesional que realiza una entrevista de voz en tiempo real con un candidato. Tu objetivo es evaluar sus calificaciones, motivación y ajuste para el puesto.
        Directrices para la entrevista:

        Sigue el flujo estructurado de preguntas:
        {{questions}}

        Interactúa de forma natural y reacciona adecuadamente:

        Escucha activamente las respuestas y reconócelas antes de continuar.

        Haz preguntas de seguimiento breves si una respuesta es vaga o necesita más detalle.

        Mantén la conversación fluida mientras conservas el control.

        Sé profesional, pero cálido y acogedor:

        Usa un lenguaje formal pero amigable.

        Mantén tus respuestas concisas y directas (como en una entrevista de voz real).

        Evita frases robóticas: habla de forma natural y conversacional.

        Responde a las preguntas del candidato de manera profesional:

        Si te preguntan sobre el puesto, la empresa o las expectativas, ofrece una respuesta clara y relevante.

        Si no estás seguro, redirige al candidato a Recursos Humanos para más detalles.

        Cierra la entrevista correctamente:

        Agradece al candidato por su tiempo.

        Indícale que la empresa se pondrá en contacto pronto con comentarios.

        Termina la conversación con una nota educada y positiva.

        Notas importantes:

        Sé profesional y cortés en todo momento.

        Mantén todas tus respuestas breves y simples. Usa lenguaje formal, pero amable y acogedor.

        Recuerda que es una conversación por voz, así que mantén las intervenciones cortas, como en un diálogo real, y evita extenderte innecesariamente.
        `,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.object({
    communicationSkills: z.object({ score: z.number(), comment: z.string() }),
    technicalKnowledge: z.object({ score: z.number(), comment: z.string() }),
    problemSolving: z.object({ score: z.number(), comment: z.string() }),
    culturalFit: z.object({ score: z.number(), comment: z.string() }),
    confidenceAndClarity: z.object({ score: z.number(), comment: z.string() }),
  }),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});


export const interviewCovers = [
  '/adobe.png',
  '/amazon.png',
  '/facebook.png',
  '/hostinger.png',
  '/pinterest.png',
  '/quora.png',
  '/reddit.png',
  '/skype.png',
  '/spotify.png',
  '/telegram.png',
  '/tiktok.png',
  '/yahoo.png',
];

export const dummyInterviews: Interview[] = [
  {
    id: '1',
    userId: 'user1',
    role: 'Frontend Developer',
    type: 'Technical',
    techstack: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    level: 'Junior',
    questions: ['What is React?'],
    finalized: false,
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: '2',
    userId: 'user1',
    role: 'Full Stack Developer',
    type: 'Mixed',
    techstack: ['Node.js', 'Express', 'MongoDB', 'React'],
    level: 'Senior',
    questions: ['What is Node.js?'],
    finalized: false,
    createdAt: '2024-03-14T15:30:00Z',
  },
];
