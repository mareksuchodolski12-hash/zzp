export const SANITY_PROJECT_ID_ENV_VAR = 'NEXT_PUBLIC_SANITY_PROJECT_ID';

export function resolveSanityProjectId() {
  return process.env[SANITY_PROJECT_ID_ENV_VAR] || '';
}

export function logResolvedSanityConfig() {
  const projectId = resolveSanityProjectId();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

  console.info(
    `[sanity] projectId=${projectId || '(missing)'} dataset=${dataset} expectedEnv=${SANITY_PROJECT_ID_ENV_VAR}`
  );

  return { projectId, dataset };
}
