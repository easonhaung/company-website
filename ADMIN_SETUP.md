# Admin (GitHub OAuth) Setup

This project includes a simple admin UI that authenticates with GitHub OAuth and can create MDX news files in the repository.

## Current OAuth App Configuration

**App Name:** `ezeetech_admin`  
**Client ID:** `0v231iUIEL1YuL452kin`  
**Repository:** `eason/company-website`

### Callback URLs for Each Environment

- **Local development:** `http://localhost:3000/api/auth/callback`
- **Vercel staging:** `https://company-website-nu-eight.vercel.app/api/auth/callback`
- **Production (www.ezeetech.tw):** `https://www.ezeetech.tw/api/auth/callback`

## Step 1: Configure OAuth App on GitHub

The OAuth App `ezeetech_admin` has been created. You can manage it at https://github.com/settings/developers.

For **local development**, ensure the Authorization callback URL includes:  
```
http://localhost:3000/api/auth/callback
```

For **production deployment**, also add:
```
https://www.ezeetech.tw/api/auth/callback
```

(GitHub OAuth Apps support multiple callback URLs; add all environments you plan to use.)

## Step 2: Set Up Local Development

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. The `.env.local` should already contain:
   ```
   GITHUB_CLIENT_ID=0v231iUIEL1YuL452kin
   GITHUB_CLIENT_SECRET=577be639609c76a99d7d1b2edae47794391f054e
   GITHUB_REPO=eason/company-website
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. Restart the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000/admin` and click "使用 GitHub 登入" to test OAuth.


## Step 3: Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add admin OAuth setup"
   git push
   ```

2. **Add environment variables to Vercel:**
   - Go to your project on https://vercel.com → Settings → Environment Variables
   - Add the following variables:
     ```
     GITHUB_CLIENT_ID = 0v231iUIEL1YuL452kin
     GITHUB_CLIENT_SECRET = 577be639609c76a99d7d1b2edae47794391f054e
     GITHUB_REPO = eason/company-website
     NEXT_PUBLIC_BASE_URL = https://company-website-nu-eight.vercel.app
     ```

3. **For production domain (www.ezeetech.tw):**
   - When you configure the domain, also update the callback URL in your GitHub OAuth App settings.
   - Optionally add another set of env vars for the production domain (or create a Vercel environment override for production).

4. **Redeploy:**
   - After setting env vars, redeploy the project:
     ```bash
     vercel --prod
     ```
   - Or push to main branch if auto-deploy is enabled.

5. **Test:**
   - Go to `https://company-website-nu-eight.vercel.app/admin` and try logging in with GitHub.


Notes & Technical Details:

- The current implementation stores the GitHub access token in an **HTTP-only cookie** named `gh_token` after OAuth exchange. This is set to expire in 7 days.
- The `create-news` API creates a dedicated branch (named `news/{filename-base}-{timestamp}`), writes the MDX file to that branch, and opens a **Pull Request** against the repository default branch. This is the safer workflow.
- Once you review and merge the PR in GitHub, the news file will be included in the site's next deployment.
- The admin flow requests the `repo` scope, which allows the app to create files and branches. For tighter access control, you could restrict the OAuth App to your personal account or set up a dedicated bot account.

## Troubleshooting

**OAuth redirect shows 404 or empty client_id:**
- Ensure `.env.local` contains `GITHUB_CLIENT_ID` with the correct value.
- Restart the dev server after updating `.env` files.
- Check browser DevTools to see the full redirect URL.

**"Not authenticated" error when submitting news:**
- Log out and log back in via `http://localhost:3000/api/auth/login`.
- GitHub token may have expired; generate a new token in OAuth App settings.

**PR doesn't appear in GitHub:**
- Check the API response in browser console for error details.
- Ensure the `GITHUB_REPO` is correct and the authenticated user has write access to the repository.

## Next Steps & Extensions

- **Image uploads:** Add support for uploading images to `public/news/` via the admin form.
- **Edit existing news:** List published news files and allow editing/deletion.
- **Preview:** Show a live preview of the MDX before submitting the PR.

