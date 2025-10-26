#!/bin/bash

# FinanceScope Deployment Helper Script
# This script helps you prepare and deploy your FinanceScope application

echo "🚀 FinanceScope Deployment Helper"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    echo "Please run: npm install"
    echo ""
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please ensure you're in the correct directory."
    exit 1
fi

echo "🔍 Checking project status..."
echo ""

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Found uncommitted changes:"
    git status --short
    echo ""
    echo "💡 To commit your changes:"
    echo "   git add ."
    echo "   git commit -m 'Enhanced FinanceScope with modern UI/UX and data visualization'"
    echo ""
else
    echo "✅ No uncommitted changes found"
    echo ""
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "main")
echo "🌿 Current branch: $CURRENT_BRANCH"
echo ""

# Check if remote origin exists
if git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 Remote origin configured:"
    git remote get-url origin
    echo ""
    echo "📤 To push to GitHub:"
    echo "   git push origin $CURRENT_BRANCH"
    echo ""
else
    echo "🔗 No remote origin configured"
    echo ""
    echo "💡 To add GitHub remote:"
    echo "   git remote add origin https://github.com/hamzaelmi068/FinanceScope.git"
    echo "   git push -u origin $CURRENT_BRANCH"
    echo ""
fi

echo "🌐 Deployment Options:"
echo "====================="
echo ""
echo "1. 🚀 Vercel (Recommended)"
echo "   - Go to https://vercel.com"
echo "   - Sign in with GitHub"
echo "   - Import your repository"
echo "   - Deploy automatically"
echo ""
echo "2. 🌐 Netlify"
echo "   - Go to https://netlify.com"
echo "   - Connect GitHub repository"
echo "   - Build command: npm run build"
echo "   - Publish directory: dist"
echo ""
echo "3. 📄 GitHub Pages"
echo "   - Enable in repository settings"
echo "   - Use GitHub Actions for deployment"
echo ""

echo "📋 Pre-deployment Checklist:"
echo "============================"
echo ""
echo "□ Dependencies installed (npm install)"
echo "□ Application builds successfully (npm run build)"
echo "□ No TypeScript errors (npm run type-check)"
echo "□ No linting errors (npm run lint)"
echo "□ All changes committed to git"
echo "□ Repository pushed to GitHub"
echo "□ Remote deployment platform configured"
echo ""

echo "🎯 Next Steps:"
echo "=============="
echo ""
echo "1. Install dependencies: npm install"
echo "2. Test locally: npm run dev"
echo "3. Build for production: npm run build"
echo "4. Commit changes: git add . && git commit -m 'Your message'"
echo "5. Push to GitHub: git push origin main"
echo "6. Deploy to Vercel: Connect repository at vercel.com"
echo ""

echo "📚 Documentation:"
echo "================="
echo "- README.md: Project overview and setup"
echo "- DEPLOYMENT.md: Detailed deployment guide"
echo ""

echo "✨ Your enhanced FinanceScope is ready for deployment!"
echo "Happy coding! 🚀"
