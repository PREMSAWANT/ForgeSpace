# ForgeSpace

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?logo=next.js)](https://nextjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **A serverless project collaboration platform built for developers.**

ForgeSpace is a professional-grade SaaS platform designed for technical teams who need a clean, efficient way to manage projects, collaborate, and track progress—without the bloat.

## 🎯 Built For Developers

- **Serverless Architecture** - Next.js API routes + MongoDB Atlas + Vercel
- **Clean Codebase** - Interview-ready, well-organized, easy to explain
- **Dark Mode First** - Professional black & white theme
- **Type-Safe** - JavaScript with clear patterns, scalable to TypeScript
- **Free Tier Friendly** - All services have generous free plans

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/ForgeSpace.git
cd ForgeSpace

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## 🛠️ Tech Stack

### Core

```
Next.js 14+       → Full-stack React framework
MongoDB Atlas    → NoSQL database
NextAuth         → Authentication (Google, GitHub)
Cloudinary       → File storage & CDN
Tail windCSS      → Utility-first styling
```

### Fonts & Design

```
Milker           → Branding & logo (display)
Inter            → UI content (sans-serif)
JetBrains Mono   → Technical elements (monospace)
```

## 📊 Features

### ✅ Core Platform

- [x] **Authentication** - NextAuth with Google/GitHub OAuth
- [x] **Workspaces** - Create personal and team workspaces
- [x] **Projects** - Organize work with status tracking
- [x] **File Upload** - Cloudinary integration with permissions
- [x] **Activity Logs** - Complete audit trail
- [x] **Role-Based Access** - Owner, Admin, Member, Viewer

### 🔜 Coming Soon

- [ ] Real-time collaboration with WebSockets
- [ ] Rich text documentation
- [ ] Team member invitations via email
- [ ] Public project showcase pages
- [ ] Advanced search and filtering
- [ ] Export to PDF

## 📁 Project Structure

```
forgespace/
├── app/
│   ├── api/              # API routes (serverless functions)
│   │   ├── auth/         # NextAuth setup
│   │   ├── workspace/    # Workspace CRUD
│   │   ├── project/      # Project CRUD
│   │   ├── files/        # File upload
│   │   └── activity/     # Activity logs
│   ├── dashboard/        # Dashboard page
│   ├── workspace/[id]/   # Workspace detail page
│   ├── project/[id]/     # Project detail page
│   └── page.js           # Landing page
├── components/
│   ├── Navbar.js         # Top navigation
│   ├── Sidebar.js        # Side navigation
│   ├── ProjectCard.js    # Project display
│   ├── WorkspaceCard.js  # Workspace display
│   ├── ActivityLog.js    # Activity timeline
│   └── FileUploader.js   # File upload UI
├── lib/
│   ├── db.js             # MongoDB connection
│   ├── auth.js           # NextAuth config
│   ├── permissions.js    # RBAC utilities
│   └── mongodb-adapter.js # NextAuth adapter
├── models/
│   ├── User.js           # User schema
│   ├── Workspace.js      # Workspace schema
│   ├── Project.js        # Project schema
│   └── Activity.js       # Activity schema
└── utils/
    └── helpers.js        # Utility functions
```

## 🎨 Design System

### Color Palette

```css
/* Black & White Theme */
--black:       #000000    /* Background */
--white:       #FFFFFF    /* Primary text */
--grey-dark:   #0F0F0F    /* Depth */
--grey-charcoal: #1A1A1A  /* Cards */
--grey-mid:    #2A2A2A    /* Borders */
--grey-soft:   #E5E5E5    /* Secondary text */
--grey-muted:  #9CA3AF    /* Hints */
```

### Typography Scale

```css
/* Heading */
4rem (64px)  → Hero title
2rem (32px)  → Page title
1.5rem (24px) → Section heading

/* Body */
1rem (16px)  → Body text
0.875rem (14px) → Small text
0.75rem (12px) → Labels
```

### Spacing System

```
4px, 8px, 16px, 24px, 32px, 48px
```

## 🔐 Environment Variables

Create a `.env.local` file with:

```env
# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/forgespace

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-32-chars-min

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## 🧪 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎓 Interview Ready

### Key Discussion Points

**Architecture**: "Built with serverless Next.js - frontend and backend in one codebase. MongoDB for data, Cloudinary for files, deployed on Vercel."

**Authentication**: "Using NextAuth for OAuth. Sessions stored in MongoDB for revocability. Role-based permissions checked at API level."

**Scalability**: "Serverless functions auto-scale. MongoDB Atlas handles database scaling. Cloudinary CDN for global file delivery."

**Design**: "Minimal black & white theme for professionals. Milker for branding, Inter for UI, JetBrains Mono for technical elements."

## 📝 License

MIT © [Your Name]

---

**Built with focus on:**
- Clean code
- Developer experience
- Interview explainability
- Production readiness

**Made for developers, by developers.**
