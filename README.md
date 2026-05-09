# 🌍 Cartoon World — 2D Animated Website

A fully animated 2D cartoon-style interactive website with modern playful UI and cinematic transitions.

## 🚀 Tech Stack

- **Next.js 15** — React framework
- **TailwindCSS** — Utility-first CSS
- **Framer Motion** — Smooth animations
- **GSAP** — Advanced animation library
- **Lenis Smooth Scroll** — Buttery smooth scrolling
- **TypeScript** — Type safety

## ✨ Features

1. **Fullscreen Hero Intro** — Animated night sky with moving clouds, floating particles, character entrance, and glowing CTA button
2. **Interactive Cursor** — Custom cursor with sparkle trail and hover reactions
3. **Scroll Story Experience** — Side-scrolling parallax with walking character across changing environments
4. **Features Section** — Game-card style UI with hover wobble animations
5. **Playground Section** — Draggable objects, Easter eggs, click reactions, particle effects
6. **Testimonials** — Cartoon avatars with animated speech bubbles and idle animations
7. **Footer Ending Scene** — Sunset animation, waving character, animated stars, launchable rocket
8. **Day/Night Mode** — Dynamic theme switching
9. **Sound Toggle** — Ambient sound control (UI ready)
10. **Loading Screen** — Premium animated loading experience

## 📁 Project Structure

```
cartoon-world/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with fonts
│   │   └── page.tsx        # Main page
│   ├── components/
│   │   ├── Hero/           # Hero section with parallax
│   │   ├── Cursor/         # Custom cursor with effects
│   │   ├── ScrollStory/    # Scroll-driven story section
│   │   ├── Features/       # Feature cards with animations
│   │   ├── Playground/     # Interactive draggable zone
│   │   ├── Testimonials/   # Animated testimonials carousel
│   │   ├── Footer/         # Sunset footer with animations
│   │   └── UI/             # Shared components
│   │       ├── CartoonAssets.tsx  # SVG characters & assets
│   │       ├── LoadingScreen.tsx  # Loading animation
│   │       ├── Navbar.tsx         # Sticky navbar
│   │       ├── SmoothScroll.tsx   # Lenis wrapper
│   │       ├── DayNightToggle.tsx # Theme toggle
│   │       └── SoundToggle.tsx    # Sound toggle
│   └── styles/
│       └── globals.css     # Global styles & animations
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 🎨 Design System

### Colors
- **Purple**: `#6B35D9` — Primary brand color
- **Yellow**: `#FFD700` — Accent / CTA
- **Pink**: `#FF6B9D` — Highlight
- **Blue**: `#2D5BE3` — Supporting color
- **Green**: `#4CAF50` — Nature elements

### Fonts
- **Fredoka One** — Display / headings
- **Nunito** — Body text

### Animations
- All animations use Framer Motion for GPU-accelerated performance
- CSS animations for continuous loops (clouds, stars, particles)
- GSAP available for complex timeline animations

## 📱 Responsive Design

- Mobile-first approach
- Custom cursor hidden on touch devices
- Optimized animations for mobile performance
- Responsive typography and spacing

## 🔧 Customization

### Change colors
Edit `tailwind.config.js` and `src/styles/globals.css` CSS variables.

### Add new characters
Add SVG components in `src/components/UI/CartoonAssets.tsx`.

### Modify sections
Each section is a standalone component in its own folder.

## 🚀 Deployment

Compatible with Vercel, Netlify, or any Node.js hosting:

```bash
npm run build
```

---

Built with ❤️ and ✨ — Cartoon World © 2026
