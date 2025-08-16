# Tech Stack

## Framework & Runtime
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type safety

## Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **next-themes** - Theme management

## Form & Validation
- **React Hook Form 7.54.1** - Form handling
- **Zod 3.24.1** - Schema validation
- **@hookform/resolvers** - Form validation integration

## Build & Development
- **pnpm** - Package manager (lock file present)
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## Common Commands

```bash
# Development
pnpm dev          # Start development server

# Building
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint (currently disabled in build)
```

## Configuration Notes
- ESLint and TypeScript errors are ignored during builds (configured for rapid prototyping)
- Images are unoptimized for deployment flexibility
- Dark mode support via CSS classes