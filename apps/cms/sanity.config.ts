import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

type EnvMap = Record<string, string | undefined>;

const processEnv: EnvMap =
  typeof process !== 'undefined' ? ((process.env as EnvMap) ?? {}) : {};

const importMetaEnv: EnvMap = (() => {
  try {
    const resolver = new Function('return import.meta.env') as () => EnvMap;
    return resolver() ?? {};
  } catch {
    return {};
  }
})();

function readEnv(...keys: string[]): string {
  for (const key of keys) {
    const value = processEnv[key] ?? importMetaEnv[key];
    if (value && value.trim().length > 0) {
      return value.trim();
    }
  }

  return '';
}

const projectId = readEnv(
  'SANITY_STUDIO_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'SANITY_PROJECT_ID',
  'VITE_SANITY_STUDIO_PROJECT_ID'
);

const dataset =
  readEnv(
    'SANITY_STUDIO_DATASET',
    'NEXT_PUBLIC_SANITY_DATASET',
    'SANITY_DATASET',
    'VITE_SANITY_STUDIO_DATASET'
  ) || 'production';

if (!projectId) {
  throw new Error(
    'Missing Sanity projectId. Set SANITY_STUDIO_PROJECT_ID (or NEXT_PUBLIC_SANITY_PROJECT_ID) in your environment.'
  );
}

export default defineConfig({
  name: 'default',
  title: 'ZZP Website CMS',

  projectId,
  dataset,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
