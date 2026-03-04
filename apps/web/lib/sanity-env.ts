export const SANITY_PROJECT_ID = '5bnnldbo';

export function resolveSanityProjectId() {
  return SANITY_PROJECT_ID;
}

export function logResolvedSanityConfig() {
  const projectId = resolveSanityProjectId();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

  console.info(
    `[sanity] projectId=${projectId || '(missing)'} dataset=${dataset}`
  );

  return { projectId, dataset };
}
