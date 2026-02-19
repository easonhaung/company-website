# Admin (GitHub OAuth) Setup

This project includes a simple admin UI that authenticates with GitHub OAuth and can create MDX news files in the repository.

Required environment variables (set these in Vercel):

- `GITHUB_CLIENT_ID` — from the GitHub OAuth App
- `GITHUB_CLIENT_SECRET` — from the GitHub OAuth App
- `GITHUB_REPO` — repository in the form `owner/repo` (used to create files)
- `NEXT_PUBLIC_BASE_URL` — e.g. `https://your-site.vercel.app`

Steps to create a GitHub OAuth App:

1. Go to https://github.com/settings/developers and create a new OAuth App.
2. Set the **Authorization callback URL** to `https://your-site.vercel.app/api/auth/callback` (or your local dev URL when testing).
3. Copy the Client ID and Client Secret into Vercel env vars above.

Permissions:
- The flow requests `repo` scope so the app can create files. Use a repo with caution — prefer a dedicated machine account if you want tighter control.

Local development:

1. Set `NEXT_PUBLIC_BASE_URL=http://localhost:3000` in your `.env.local`.
2. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to the values from your GitHub OAuth App.
3. Set `GITHUB_REPO` to `owner/repo` for testing.


Notes & next steps:

- The current implementation stores the GitHub access token in an HTTP-only cookie named `gh_token` after OAuth exchange.
- The `create-news` API now creates a dedicated branch, writes the MDX file to that branch, and opens a Pull Request against the repository default branch. This is the safer workflow and is enabled by default.
- For an alternate flow you can change it to commit directly to the default branch (not recommended).
- If you'd like, I can extend the admin to support image uploads (store images under `public/news/` via uploads to GitHub) and to list/edit existing news files.

PR behavior notes:

- The API creates a branch named `news/{filename-base}-{timestamp}` and opens a PR with the title `Add news: {filename}`.
- You can review and merge the PR in GitHub; merging will add the news file to the main site.

