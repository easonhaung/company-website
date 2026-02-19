import { NextResponse } from 'next/server';

async function exchangeCode(code: string) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  return res.json();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.redirect('/admin');

  const data = await exchangeCode(code);
  const accessToken = data.access_token;
  if (!accessToken) return NextResponse.redirect('/admin');

  const res = NextResponse.redirect('/admin');
  // Set HTTP-only cookie with token (short-lived recommended)
  res.cookies.set('gh_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export const runtime = 'edge';
