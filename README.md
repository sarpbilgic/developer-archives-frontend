# Developer Archives - Frontend

A modern, AI-powered search engine for discovering open source repositories. Built with Next.js 16, React Query, and Zustand. 
For the main repository of the system visit: https://github.com/sarpbilgic/developer-archives

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


## 🔌 API Integration

The frontend is connected to theAWS API Gateway backend with these endpoints:

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


## 📄 License

See LICENSE file in the root directory.

## 🤝 Contributing

This is part of the Developer Archives project. See the main README for contribution guidelines.
