# Features Documentation

## Core Features

### 🗣️ Speak Mode
**Purpose**: Transform reactive, defensive, or conflict-driven messages into nervous-system-safe communication.

**How it works**:
1. User types a message they want to send (often emotionally charged)
2. AI analyzes the message for:
   - Blaming language ("you always", "you never")
   - Defensive patterns
   - Attacking or critical tone
   - Emotional reactivity
3. AI rewrites the message to:
   - Use "I" statements (I feel, I need, I want)
   - Take ownership of emotions
   - Remove blame and defensiveness
   - Express needs clearly and respectfully
   - Maintain authenticity while promoting connection

**Example**:
- **Original**: "You never listen to me! You're always on your phone!"
- **Translated**: "I feel unheard when we're together and I notice you're on your phone. I need us to have time where we're fully present with each other. Can we talk about this?"

**Key Features**:
- Real-time translation
- Emotional tone analysis
- Safety level scoring (1-10)
- Actionable suggestions
- Relationship context integration

### 👂 Understand Mode
**Purpose**: Help users understand what their partner is really trying to communicate beneath defensive or reactive words.

**How it works**:
1. User pastes their partner's message
2. AI analyzes for:
   - Underlying emotions
   - Unmet needs
   - Nervous system activation patterns
   - Attachment style indicators
   - Hidden requests for connection
3. AI provides insights on:
   - What they're really feeling
   - What they actually need
   - How to respond supportively
   - Their emotional state
   - What might help them feel heard

**Example**:
- **Original**: "Fine, do whatever you want. I don't care anymore."
- **Analysis**: "Your partner is likely feeling hurt and disconnected. The 'I don't care' is often a protective mechanism when someone cares deeply but feels unsafe expressing vulnerability. They may need reassurance that they matter to you and that their feelings are valid. Consider responding with curiosity rather than defensiveness."

**Key Features**:
- Emotional decoding
- Needs identification
- Attachment pattern recognition
- Nervous system state analysis
- Response suggestions

## Relationship Context

### Purpose
Provide AI with specific information about your relationship to generate more accurate and personalized translations.

### What to Include
1. **Partner Name**: Makes responses feel more personal
2. **Communication Patterns**: 
   - "Partner tends to withdraw when stressed"
   - "We both get defensive quickly"
   - "Partner processes emotions slowly"
3. **Emotional Triggers**:
   - "Financial stress"
   - "Criticism about parenting"
   - "Comments about family"
4. **Relationship Dynamics**:
   - "Long-distance relationship"
   - "Different conflict styles"
   - "Cultural communication differences"

### Benefits
- More accurate translations
- Context-aware suggestions
- Personalized emotional insights
- Better understanding of patterns
- Relationship-specific advice

## Usage Tracking & Freemium Model

### Free Tier
- **Daily Limit**: 5 translations per day
- **Access**: Both Speak and Understand modes
- **Features**: 
  - Basic translation
  - Emotional analysis
  - Safety scoring
  - Translation history (last 7 days)
  - One relationship context

### Premium Tier ($9.99/month)
- **Daily Limit**: 100 translations per day
- **Access**: All free tier features plus:
  - Extended translation history (unlimited)
  - Multiple relationship contexts
  - Advanced emotional insights
  - Priority processing
  - Export translation history
  - Relationship progress tracking
  - Weekly insights report
  - Early access to new features

### Usage Tracking
- Resets daily at midnight UTC
- Real-time counter displayed
- Visual progress bar
- Upgrade prompt at 80% usage
- Soft cap with upgrade option

## Security & Privacy

### Data Protection
- **Row-Level Security (RLS)**: Users can only access their own data
- **Encrypted at Rest**: All data encrypted in Supabase
- **Encrypted in Transit**: HTTPS/TLS for all communications
- **No Data Sharing**: Your messages are never shared or used for training

### Authentication
- **Secure Authentication**: Powered by Supabase Auth
- **JWT Tokens**: Industry-standard token-based auth
- **Session Management**: Automatic refresh and expiry
- **Password Security**: Bcrypt hashing with salt

### API Security
- **Rate Limiting**: Prevents abuse
- **API Key Protection**: Server-side only
- **Input Sanitization**: Prevents injection attacks
- **CORS Configuration**: Restricted to allowed origins

## AI Translation Engine

### Model
- **Provider**: OpenAI
- **Model**: GPT-4o-mini
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 500 (adequate for detailed responses)

### Prompting Strategy
1. **System Prompt**: Establishes AI as emotionally intelligent expert
2. **Context Injection**: Includes relationship context if provided
3. **Clear Instructions**: Specific guidance on communication principles
4. **Example-Based**: Trained on nervous-system-safe communication patterns

### Quality Assurance
- Emotional tone analysis
- Safety level scoring
- Response validation
- Fallback handling
- Error recovery

## Emotional Analysis

### Safety Level (1-10)
Measures how likely the message is to be received well:

- **1-3 (Low)**: Likely to trigger defensiveness
  - Contains blame or attacks
  - Lacks I-statements
  - Dismissive or critical tone

- **4-6 (Medium)**: Mixed reception possible
  - Some I-statements present
  - Partial ownership
  - Room for improvement

- **7-10 (High)**: Likely to promote connection
  - Clear I-statements
  - Ownership of emotions
  - Respectful and vulnerable
  - Invites dialogue

### Emotional Tone
Identifies the primary emotions expressed:
- Vulnerable
- Expressing needs
- Seeking connection
- Hurt/defensive
- Anxious/worried
- Frustrated/angry
- Loving/appreciative

### Suggestions
Actionable tips for healthy communication:
- "Take a breath before sending"
- "Notice your own emotional state"
- "Focus on connection over being right"
- "Ask for what you need directly"
- "Validate their feelings first"

## Translation History

### Features
- Chronological list of all translations
- Filter by mode (Speak/Understand)
- Search by content
- Date range filtering
- Export to PDF/CSV (Premium)

### Data Stored
- Original text
- Translated text
- Mode used
- Timestamp
- Emotional analysis
- Relationship context (if used)
- Safety level

### Retention
- **Free**: 7 days
- **Premium**: Unlimited

## Notifications & Reminders

### Usage Alerts
- 80% daily limit reached
- Daily limit reached
- Upgrade available

### Relationship Insights (Premium)
- Weekly communication pattern summary
- Progress over time
- Improvement suggestions
- Celebration of growth

## Accessibility

### Design Principles
- High contrast text
- Clear typography
- Screen reader compatible
- Keyboard navigation
- Mobile responsive
- Touch-friendly targets

### Inclusive Language
- Gender-neutral by default
- Customizable pronouns
- Multiple relationship types
- Cultural sensitivity

## Performance

### Response Times
- Translation: < 3 seconds
- Page load: < 1 second
- API calls: < 500ms (excluding AI)

### Optimization
- Server-side rendering
- Edge functions for low latency
- Connection pooling
- Efficient queries
- CDN delivery

## Future Features (Roadmap)

### Q1 2025
- [ ] Voice input
- [ ] Mobile apps (iOS/Android)
- [ ] Browser extension
- [ ] Integration with messaging apps

### Q2 2025
- [ ] Couples accounts (shared history)
- [ ] Therapist dashboard
- [ ] Video message analysis
- [ ] Custom AI training on your patterns

### Q3 2025
- [ ] Group/family communication
- [ ] Multi-language support
- [ ] Sentiment trend analysis
- [ ] AI coaching sessions

### Q4 2025
- [ ] Virtual relationship coach
- [ ] Conflict resolution workflows
- [ ] Integration with therapy platforms
- [ ] Research partnerships
