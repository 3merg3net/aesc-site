This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ⚡ Meshwork

Meshwork is the live network visualization inside ÆSC Trust.  
It shows digital nodes sending signed threads and appearing on a real-time map.

### 🚀 Features
- **Animated Header** with glitch + mesh grid background
- **Getting Started Guide** (step-by-step onboarding with infographics)
- **Full-bleed Live Map** (React-Leaflet, auto-updating via SSE or fallback polling)
- **Infographics Pack**:
  - infographic-getting-started.png
  - infographic-ping-lifecycle.png
  - infographic-mesh-growth.png
  - infographic-why-mesh.png
  - infographic-future-expansion.png
- **Legend + Tooltips** show node recency, ID, and location

### 🛠️ Local Development
```bash
# install deps
npm install

# run dev server
npm run dev


public/meshwork/
  meshwork-hero.png
  meshwork-hero-alt.png
  meshwork-stars.png
  meshwork-tile.png
  meshwork-logo.png
  infographic-getting-started.png
  infographic-ping-lifecycle.png
  infographic-mesh-growth.png
  infographic-why-mesh.png
  infographic-future-expansion.png
