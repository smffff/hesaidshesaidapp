# He Said / She Said

**An emotionally intelligent AI communication engine by Ikwe.ai**

Transform conflict into clarity using nervous-system-safe rewrites, relationship context, and dual modes (Speak / Understand). Built with Next.js, Supabase, and AI-powered translation.

## ✨ Features

### 🗣️ **Speak Mode**
- Translate reactive or defensive messages into nervous-system-safe communication
- Express feelings using "I" statements
- Remove blame and attack patterns
- Promote connection and understanding
- Maintain authenticity while improving delivery

### 👂 **Understand Mode**
- Decode underlying emotions in your partner's messages
- Identify nervous system activation patterns
- Understand what they really need
- Get insights into their emotional state
- Learn what might help them feel heard

### 🎯 **Key Capabilities**
- **Relationship Context**: Add partner-specific communication patterns and triggers for more tailored translations
- **Emotional Analysis**: Get real-time feedback on emotional tone and safety level
- **Freemium Model**: 5 free translations per day, upgrade to premium for 100+ daily translations
- **Row-Level Security**: Your data is private and secure with Supabase RLS
- **AI-Powered**: Uses OpenAI GPT-4 for intelligent, context-aware translations
- **MoonPay Ready**: Built-in payment infrastructure for easy monetization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key (for production)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/smffff/hesaidshesaidapp.git
cd hesaidshesaidapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `OPENAI_API_KEY`: Your OpenAI API key
- `NEXT_PUBLIC_MOONPAY_API_KEY`: MoonPay API key (for payments)

4. **Set up Supabase**

Create a new Supabase project and run the migration:

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

5. **Deploy the Edge Function**

```bash
# Deploy the AI translation edge function
supabase functions deploy ai-translate --no-verify-jwt

# Set environment variables for the function
supabase secrets set OPENAI_API_KEY=your_openai_key
```

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
hesaidshesaidapp/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Main landing page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── translator/        # Translation UI components
│   │   ├── relationships/     # Relationship context components
│   │   ├── ui/               # Reusable UI components
│   │   └── auth/             # Authentication components
│   ├── lib/                   # Utility libraries
│   │   └── supabase/         # Supabase client configuration
│   ├── store/                 # Zustand state management
│   ├── types/                 # TypeScript type definitions
│   └── hooks/                 # Custom React hooks
├── supabase/
│   ├── migrations/            # Database migrations
│   └── functions/            # Supabase Edge Functions
│       └── ai-translate/     # AI translation function
└── public/                    # Static assets
```

## 🗄️ Database Schema

### Tables

- **profiles**: User profiles with subscription tier
- **relationships**: Relationship context (partner name, patterns, triggers)
- **translations**: History of all translations with emotional analysis
- **usage_stats**: Daily usage tracking for freemium limits

### Row Level Security (RLS)

All tables have RLS enabled with policies ensuring users can only access their own data.

## 🔐 Security Features

- **Row-Level Security (RLS)**: All database tables protected with RLS policies
- **Supabase Auth**: Secure authentication with JWT tokens
- **Edge Functions**: Server-side AI processing keeps API keys secure
- **Usage Limits**: Prevent abuse with daily translation limits
- **CORS Protection**: Configured headers for API security

## 💎 Freemium Model

### Free Tier
- 5 translations per day
- Access to both Speak and Understand modes
- Basic relationship context
- Translation history

### Premium Tier
- 100+ translations per day
- Priority processing
- Advanced relationship insights
- Extended translation history
- Export capabilities

## 💳 Payment Integration

The app is ready for MoonPay integration for cryptocurrency-based payments:

1. Users can upgrade to premium
2. Payment processed through MoonPay
3. Subscription tier automatically updated in database
4. Daily limits adjusted based on subscription

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4o-mini
- **Payments**: MoonPay (ready for integration)
- **Deployment**: Vercel (frontend) + Supabase (backend + edge functions)

## 📊 Usage

1. **Choose a mode**: Select either "Speak" or "Understand"
2. **Enter text**: Type or paste the message you want to translate
3. **Get translation**: Receive an emotionally intelligent version with analysis
4. **Review insights**: See emotional tone, safety level, and suggestions
5. **Add context**: Optionally add relationship context for better results

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Environment Variables

Set these in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MOONPAY_API_KEY`
- `NEXT_PUBLIC_APP_URL`

### Supabase Edge Function

Deploy the edge function with:
```bash
supabase functions deploy ai-translate
```

## 🧪 Development

### Build for production
```bash
npm run build
```

### Run linting
```bash
npm run lint
```

### Type checking
```bash
npx tsc --noEmit
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Contact

For questions or support, reach out to Ikwe.ai

---

**He Said / She Said** — Translate conflict into clarity, one message at a time. 💜
