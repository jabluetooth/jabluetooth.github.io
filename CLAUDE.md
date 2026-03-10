# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a lead capture landing page for an AI-powered sales automation service. It's a single-file HTML application that collects lead information and submits it to an n8n webhook for processing.

## Architecture

- **Single file**: `index.html` contains all HTML, CSS, and JavaScript
- **No build process**: Static HTML file that can be served directly
- **Backend integration**: Submits form data via POST to an n8n webhook URL

## Configuration

The webhook URL is configured in the JavaScript section:
```javascript
const N8N_WEBHOOK_URL = 'https://YOUR-CLOUDFLARE-TUNNEL-URL/webhook/submit-lead';
```

Update this URL to point to your n8n webhook endpoint.

## Form Data Payload

The form submits the following JSON structure to the webhook:
```json
{
  "name": "string",
  "email": "string",
  "company": "string",
  "phone": "string (optional)",
  "companySize": "string (optional)",
  "message": "string (optional)",
  "timestamp": "ISO 8601 string",
  "source": "landing_page",
  "userAgent": "string",
  "referrer": "string"
}
```

## Development

To test locally, serve the HTML file with any static file server or open directly in a browser. Note that form submission requires CORS to be enabled on the n8n webhook endpoint.
