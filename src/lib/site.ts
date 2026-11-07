export const SITE_URL = ((import.meta.env.VITE_SITE_URL as string | undefined) ?? "").replace(
  /\/$/,
  "",
);

export function abs(path: string): string {
  return `${SITE_URL}${path}`;
}
