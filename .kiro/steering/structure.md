# Project Structure

## Directory Organization

```
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page (main entry point)
├── components/            # React components
│   ├── screens/          # Individual CAPTCHA challenge screens
│   ├── ui/               # Reusable UI components (shadcn/ui style)
│   ├── captcha-*.tsx     # CAPTCHA-specific components
│   └── theme-*.tsx       # Theme management components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and constants
├── public/               # Static assets
└── styles/               # Additional CSS files
```

## Architecture Patterns

### Component Organization
- **Screen Components**: Located in `components/screens/`, each represents a CAPTCHA challenge step
- **UI Components**: Reusable components in `components/ui/` following shadcn/ui patterns
- **Context Providers**: Theme and CAPTCHA state management via React Context

### State Management
- React Context for global state (theme, CAPTCHA progress)
- Local component state with useState for screen-specific logic
- Custom hooks for reusable logic (e.g., Konami code detection)

### Styling Conventions
- Tailwind CSS utility classes for styling
- CSS custom properties for theme variables
- Conditional styling based on theme context
- Responsive design with mobile-first approach

### File Naming
- kebab-case for component files
- PascalCase for component names
- Descriptive names that indicate purpose (e.g., `button-hell.tsx`, `contrast-trap.tsx`)

## Key Architectural Decisions
- App Router over Pages Router for modern Next.js patterns
- Client-side rendering for interactive components ("use client" directive)
- Modular screen system for easy addition of new challenges
- Theme system supporting multiple visual styles