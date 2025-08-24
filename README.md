# Not-a-robot CAPTCHA

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/mrvt-projects/v0-not-a-robot-captcha) [![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/OizIny0JuGE)

## Overview

A modern, interactive CAPTCHA implementation featuring an innovative "Not-a-robot" verification system. This project demonstrates advanced React component architecture with Next.js, providing a user-friendly alternative to traditional CAPTCHA mechanisms. Built with v0.dev's AI-assisted development platform, it showcases cutting-edge UI/UX design patterns.

## Features

- ✨ Interactive CAPTCHA challenge system
- 🎨 Modern, responsive design with Tailwind CSS
- ⚡ Built with Next.js 13+ App Router
- 🔧 TypeScript for type safety
- 🎯 Component-based architecture
- 📱 Mobile-friendly responsive interface
- 🌟 Smooth animations and transitions
- 🔄 Real-time validation feedback
- ⚙️ Configurable challenge types
- 🚀 Optimised performance

## Quick Start

```bash
# Clone the repository
git clone https://github.com/hugomrvt/not-a-robot-design.git
cd not-a-robot-design

# Install dependencies
npm install
# or
pnpm install

# Start the development server
npm run dev
# or
pnpm dev

# Open http://localhost:3000 in your browser
```

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Scripts](#scripts)
- [Architecture](#architecture)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Tech Stack](#tech-stack)
- [Credits](#credits)
- [License](#license)

## Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Using pnpm (recommended)
pnpm dev            # Start development server
pnpm build          # Build for production
pnpm start          # Start production server
pnpm lint           # Run ESLint
```

## Architecture

```
not-a-robot-design/
├── app/                 # Next.js 13+ App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   └── captcha-challenge.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
├── styles/             # Additional stylesheets
├── components.json     # shadcn/ui configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Dependencies and scripts
├── tailwind.config.ts  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

### Key Components

- **CaptchaChallenge**: Main CAPTCHA verification component
- **Layout**: Root layout with global styling
- **Page**: Landing page with CAPTCHA integration

## Environment Variables

Currently, this project doesn't require specific environment variables. All configuration is handled through:

- `next.config.mjs` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS theming
- `components.json` - shadcn/ui component configuration

## Deployment

### Live Demo

🌐 **Production**: [https://v0-not-a-robot-captcha.vercel.app](https://v0-not-a-robot-captcha.vercel.app)

### Vercel Deployment

This project is automatically deployed to Vercel:

1. **Automatic Deployment**: Connected to GitHub for continuous deployment
2. **Branch Protection**: Main branch deployments to production
3. **Preview Deployments**: Pull request previews available
4. **Build Optimisation**: Automatic performance optimisations

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy to Vercel (requires Vercel CLI)
vercel --prod
```

### v0.dev Integration

This repository stays in sync with [v0.dev](https://v0.dev) deployments:

- **Project URL**: [https://v0.dev/chat/projects/OizIny0JuGE](https://v0.dev/chat/projects/OizIny0JuGE)
- **Automatic Sync**: Changes from v0.dev are pushed to this repository
- **Live Updates**: Vercel deploys the latest version automatically

## Contributing

Contributions are welcome! This project follows standard open-source contribution guidelines:

### Development Workflow

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
4. **Make** your changes
5. **Test** thoroughly
6. **Commit** your changes (`git commit -m 'feat: add amazing feature'`)
7. **Push** to your branch (`git push origin feature/amazing-feature`)
8. **Open** a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use ESLint configuration provided
- Maintain consistent code formatting
- Write meaningful commit messages
- Test your changes thoroughly

## Tech Stack

### Core Technologies

- **[Next.js](https://nextjs.org/)** - React framework with App Router
- **[React](https://reactjs.org/)** - Component-based UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Development Tools

- **[v0.dev](https://v0.dev/)** - AI-assisted development platform
- **[Vercel](https://vercel.com/)** - Deployment and hosting
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS post-processing
- **[pnpm](https://pnpm.io/)** - Package manager

### Languages

- **TypeScript**: 80.4%
- **CSS**: 19.0%
- **JavaScript**: 0.6%

## Credits

### Project Author

**Hugo Mourlevat** ([@hugomrvt](https://github.com/hugomrvt))
- Project Creator & Maintainer
- Original concept and implementation

### Contributors

- **[v0[bot]](https://github.com/apps/v0)** - AI-assisted development contributions

### Acknowledgements

- Built with [v0.dev](https://v0.dev/) AI-assisted development
- Deployed on [Vercel](https://vercel.com/) platform
- Inspired by modern CAPTCHA design patterns
- Community feedback and contributions

## License

This project is open source and available under standard terms. Please refer to the repository settings for specific licensing information.

---

**Project Links:**
- 🌐 [Live Demo](https://v0-not-a-robot-captcha.vercel.app)
- 📊 [Vercel Dashboard](https://vercel.com/mrvt-projects/v0-not-a-robot-captcha)
- 👨‍💻 [Author Profile](https://github.com/hugomrvt)

*Built with ❤️ using v0.dev by [Hugo Mourlevat](https://github.com/hugomrvt)
