"use client";

import { useRef } from "react";

const CONTACT_EMAIL = "info.ezeetech.sustain@gmail.com";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const subject = (formData.get("subject") as string) || "";
    const message = (formData.get("message") as string) || "";

    const body = [
      `姓名：${name}`,
      `聯絡信箱：${email}`,
      "",
      "訊息內容：",
      message,
    ].join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject || "網站聯絡表單")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          姓名
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="您的姓名"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
          電子郵件
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
          主旨
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          placeholder="例如：合作洽詢、試點計畫"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          訊息內容
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 resize-y min-h-[120px]"
          placeholder="請輸入您的訊息..."
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition font-medium"
      >
        送出
      </button>
    </form>
  );
}
