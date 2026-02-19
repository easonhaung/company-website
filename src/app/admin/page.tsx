"use client";
import { useState } from 'react';

export default function AdminPage() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2025-01-01');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  async function handleLogin() {
    window.location.href = '/api/auth/login';
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
    const filename = `${date}-${slug}.mdx`;
    const mdx = `---\ntitle: "${title}"\ndate: "${date}"\ntype: "news"\nexcerpt: "${excerpt}"\n---\n\n${content}\n`;

    setStatus('Uploading...');
    const res = await fetch('/api/admin/create-news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename, content: mdx }),
    });
    const j = await res.json();
    if (j.ok) setStatus('Created: ' + filename);
    else setStatus('Error: ' + (j.message || JSON.stringify(j)));
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Admin — 新聞管理</h1>

      <p className="mb-4">若尚未登入，請先用 GitHub 帳號登入。</p>
      <button onClick={handleLogin} className="px-4 py-2 bg-sky-600 text-white rounded">
        使用 GitHub 登入
      </button>

      <hr className="my-6" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>標題</label>
          <input className="w-full border p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>日期</label>
          <input type="date" className="w-full border p-2" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label>摘要</label>
          <input className="w-full border p-2" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>
        <div>
          <label>內容（MDX）</label>
          <textarea className="w-full border p-2 h-40" value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <button className="px-4 py-2 bg-green-600 text-white rounded" type="submit">
            建立新聞
          </button>
        </div>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
}
