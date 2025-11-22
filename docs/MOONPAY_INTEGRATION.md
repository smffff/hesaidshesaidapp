# MoonPay Integration Guide

This guide explains how to integrate MoonPay for cryptocurrency-based payments in He Said / She Said.

## Overview

MoonPay enables users to purchase premium subscriptions using cryptocurrency or credit cards that are converted to crypto. The integration is pre-configured but requires your MoonPay API keys.

## Step 1: Create a MoonPay Account

1. Go to [moonpay.com](https://www.moonpay.com/)
2. Sign up for a business account
3. Complete KYB (Know Your Business) verification
4. Get approved for production API access

## Step 2: Get API Keys

1. Log in to your MoonPay dashboard
2. Go to Settings → API Keys
3. Create a new API key pair:
   - Public API Key (for frontend)
   - Secret API Key (for backend webhooks)

## Step 3: Configure Environment Variables

Add to your `.env.local`:

```bash
NEXT_PUBLIC_MOONPAY_API_KEY=pk_test_your_public_key
MOONPAY_SECRET_KEY=sk_test_your_secret_key
```

For production, use the live keys:
```bash
NEXT_PUBLIC_MOONPAY_API_KEY=pk_live_your_public_key
MOONPAY_SECRET_KEY=sk_live_your_secret_key
```

## Step 4: Set Up Webhooks

1. In MoonPay dashboard, go to Settings → Webhooks
2. Add webhook endpoint: `https://your-domain.com/api/moonpay/webhook`
3. Select events:
   - `transaction.completed`
   - `transaction.failed`
4. Save the webhook secret

## Step 5: Implement Subscription Flow

The basic flow is already structured in the codebase:

1. User clicks "Upgrade to Premium"
2. Payment modal opens with MoonPay widget
3. User completes payment
4. Webhook confirms payment
5. User's subscription tier is updated in database
6. Daily limit is automatically increased

## Pricing Structure

Configure your pricing in the MoonPay dashboard:

- **Premium Monthly**: $9.99/month
- **Premium Yearly**: $99.99/year (save 17%)

## Testing

MoonPay provides a sandbox environment:

1. Use test API keys (pk_test_... / sk_test_...)
2. Use test credit card: `4242 4242 4242 4242`
3. Any future expiry date
4. Any 3-digit CVC

## Security Best Practices

1. **Never expose secret keys**: Keep `MOONPAY_SECRET_KEY` server-side only
2. **Validate webhooks**: Always verify webhook signatures
3. **Use HTTPS**: Ensure all endpoints use HTTPS in production
4. **Rate limiting**: Implement rate limits on payment endpoints
5. **Audit logs**: Log all payment events for compliance

## Webhook Signature Verification

Example webhook handler (already configured):

```typescript
import crypto from 'crypto'

function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.MOONPAY_SECRET_KEY!
  const hash = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')
  
  return hash === signature
}
```

## User Experience Flow

1. User sees "Upgrade to Premium" button
2. Modal shows:
   - Current plan (Free)
   - Premium features
   - Pricing options
   - MoonPay payment widget
3. User selects payment method:
   - Credit/Debit card
   - Apple Pay / Google Pay
   - Cryptocurrency wallet
4. Payment processed
5. Success message + subscription activated
6. Increased daily limit immediately available

## Handling Failed Payments

The system handles various failure scenarios:

- **Insufficient funds**: User notified, no changes to account
- **Network error**: Retry mechanism with exponential backoff
- **Verification required**: User receives email with next steps
- **Fraud detection**: Transaction blocked, user support notified

## Compliance

MoonPay handles:
- KYC (Know Your Customer)
- AML (Anti-Money Laundering)
- Geographic restrictions
- Payment processor compliance

## Alternative Payment Methods

While MoonPay is the primary integration, the architecture supports adding:

- Stripe for traditional card payments
- PayPal for alternative processing
- Apple In-App Purchase for iOS app
- Google Play Billing for Android app

## Production Checklist

Before going live:

- [ ] Switch to production API keys
- [ ] Test webhook endpoint is publicly accessible
- [ ] Verify SSL certificate is valid
- [ ] Test complete payment flow
- [ ] Set up monitoring and alerts
- [ ] Configure refund policy
- [ ] Add terms of service and privacy policy
- [ ] Enable fraud detection rules
- [ ] Set up customer support process
- [ ] Test subscription cancellation flow

## Support

For MoonPay-specific issues:
- Documentation: https://docs.moonpay.com
- Support: support@moonpay.com
- Status page: https://status.moonpay.com
