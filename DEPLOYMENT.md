# 🚀 Deployment Guide

## GitHub Repository
✅ **Repository created and pushed:** https://github.com/nt-petrulio/contract-analyzer

## Vercel Deployment (Recommended)

### Option 1: Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import `nt-petrulio/contract-analyzer` from GitHub
4. Configure environment variables:
   - `OPENAI_API_KEY` = your OpenAI API key (get from https://platform.openai.com/api-keys)
5. Click "Deploy"
6. Wait 2-3 minutes for build to complete
7. Done! Your app is live at `https://contract-analyzer-<random>.vercel.app`

### Option 2: Vercel CLI

```bash
cd /home/molt/clawd/projects/contract-analyzer

# Login to Vercel
vercel login

# Deploy (will prompt for configuration)
vercel --prod

# Add environment variable
vercel env add OPENAI_API_KEY
# Paste your OpenAI API key when prompted
# Select "Production" scope

# Redeploy with env vars
vercel --prod
```

### Option 3: Deploy with Pre-configured Settings

```bash
# Set environment variable locally for deployment
export OPENAI_API_KEY=sk-your-key-here

# Deploy
vercel --prod -e OPENAI_API_KEY=$OPENAI_API_KEY
```

## Environment Variables Required

| Variable | Description | Where to get |
|----------|-------------|--------------|
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 | https://platform.openai.com/api-keys |

## Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Buy domain: `contractguard.com.ua` or `smartcontract.ua` (recommended)
2. In Vercel Dashboard → Project → Settings → Domains
3. Add your domain and configure DNS records as shown

## Cost Estimates

- **Vercel hosting**: FREE (Hobby tier, up to 100GB bandwidth/month)
- **OpenAI API**: ~$0.10-0.50 per contract analysis (GPT-4o)
- **Domain**: ~$10-20/year (optional)

## Post-Deployment Checklist

- [ ] Verify app loads at Vercel URL
- [ ] Test PDF upload with example contracts
- [ ] Test "Freelance NDA" example button
- [ ] Test "Employment Contract" example button
- [ ] Check that analysis results display correctly
- [ ] Verify Ukrainian language displays properly
- [ ] Test on mobile device
- [ ] Share URL with test users

## Troubleshooting

### Build fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version compatibility (v20+)

### API route errors
- Verify `OPENAI_API_KEY` is set in Vercel environment variables
- Check OpenAI API quota and billing

### PDF parsing issues
- Ensure PDF is under 10MB
- Try with example contracts first
- Check Vercel function logs for errors

## Monitoring

- **Vercel Analytics**: Automatic (see Dashboard → Analytics)
- **OpenAI Usage**: Check https://platform.openai.com/usage
- **Error Logs**: Vercel Dashboard → Deployments → Function Logs

---

**Need help?** Check Vercel docs: https://vercel.com/docs
