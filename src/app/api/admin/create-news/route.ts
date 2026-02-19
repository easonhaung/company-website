import { NextResponse } from 'next/server';

interface CreateRequestBody {
  filename: string;
  content: string; // full MDX content
}

async function getDefaultBranch(repo: string, token: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) throw new Error('Failed to get repo info');
  const json = await res.json();
  return json.default_branch;
}

async function getRefSha(repo: string, branch: string, token: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}/git/ref/heads/${encodeURIComponent(branch)}`, {
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) throw new Error('Failed to get ref sha');
  const j = await res.json();
  return j.object.sha as string;
}

async function createBranch(repo: string, branchName: string, baseSha: string, token: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}/git/refs`, {
    method: 'POST',
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: baseSha }),
  });
  if (!res.ok) throw new Error('Failed to create branch');
  return res.json();
}

async function putFile(repo: string, path: string, contentBase64: string, branch: string, message: string, token: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${encodeURIComponent(path)}`, {
    method: 'PUT',
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify({ message, content: contentBase64, branch }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to create file: ${txt}`);
  }
  return res.json();
}

async function createPullRequest(repo: string, title: string, head: string, base: string, body: string, token: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}/pulls`, {
    method: 'POST',
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify({ title, head, base, body }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to create PR: ${txt}`);
  }
  return res.json();
}

export async function POST(request: Request) {
  const token = request.headers.get('cookie')
    ?.split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('gh_token='))
    ?.split('=')[1];

  if (!token) return NextResponse.json({ ok: false, message: 'Not authenticated' }, { status: 401 });

  const body = (await request.json()) as CreateRequestBody;
  const repo = process.env.GITHUB_REPO; // owner/repo
  if (!repo) return NextResponse.json({ ok: false, message: 'GITHUB_REPO not configured' }, { status: 500 });

  try {
    const defaultBranch = await getDefaultBranch(repo, token);
    const baseSha = await getRefSha(repo, defaultBranch, token);

    // create a branch name based on filename
    const baseName = body.filename.replace(/\.mdx?$/i, '').replace(/[^a-zA-Z0-9-_]/g, '-');
    const branchName = `news/${baseName}-${Date.now()}`;

    await createBranch(repo, branchName, baseSha, token);

    const path = `content/news/${body.filename}`;
    const contentBase64 = Buffer.from(body.content, 'utf8').toString('base64');

    await putFile(repo, path, contentBase64, branchName, `Add news: ${body.filename}`, token);

    const prTitle = `Add news: ${body.filename}`;
    const prBody = `Automated PR to add news file ${body.filename}`;
    const pr = await createPullRequest(repo, prTitle, branchName, defaultBranch, prBody, token);

    return NextResponse.json({ ok: true, prUrl: pr.html_url });
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: err.message || String(err) }, { status: 500 });
  }
}

export const runtime = 'nodejs';
