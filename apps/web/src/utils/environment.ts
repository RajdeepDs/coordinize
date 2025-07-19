export function getUrl() {
  // Always use www.coordinize.tech in production
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.coordinize.tech';
  }

  if (process.env.NEXT_PUBLIC_WEB_URL) {
    return process.env.NEXT_PUBLIC_WEB_URL;
  }

  if (process.env.VERCEL_TARGET_ENV === 'preview') {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3001';
}
