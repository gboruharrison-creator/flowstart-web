# Flowstart AI — n8n Workflow Setup

## Required n8n Environment Variables

Set these in your n8n instance under **Settings → Environment**:

| Variable | Value |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI API key |
| `VAPI_API_KEY` | Your VAPI API key |
| `RESEND_API_KEY` | Your Resend API key |
| `NEXT_PUBLIC_SITE_URL` | `https://www.flowstart.it` |

## Required Next.js Environment Variables

Add these to `.env`:

```
N8N_CALLBACK_SECRET=generate_a_random_32_char_string
VAPI_WEBHOOK_SECRET=from_vapi_dashboard
```

## How to Import the Workflow

1. Open your n8n instance
2. Go to **Workflows → Import from file**
3. Select `n8n/workflows/client_onboarding.json`
4. Activate the workflow
5. Copy the webhook URL from the **Webhook Trigger** node
6. Add it to `.env` as `N8N_WEBHOOK_URL=https://your-n8n/webhook/onboarding`

## Workflow Sequence

```
Payment confirmed (Stripe)
  → Next.js Stripe webhook fires to n8n (N8N_WEBHOOK_URL)
  → n8n checks event type is "new_client_onboarding"
  → n8n generates VAPI system prompt via GPT-4o (Italian)
  → n8n creates VAPI voice assistant
  → n8n PATCHes /api/n8n/update-tenant with vapi_assistant_id
  → n8n sends welcome email to client (via Resend)
  → n8n notifies Flowstart team at hello@flowstart.it
  → Team assigns phone number → PATCHes /api/n8n/update-tenant with phone_number + is_active: true
  → Agent goes live
```

## VAPI Webhook (call log ingestion)

In your VAPI dashboard, set the **Server URL** for all assistants to:

```
https://www.flowstart.it/api/webhooks/vapi
```

This receives `end-of-call-report` events and writes call logs to Supabase automatically.

## Services Used

| Service | Purpose |
|---|---|
| OpenAI GPT-4o | Italian system prompt generation |
| VAPI | Voice agent creation and call handling |
| Resend | Transactional email (welcome + team notify) |
| Supabase | Tenant database via service role key |

## Security

- `/api/n8n/update-tenant` requires `Authorization: Bearer <N8N_CALLBACK_SECRET>`
- `/api/webhooks/vapi` is unauthenticated (VAPI does not sign payloads by default)
- `/api/webhooks/stripe` uses Stripe signature verification
