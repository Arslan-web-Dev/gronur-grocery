# Gronur Deployment Guide

## Quick Deploy to Vercel

### Step 1: Prepare Your Repository

1. Initialize Git repository (if not already done):
```bash
cd gronur-grocery
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/gronur-grocery.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once created, go to Project Settings > API
3. Copy the `URL` and `anon public` key
4. Go to SQL Editor and run the migration:
   - Open `supabase/migrations/001_initial_schema.sql`
   - Copy contents and paste into SQL Editor
   - Click "Run"

5. Configure Authentication:
   - Go to Authentication > Providers
   - Enable Google: Add your OAuth credentials
   - Enable Apple: Add your Apple Developer credentials
   - Go to Authentication > URL Configuration
   - Add your production URL (e.g., `https://your-app.vercel.app`)
   - Add `https://your-app.vercel.app/auth/callback`

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```
5. Click "Deploy"

### Step 4: Update Supabase with Vercel URL

After deployment:
1. Copy your Vercel production URL
2. Go to Supabase > Authentication > URL Configuration
3. Add the Vercel URL to:
   - Site URL
   - Redirect URLs

## Local Development

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run dev server
npm run dev
```

## Features Checklist

- [x] Responsive design (mobile + desktop)
- [x] Product catalog with 16 products
- [x] Shopping cart with localStorage persistence
- [x] User authentication (email + OAuth)
- [x] Protected routes with middleware
- [x] Order tracking with timeline
- [x] Search functionality
- [x] Category filtering
- [x] Multi-step checkout
- [x] User profile management
- [x] Toast notifications
- [x] Framer Motion animations
- [x] Supabase Row Level Security
- [x] Realtime subscriptions ready

## Troubleshooting

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check Node.js version: `node -v` (should be 18+)

### Auth Issues
- Verify Supabase URL and anon key are correct
- Check redirect URLs in Supabase dashboard
- Ensure middleware.ts is properly configured

### Database Issues
- Run the migration SQL again
- Check RLS policies are enabled
- Verify table names match the code

## Tech Stack Details

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.0 | React framework |
| React | 19.0 | UI library |
| TypeScript | 5.6 | Type safety |
| Tailwind CSS | 3.4 | Styling |
| Supabase | 2.49 | Backend/Auth |
| Zustand | 5.0 | State management |
| Framer Motion | 11.0 | Animations |
| Lucide React | 0.46 | Icons |

## Performance Optimizations

- Server Components for static content
- Client Components for interactive elements
- Image optimization with Next.js Image
- Lazy loading with Framer Motion viewport
- Persistent cart with localStorage
- Debounced search input

## Security Features

- Row Level Security (RLS) on all tables
- Middleware-based route protection
- CSRF protection via Supabase
- Secure session management
- Input validation on forms
