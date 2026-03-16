import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname);

// 直接讀取專案 .env.local 並解析，確保 NEXT_PUBLIC_* 一定傳給 client（不依賴 process.env 順序）
function loadEnvLocal() {
  const envPath = path.join(projectRoot, '.env.local');
  const env = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
    }
  }
  return env;
}
const envLocal = loadEnvLocal();

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  // 強制 Webpack 以本專案目錄為 context，tailwind 一律從專案 node_modules 解析，讓所有檔案都能正確依賴
  webpack: (config) => {
    const projectNodeModules = path.join(projectRoot, 'node_modules');
    config.context = projectRoot;
    config.resolve.modules = [
      projectNodeModules,
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : ['node_modules']),
    ];
    config.resolve.alias = {
      ...config.resolve.alias,
      tailwindcss: path.join(projectNodeModules, 'tailwindcss'),
      '@tailwindcss/postcss': path.join(projectNodeModules, '@tailwindcss/postcss'),
    };
    return config;
  },
  transpilePackages: ['next-mdx-remote'],
  // 明確傳遞 Firebase 環境變數給 client（從上方讀取的 .env.local）
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: envLocal.NEXT_PUBLIC_FIREBASE_API_KEY ?? process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: envLocal.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: envLocal.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: envLocal.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: envLocal.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: envLocal.NEXT_PUBLIC_FIREBASE_APP_ID ?? process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: envLocal.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
