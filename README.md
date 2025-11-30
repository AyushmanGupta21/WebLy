# 🚀 WebLy - AI Website Builder

<div align="center">
  
  ![WebLy Logo](public/logo.svg)
  
  **Your imagination becomes reality with WebLy. Describe it and watch it build.**
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://web-ly.vercel.app/)
  [![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  
</div>

---

## 🌟 About WebLy

WebLy is an AI-powered website builder that transforms your ideas into fully functional, professional websites instantly. Simply describe what you want in plain English, and watch as our AI generates a complete, modern website with clean code that you can customize and export.

**🔗 Live Demo:** [https://web-ly.vercel.app/](https://web-ly.vercel.app/)

---

## ✨ Key Features

- 🤖 **AI-Powered Generation** - Describe your website in natural language and get instant results
- 🎨 **Live Preview** - See your website come to life in real-time as the AI generates it
- ✏️ **Interactive Editing** - Click any element to customize text, colors, images, and styling
- 💬 **Chat-Based Modifications** - Make changes by simply chatting with the AI
- 📦 **Project Management** - Save multiple projects and return to them anytime
- 💾 **Code Export** - Download production-ready HTML/CSS code
- 🎯 **Pre-built Templates** - Quick-start suggestions for dashboards, forms, heroes, and more
- 🔐 **User Authentication** - Secure sign-in with Clerk
- 💳 **Credit System** - Free credits to start, upgrade for unlimited access
- 🌙 **Modern Dark Theme** - Beautiful glassmorphism design with animated backgrounds

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.4** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Three.js** - 3D animated backgrounds

### Backend & Services
- **Clerk** - Authentication and user management
- **Neon PostgreSQL** - Database
- **Drizzle ORM** - Type-safe database queries
- **OpenRouter API** - AI model integration (DeepSeek Chat)
- **ImageKit** - Image processing and transformations

### UI Components
- **Flowbite** - UI components library
- **Chart.js** - Data visualization
- **Swiper.js** - Carousels and sliders
- **Lucide Icons** - Icon library
- **Sonner** - Toast notifications

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Neon recommended)
- Clerk account for authentication
- OpenRouter API key
- ImageKit account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AyushmanGupta21/WebLy.git
   cd WebLy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=your_neon_postgresql_url
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   
   # OpenRouter AI
   OPENROUTER_API_KEY=your_openrouter_api_key
   
   # ImageKit
   NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
ai-website-generator/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Authentication routes
│   ├── api/                     # API routes
│   ├── playground/              # Website editor
│   ├── workspace/               # User dashboard
│   └── _components/             # Shared components
├── components/                   # Reusable UI components
│   └── ui/                      # Radix UI components
├── config/                      # Database & configuration
├── context/                     # React context providers
├── drizzle/                     # Database migrations
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
└── public/                      # Static assets
```

---

## 🎯 How to Use

1. **Sign Up** - Create a free account to get started
2. **Describe Your Website** - Type what you want to build in natural language
3. **Watch It Generate** - AI creates your website in real-time
4. **Customize** - Click elements to edit or chat with AI for modifications
5. **Export** - Download your website code when ready

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ayushman Gupta**

- GitHub: [@AyushmanGupta21](https://github.com/AyushmanGupta21)
- Website: [https://web-ly.vercel.app/](https://web-ly.vercel.app/)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.dev/) for seamless authentication
- [OpenRouter](https://openrouter.ai/) for AI model access
- [Vercel](https://vercel.com/) for hosting
- [Neon](https://neon.tech/) for serverless PostgreSQL

---

<div align="center">
  
  **⭐ Star this repository if you find it helpful!**
  
  Made with ❤️ by Ayushman Gupta
  
</div>
