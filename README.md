# 🎵 2progi Night Club

<img width="2880" height="1620" alt="image" src="https://github.com/user-attachments/assets/11dfe69f-e36d-4654-9ee4-c1491e75dc2b" />


<div align="center">

[![Website](https://img.shields.io/badge/🌐_Visit-2progi.vercel.app-blue?style=for-the-badge)](https://2progi.vercel.app)

_Experience the nightlife like never before_

[🎉 Visit Website](https://2progi.vercel.app) • [📸 Gallery](#features) • [🎪 Events](#features) • [📰 News](#features)

</div>

---

## 🌟 About

**2progi** is a modern, full-stack web application for a premier night club located in Poznań, Poland. This project showcases cutting-edge web technologies to deliver an immersive digital experience for club-goers, featuring event management, photo galleries, news updates, and seamless multilingual support.

## ✨ Features

- 🎭 **Event Management** - Browse upcoming events and book your spot
- 📸 **Photo Gallery** - Relive the best moments with our dynamic gallery
- 📰 **News & Updates** - Stay informed about the latest happenings
- 🌍 **Multilingual Support** - Full English and Polish localization
- 🎨 **Smooth Animations** - Enhanced UX with Framer Motion and Lenis
- 📱 **Responsive Design** - Perfect experience on any device
- 🔐 **Admin Panel** - Comprehensive content management system
- 🚀 **Performance Optimized** - Lightning-fast load times and SEO-ready
- 🗺️ **Interactive Map** - Easy-to-find location with embedded maps
- 📧 **Contact Forms** - Direct communication with the venue

## 🛠️ Tech Stack

### Frontend

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion + Lenis for smooth scrolling
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **UI Notifications:** Sonner

### Backend & Services

- **Database:** [Convex](https://www.convex.dev/) - Real-time backend
- **Image Management:** ImageKit.io
- **Analytics:** Vercel Analytics & Speed Insights
- **Internationalization:** Custom i18n implementation

### Development Tools

- **Package Manager:** pnpm
- **Code Quality:** ESLint + Prettier
- **Compiler:** React Compiler (RC3)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/whit33th/night-club.git
   cd night-club
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with necessary credentials:

   ```env
   # Convex
   CONVEX_DEPLOYMENT=
   NEXT_PUBLIC_CONVEX_URL=

   # ImageKit
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
   IMAGEKIT_PRIVATE_KEY=
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

   This will start:
   - Next.js frontend at [http://localhost:3000](http://localhost:3000)
   - Convex backend in development mode

5. **Build for production**
   ```bash
   pnpm build
   pnpm start
   ```

## 📁 Project Structure

```
night-club/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Localized routes
│   │   ├── about/         # About page
│   │   ├── admin/         # Admin dashboard
│   │   ├── events/        # Events listing & details
│   │   ├── gallery/       # Photo gallery
│   │   ├── news/          # News & blog
│   │   └── legal/         # Legal pages
│   └── api/               # API routes
├── components/            # React components
│   ├── Containers/        # Layout containers
│   ├── Providers/         # Context providers
│   ├── SEO/              # SEO components
│   └── UI/               # Reusable UI components
├── convex/               # Convex backend
├── dictionaries/         # i18n translations
├── lib/                  # Utilities & helpers
└── public/               # Static assets
```

## 🌐 Internationalization

The app supports multiple languages with a custom i18n implementation:

- 🇬🇧 English (`en`)
- 🇵🇱 Polish (`pl`)

Language is automatically detected from the URL path (`/en/*` or `/pl/*`).

## 🎨 Key Features in Detail

### Admin Panel

Secure admin interface for managing:

- Events (create, edit, delete)
- Gallery images (upload, organize, delete)
- News articles
- Site content

### SEO Optimization

- Dynamic metadata
- Structured data (JSON-LD)
- Automatic sitemap generation
- Open Graph & Twitter Cards
- Robots.txt configuration
- All files written in TypeScript

### Performance

- Image optimization with ImageKit
- Lazy loading
- Code splitting
- React Server Components
- Edge-ready deployment

## 📍 Club Information

- **Location:** al. Niepodległości 36, Poznań, Poland
- **Capacity:** 500 guests
- **Contact:** +48 606 277 256
- **Email:** biuro@2progi.pl

### Social Media

- [Instagram](https://instagram.com/2progi)
- [Facebook](https://facebook.com/2progi)
- [TikTok](https://www.tiktok.com/@2progi)
- [Telegram](https://t.me/poznan2progi)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🎯 Roadmap

- [ ] Mobile app integration
- [ ] Ticket booking system
- [ ] VIP reservations
- [ ] Guest list management
- [ ] Live event streaming
- [ ] DJ schedule integration

---

<div align="center">

**Made with ❤️ for the nightlife community**

[⬆ Back to Top](#-2progi-night-club)

</div>
