# FinanceScope 🌍

**Your Global Cost-of-Living Companion**

*Because adulting shouldn't require a finance degree*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://finance-scope.vercel.app)
[![Built with React](https://img.shields.io/badge/Built%20with-React-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## ✨ What's New in v2.0

### 🎨 **Enhanced UI/UX**
- **Modern Design System**: Professional-grade design with consistent styling
- **Smooth Animations**: Framer Motion animations throughout the application
- **Better Visual Hierarchy**: Improved typography, spacing, and visual flow
- **Enhanced Cards**: Redesigned city cards with better information architecture
- **Professional Navigation**: Backdrop blur, better logo design, and mobile support

### 📊 **Advanced Data Visualization**
- **Interactive Charts**: Comprehensive financial health indicators
- **Real-time Analysis**: Live cost breakdowns and trend analysis
- **City Comparison**: Side-by-side comparisons with percentage differences
- **Financial Health Scoring**: Color-coded status indicators (🟢🟡🔴)
- **Smart Recommendations**: Personalized financial advice based on income and city data

### 🔍 **Enhanced Search & Selection**
- **Advanced City Selector**: Searchable city selection with real-time filtering
- **Animated Dropdowns**: Smooth transitions and better UX
- **Clear Comparison**: Easy city comparison with visual feedback
- **Better Mobile Support**: Touch-friendly interactions and responsive design

### 💡 **Intelligent Financial Insights**
- **Smart Recommendations**: Context-aware advice based on financial situation
- **Comprehensive Analysis**: Detailed budget breakdowns and savings calculations
- **Actionable Insights**: Specific recommendations for different financial scenarios
- **Real-time Calculations**: Live updates as you change salary or cities

---

## 🧠 What Problem Are We Solving?

Let's face it:
- 🤯 Cost-of-living calculators feel like they're from 1998
- 💸 Salary comparisons never include the *real* expenses
- 🌎 Relocation decisions shouldn't require 20 browser tabs

**FinanceScope cuts through the noise** with a single dashboard that answers:
*"Can I actually live well in this city with my salary?"*

---

## ✨ Key Features

- **🏙️ Cost of Living Comparison**: Compare rent, groceries, utilities, and more across cities
- **💰 Salary Insights**: See median salaries and industry-specific earnings
- **⚖️ City Comparison**: Side-by-side comparisons of two cities
- **🤖 AI-Driven Advice**: Personalized budgeting tips based on your income
- **🎨 Modern UI**: Sleek design with dark/light mode
- **📊 Financial Insights**: Data-driven visualizations and recommendations
- **🔍 Advanced Search**: Filterable city selection with search functionality
- **📱 Mobile Responsive**: Optimized for all device sizes
- **🎭 Smooth Animations**: Professional-grade micro-interactions

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Vercel

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hamzaelmi068/FinanceScope.git
   cd FinanceScope
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

---

## 📁 Project Structure

```
FinanceScope/
├── public/
│   └── assets/          # Static assets (images, icons)
├── src/
│   ├── components/      # React components
│   │   ├── BudgetAdvice.tsx      # Enhanced financial insights
│   │   ├── CityCard.tsx          # Enhanced city information cards
│   │   ├── CitySelector.tsx     # Advanced city selection
│   │   ├── DataVisualization.tsx # Interactive charts and graphs
│   │   └── FinancialInsights.tsx # Additional financial analysis
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services and external integrations
│   ├── store/           # State management (Zustand stores)
│   │   └── cityStore.ts
│   ├── types/           # TypeScript type definitions
│   │   └── city.ts
│   ├── utils/           # Utility functions
│   │   ├── budgetAnalyzer.ts
│   │   └── designSystem.ts      # Design tokens and component styles
│   ├── App.tsx          # Enhanced main App component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── docs/                # Documentation
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.ts       # Vite configuration
├── DEPLOYMENT.md        # Deployment guide
└── README.md            # This file
```

---

## 🌟 Key Improvements in v2.0

### **Enhanced User Experience**
- **Professional Design**: Enterprise-grade UI with modern design patterns
- **Smooth Animations**: Framer Motion animations for better user engagement
- **Better Accessibility**: Improved keyboard navigation and screen reader support
- **Mobile Optimization**: Touch-friendly interactions and responsive design

### **Advanced Functionality**
- **Smart Search**: Real-time city filtering with search functionality
- **Data Visualization**: Interactive charts and financial health indicators
- **Intelligent Insights**: AI-like personalized recommendations
- **Comprehensive Analysis**: Detailed budget breakdowns and savings calculations

### **Technical Excellence**
- **TypeScript**: Full type safety and better developer experience
- **Modern React**: Latest React patterns and best practices
- **Performance**: Optimized bundle size and loading times
- **Scalability**: Clean, maintainable code architecture

---

## 🌐 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Automatic deployments on every push

### Other Options
- Netlify
- GitHub Pages
- AWS Amplify

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Live Demo**: [finance-scope.vercel.app](https://finance-scope.vercel.app)
- **GitHub Repository**: [github.com/hamzaelmi068/FinanceScope](https://github.com/hamzaelmi068/FinanceScope)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎯 Roadmap

### Upcoming Features:
- **Real-time Data**: Live API integration for current cost data
- **User Accounts**: Save favorite cities and comparisons
- **Advanced Analytics**: More detailed financial planning tools
- **Export Features**: PDF reports and data export
- **Mobile App**: React Native version
- **More Cities**: Expand global coverage

---

**Let's Build a Financially Empowered World! 🌟**

FinanceScope is more than a tool—it's a step toward smarter financial planning. Whether you're relocating, budgeting, or just curious, FinanceScope has you covered.

**Explore now and take control of your financial future!** 🚀
