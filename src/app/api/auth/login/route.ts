import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const base = process.env.NEXT_PUBLIC_BASE_URL || '';
  const redirectUri = `${base}/api/auth/callback`;
  const params = new URLSearchParams({
    client_id: clientId || '',
    redirect_uri: redirectUri,
    scope: 'repo',
    allow_signup: 'false',
  });

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}

export const runtime = 'nodejs';

