# Deployment Guide for MeetingStack

**Deploying "MeetingStack by PS Technologies" to the world!**

Since this is a React app, we can host it for free on **Netlify**. It fits their "Starter" plan perfectly, which is free for personal or small commercial projects (as long as you aren't an enterprise team).

## Prerequisites

1.  **GitHub Account** (Recommended) OR just your project files.
2.  **Netlify Account** (Sign up at [netlify.com](https://netlify.com)).

## Method 1: Connect to GitHub (Recommended)

_Best for: Automatic updates whenever you push code._

1.  Log in to Netlify.
2.  Click **"Add new site"** -> **"Import an existing project"**.
3.  Click **"GitHub"**. (Authorize Netlify if asked).
4.  Search for `meeting-stack` and select it.
5.  **Build Settings:**
    - **Build command**: `npm run build` (Netlify usually detects this)
    - **Publish directory**: `dist` (Netlify usually detects this)
6.  **Environment Variables:**
    - Click "Add environment variables".
    - Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
7.  Click **Deploy**.

Now, every time you run `git push`, your live site updates automatically!

## Method 2: Drag & Drop (Manual)

_Best for: Quick, one-off overrides._

1.  **Build the Project**
    - Open your terminal in the project folder.
    - Run: `npm run build`
    - This creates a `dist` folder.

2.  **Upload to Netlify**
    - Log in to your Netlify Dashboard.
    - Go to the "Sites" tab.
    - You will see a box that says "Drag and drop your site output folder here".
    - Drag the **`dist`** folder from your computer and drop it into that box.
    - Netlify will upload and publish it instantly!

3.  **Configure Environment Variables (CRITICAL)**
    _Your app won't work yet because it doesn't know about Supabase._
    - On your new site's dashboard in Netlify, go to **Site settings** -> **Environment variables**.
    - Click **Add a variable**.
    - Add these two (copy them exactly from your local `.env` file):
      - Key: `VITE_SUPABASE_URL`, Value: `[Your Supabase URL]`
      - Key: `VITE_SUPABASE_ANON_KEY`, Value: `[Your Supabase Key]`
    - Click **Save**.

4.  **Final Polish**
    - Go to **Site overview**.
    - You'll see a random link like `silly-goose-123456.netlify.app`.
    - Click **Site configuration** -> **Change site name**.
    - Change it to something like `meetingstack-ps.netlify.app` (or buy a domain like `meetingstack.com` and connect it).

## Is it Free?

- **Netlify**: Yes, the Starter plan is free. If you have thousands of active users later, you might need to upgrade.
- **Supabase**: The database is free up to 500MB. If you get huge, you pay securely.

---

## Alternative: Vercel (Also Free & Excellent)

Vercel is actually **just as good** (some say better for performance). I only suggested Netlify first because of the "Drag & Drop" feature. If you want to use Vercel:

1.  **Install Vercel CLI**: `npm i -g vercel` (or just use their website).
2.  **Deploy**: Run `vercel` in your project folder.
3.  **Setup**: It will ask simple questions (Y/N).
4.  **Environment**: Go to the Vercel Dashboard -> Settings -> Environment Variables and add the same 2 Supabase keys.

**Both options are industry standard and free for this app.**

**You are now Live! 🚀**
