# Developer Archives - Frontend

A modern, AI-powered search engine for discovering open source repositories. Built with Next.js 16, React Query, and Zustand.

## 🎨 Design System

**Industrial Dark Mode Theme**
- **Primary Colors**: Brushed Steel (#71717a), Gunmetal Gray (#27272a)
- **Accent**: Electric Blue (#0ea5e9)
- **Background**: Deep Black (#0a0a0a)
- **Modern aesthetic** inspired by Vercel's design language

## 🏗️ Architecture

### Three-Pane Layout (SPA)
1. **FiltersPane** (Left) - Search filters and options
2. **ResultsPane** (Center) - Repository search results
3. **DetailPane** (Right) - Selected repository details with README

### State Management
- **Zustand** for global state (search query, selected project)
- **React Query** for server state (API data fetching, caching)

### Key Features
- ✨ AI-powered semantic search
- 🎯 Real-time filtering
- 📱 Responsive 3-pane layout
- 🌙 Dark mode optimized
- 🚀 Optimistic UI updates
- 📖 Markdown README rendering

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and add your API Gateway URL
# NEXT_PUBLIC_API_URL=https://your-api-gateway-url.execute-api.region.amazonaws.com
```

## 🚀 Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.js          # Top navigation with search
│   │   ├── panes/
│   │   │   ├── FiltersPane.js     # Left sidebar filters
│   │   │   ├── ResultsPane.js     # Center search results
│   │   │   └── DetailPane.js      # Right repository details
│   │   └── common/
│   │       ├── RepoCard.js        # Repository card component
│   │       └── ReadmeViewer.js    # Markdown renderer
│   ├── ClientProviders.js         # React Query provider
│   ├── layout.js                  # Root layout
│   ├── page.js                    # Main 3-pane layout
│   └── globals.css                # Theme & global styles
├── lib/
│   ├── api.js                     # API client functions
│   └── store.js                   # Zustand store
```

## 🔌 API Integration

The frontend connects to your AWS API Gateway backend with these endpoints:

- `GET /api/v1/search` - Search repositories
- `GET /api/v1/projects/{id}` - Get project details
- `GET /api/v1/projects/{id}/readme` - Get project README

## 🎯 Usage Flow

1. **Search**: Enter a query in the header search bar
2. **Browse**: View results in the center pane
3. **Select**: Click a repository card to view details
4. **Explore**: Read the README and repository stats in the right pane

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5
- **Data Fetching**: TanStack React Query 5
- **Markdown**: react-markdown + remark-gfm
- **Icons**: Lucide React

## 📝 Environment Variables

```env
NEXT_PUBLIC_API_URL=your-api-gateway-url
```

## 🚢 Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

Deploy to Vercel, Netlify, or any platform that supports Next.js.

## 🎨 Customization

### Theme Colors
Edit `src/app/globals.css` to customize the color scheme:

```css
:root {
  --accent-primary: #0ea5e9;  /* Electric Blue */
  --steel: #71717a;            /* Brushed Steel */
  --gunmetal: #27272a;         /* Gunmetal Gray */
  /* ... more colors */
}
```

### Layout
Adjust pane widths in `src/app/page.js`:

```jsx
<aside className="w-64 ...">      {/* Left pane width */}
<aside className="w-[480px] ...">  {/* Right pane width */}
```

## 📄 License

See LICENSE file in the root directory.

## 🤝 Contributing

This is part of the Developer Archives project. See the main README for contribution guidelines.
