# 🛡️ ContractGuard - AI Contract Analyzer

AI-powered contract analysis for Ukrainian IT companies. Upload a PDF contract and get instant risk assessment in Ukrainian.

## 🚀 Live Demo

**Live URL:** TBD (will be updated after Vercel deployment)

## ✨ Features

- 📄 **PDF Upload**: Drag-and-drop PDF contracts (max 10MB)
- 🤖 **AI Analysis**: GPT-4 powered contract review
- 🇺🇦 **Ukrainian Language**: Full interface and analysis in Ukrainian
- 🎯 **Risk Detection**: 
  - 🔴 Critical risks (IP ownership, liability, unfair terms)
  - 🟡 Potential issues (unclear terms, missing clauses)
  - 🟢 Ambiguous wording (vague dates, scope)
  - 📋 Actionable recommendations
- ⭐ **Safety Score**: 0-100 contract safety rating
- 💼 **Demo Examples**: Pre-loaded NDA and Employment contract analyses

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS (dark theme with 🇺🇦 blue/yellow accents)
- **AI**: OpenAI GPT-4o
- **PDF Parsing**: pdf-parse
- **Deployment**: Vercel
- **Icons**: lucide-react

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/nt-petrulio/contract-analyzer.git
cd contract-analyzer

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Add your OpenAI API key to .env.local
# OPENAI_API_KEY=sk-...

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

Create a `.env.local` file with:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

Get your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

## 📸 Screenshots

![Landing Page](./docs/screenshot-landing.png)
![Analysis Results](./docs/screenshot-analysis.png)

## 💰 Pricing (MVP Concept)

- **$19/contract** - Single analysis
- **$49/month** - Unlimited analyses

*Note: Payment is currently mocked for MVP. Integrate Stripe for production.*

## 🧪 Testing

### Test with example contracts:
1. Visit the homepage
2. Click "Freelance NDA (приклад)" or "Employment Contract (приклад)"
3. See pre-analyzed results instantly

### Test with your own PDF:
1. Upload a PDF contract (max 10MB)
2. Click "Аналізувати договір"
3. Wait 30-60 seconds for AI analysis
4. Review results with safety score and recommendations

## 📝 How It Works

1. **Upload**: User uploads PDF contract
2. **Parse**: Extract text using pdf-parse
3. **Analyze**: Send to GPT-4 with specialized Ukrainian contract law prompt
4. **Display**: Show structured results with color-coded risk levels
5. **Monetize**: Mock payment flow for full report access

## 🎯 Target Audience

- Ukrainian IT freelancers
- Startups signing vendor contracts
- Small agencies reviewing client agreements
- Developers checking employment contracts

## ⚠️ Limitations (MVP)

- No user authentication
- No database (stateless)
- No real payment processing
- No contract history
- No email delivery
- OpenAI costs ~$0.10-0.50 per analysis

## 🔮 Future Improvements

- [ ] User accounts + Supabase
- [ ] Stripe payment integration
- [ ] Email PDF reports
- [ ] Contract history dashboard
- [ ] Comparison tool (before/after edits)
- [ ] Multi-language support (English, Polish)
- [ ] Export to DOCX with tracked changes
- [ ] Real-time collaborative review
- [ ] Lawyer consultation booking

## 📄 License

MIT License - feel free to use for your own projects

## 🤝 Contributing

Pull requests welcome! For major changes, please open an issue first.

## 📧 Contact

Built with ❤️ for Ukrainian IT community 🇺🇦

---

**Note**: This is an MVP built for speed. Not financial or legal advice. Always consult a real lawyer for important contracts.
