# BMW M4 CSL - Immersive Scroll Experience

A high-performance, cinematic web experience showcasing the BMW M4. This project uses frame-by-frame image sequences synchronized with scroll interaction to create a seamless, video-like "scrollytelling" effect, highly optimized for the web.

**[View Live Demo](https://artheral.github.io/bmw-animated-scroll/)**

## 🚀 Features

- **Frame-by-Frame Scroll Animation**: 147 high-quality frames of the BMW M4 rendered into a smooth scrollable sequence.
- **"Apple-Style" Text Transitions**:
  - Dynamic blur and opacity transforms synchronized with scroll.
  - Parallax text shimmer effects (gradient light sweep inside text).
  - Subtle drop-shadows and ambient glows for readability and depth.
- **Performance Optimized**:
  - Uses HTML5 Canvas for efficient image rendering.
  - Preloaded image assets for instant scroll response.
  - Optimized WebP assets.
- **Responsive Design**: Adapts the canvas scaling and text layout for different screen sizes.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) (Scroll hooks and transforms)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: TypeScript

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/artheral/bmw-animated-scroll.git
   cd bmw-animated-scroll
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🚢 Deployment

This project is configured for deployment on **GitHub Pages**.

To deploy the latest version:
```bash
npm run deploy
```
This script will:
1. Build the Next.js project as a static export (`output: 'export'`).
2. Publish the `out` directory to the `gh-pages` branch.
