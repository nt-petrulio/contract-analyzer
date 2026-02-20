# ⚡ Quick Start Guide

## 1. Prerequisites
- Node.js 20+ installed
- OpenAI API key (get from https://platform.openai.com/api-keys)

## 2. Setup (2 minutes)

```bash
# Clone the repo
git clone https://github.com/nt-petrulio/contract-analyzer.git
cd contract-analyzer

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY
```

## 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 4. Test the App

### Option 1: Try Example Contracts
1. Click "Freelance NDA (приклад)"
2. See instant analysis (pre-loaded, no AI call)

### Option 2: Upload Your Own PDF
1. Click "Вибрати файл" or drag-and-drop a PDF
2. Click "Аналізувати договір"
3. Wait 30-60 seconds for AI analysis
4. Review results

## 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Add environment variable
vercel env add OPENAI_API_KEY
# Paste your key when prompted
# Select "Production" scope

# Redeploy with env vars
vercel --prod
```

Done! Your app is live.

---

## Troubleshooting

### "Module not found" error
```bash
rm -rf node_modules package-lock.json
npm install
```

### OpenAI API error
- Check your API key in `.env.local`
- Verify you have credits at https://platform.openai.com/usage

### PDF parsing fails
- Ensure PDF is under 10MB
- Try with example contracts first
- Check if PDF contains extractable text (not scanned image)

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

**Need help?** Check README.md or PROJECT_SUMMARY.md
